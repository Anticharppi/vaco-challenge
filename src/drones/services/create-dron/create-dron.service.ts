import { Injectable } from '@nestjs/common';
import { DronesRepositoryService } from 'src/repositories';
import { CreateDronDto } from '../../dtos';
import { DroneStates } from 'src/enums';

@Injectable()
export class CreateDroneService {
  constructor(private readonly dronesRepository: DronesRepositoryService) {}

  public async execute(drone: CreateDronDto) {
    const state = DroneStates.IDLE;
    return await this.dronesRepository.create({ ...drone, state });
  }
}
