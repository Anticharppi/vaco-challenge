import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DronesRepository, ShipmentsRepository } from '../../repositories';

@Injectable()
export class GetShipmentByDroneIdUseCase {
  constructor(
    private readonly shipmentsRepository: ShipmentsRepository,
    private readonly dronesRepository: DronesRepository,
  ) {}
  public async execute(droneId: string) {
    const drone = await this.dronesRepository.getById(droneId);
    if (!drone) {
      throw new HttpException('Drone was not found', HttpStatus.NOT_FOUND);
    }
    const shipments = await this.shipmentsRepository.getByDroneId(droneId);
    return shipments;
  }
}
