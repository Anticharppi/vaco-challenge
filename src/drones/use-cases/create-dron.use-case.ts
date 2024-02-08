import { DroneStates } from 'src/enums';
import { CreateDroneDto } from '../dto/create-drone.dto';
import { Injectable } from '@nestjs/common';
import { DronesRepository } from '../../repositories/drones.repository';

@Injectable()
export class CreateDronUseCase {
  constructor(private readonly dronesRepository: DronesRepository) {}

  public async execute(drone: CreateDroneDto) {
    const state = DroneStates.IDLE;
    return await this.dronesRepository.create({ ...drone, state });
  }
}
