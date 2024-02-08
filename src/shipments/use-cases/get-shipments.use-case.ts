import { Injectable } from '@nestjs/common';
import { ShipmentsRepository } from '../../repositories';

@Injectable()
export class GetShipmentsUseCase {
  constructor(private readonly shipmentsRepository: ShipmentsRepository) {}
  public async execute() {
    const shipments = await this.shipmentsRepository.getAll();
    return shipments;
  }
}
