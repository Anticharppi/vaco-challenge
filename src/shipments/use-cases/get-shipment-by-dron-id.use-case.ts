import { Injectable } from '@nestjs/common';
import { ShipmentsRepository } from 'src/repositories';

@Injectable()
export class GetShipmentByDroneIdUseCase {
  constructor(private readonly shipmentsRepository: ShipmentsRepository) {}
  public async execute(droneId: string) {
    const shipments = await this.shipmentsRepository.getByDroneId(droneId);
    return shipments;
  }
}
