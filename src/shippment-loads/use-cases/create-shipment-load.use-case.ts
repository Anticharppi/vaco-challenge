import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  MedicationsRepository,
  ShipmentLoadsRepository,
  ShipmentsRepository,
} from '../../repositories';
import { CreateShipmentLoadDto } from '../dto/create-shippment-load.dto';
import { ShipmentStatus } from '../../enums';

@Injectable()
export class CreateShipmentLoadUseCase {
  constructor(
    private readonly shipmentsRepository: ShipmentsRepository,
    private readonly medicationRepository: MedicationsRepository,
    private readonly shipmentLoadsRepository: ShipmentLoadsRepository,
  ) {}

  public async execute(createShipmentLoadDto: CreateShipmentLoadDto) {
    const shipment = await this.shipmentsRepository.getById(
      createShipmentLoadDto.shipmentId,
    );

    if (!shipment) {
      throw new HttpException('Shipment was not found', HttpStatus.NOT_FOUND);
    }

    if (shipment.status === ShipmentStatus.InTransit) {
      throw new HttpException(
        'Shipment is not available for loading medications because it is in transit',
        HttpStatus.CONFLICT,
      );
    }

    if (shipment.status === ShipmentStatus.Delivered) {
      throw new HttpException(
        'Shipment is not available for loading medications because it is already delivered',
        HttpStatus.CONFLICT,
      );
    }

    const medication = await this.medicationRepository.getById(
      createShipmentLoadDto.medicationId,
    );

    if (!medication) {
      throw new HttpException('Medication was not found', HttpStatus.NOT_FOUND);
    }

    const currentShipmentLoad =
      await this.shipmentLoadsRepository.getAllByShipmentId(
        createShipmentLoadDto.shipmentId,
      );

    const currentWeight = currentShipmentLoad.reduce((acc, curr) => {
      return acc + curr.medication.weight * curr.medicationAmount;
    }, 0);

    if (
      currentWeight +
        medication.weight * createShipmentLoadDto.medicationAmount >
      shipment.drone.weightLimit
    ) {
      throw new HttpException(
        'Shipment is not available for loading medications because it is overweight',
        HttpStatus.CONFLICT,
      );
    }

    const shipmentLoad = await this.shipmentLoadsRepository.create(
      createShipmentLoadDto,
    );

    return shipmentLoad;
  }
}
