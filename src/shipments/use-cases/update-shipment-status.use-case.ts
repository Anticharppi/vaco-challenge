import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DronesRepository, ShipmentsRepository } from 'src/repositories';
import { UpdateShipmentStatusDto } from '../dto/update-shipment-status.dto';
import { DroneStates, ShipmentStatus } from 'src/enums';

@Injectable()
export class UpdateShipmentStatusUseCase {
  constructor(
    private readonly shipmentsRepository: ShipmentsRepository,
    private readonly dronesRepository: DronesRepository,
  ) {}
  public async execute(updateShipmentStatusDto: UpdateShipmentStatusDto) {
    let shipment = await this.shipmentsRepository.getById(
      updateShipmentStatusDto.id,
    );
    if (!shipment) {
      throw new HttpException('Shipment was not found', HttpStatus.NOT_FOUND);
    }

    if (shipment.status === updateShipmentStatusDto.status) {
      throw new HttpException(
        `Shipment is already in ${updateShipmentStatusDto.status} status`,
        HttpStatus.CONFLICT,
      );
    }

    if (shipment.status === ShipmentStatus.Delivered) {
      throw new HttpException(
        'Shipment is already delivered',
        HttpStatus.BAD_REQUEST,
      );
    }

    shipment = await this.shipmentsRepository.update(updateShipmentStatusDto);

    if (shipment.status === ShipmentStatus.Delivered) {
      await this.dronesRepository.update({
        id: shipment.droneId,
        state: DroneStates.IDLE,
      });
    }

    return shipment;
  }
}
