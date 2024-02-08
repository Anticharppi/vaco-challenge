import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DronesRepository, ShipmentsRepository } from '../../repositories';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { DroneStates } from '../../enums';

@Injectable()
export class CreateShipmentUseCase {
  constructor(
    private readonly shipmentsRepository: ShipmentsRepository,
    protected readonly dronesRepository: DronesRepository,
  ) {}
  public async execute(createShipmentDto: CreateShipmentDto) {
    const dron = await this.dronesRepository.getById(createShipmentDto.droneId);
    if (!dron) {
      throw new HttpException('Drone was not found', HttpStatus.NOT_FOUND);
    }
    if (dron.state !== DroneStates.IDLE) {
      throw new HttpException(
        'Cannot create shipment because drone is not available',
        HttpStatus.CONFLICT,
      );
    }
    if (dron.batteryCapacity < 25) {
      throw new HttpException(
        'Cannot create shipment because dron battery is below 25%',
        HttpStatus.CONFLICT,
      );
    }

    const shipment = await this.shipmentsRepository.create(createShipmentDto);
    await this.dronesRepository.update({
      id: createShipmentDto.droneId,
      state: DroneStates.LOADING,
    });
    return shipment;
  }
}
