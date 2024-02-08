import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DronesRepository, ShipmentsRepository } from 'src/repositories';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { DroneStates } from 'src/enums';

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
      throw new HttpException('Drone is not available', HttpStatus.CONFLICT);
    }
    const shipment = await this.shipmentsRepository.create(createShipmentDto);
    await this.dronesRepository.update({
      id: createShipmentDto.droneId,
      state: DroneStates.LOADING,
    });
    return shipment;
  }
}
