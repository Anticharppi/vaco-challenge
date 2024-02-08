import { Injectable } from '@nestjs/common';
import { DronesRepository } from '../../repositories/drones.repository';

@Injectable()
export class GetAvailableToLoadUseCase {
  constructor(private readonly dronesRepository: DronesRepository) {}

  public async execute() {
    return await this.dronesRepository.getAvailableToLoad();
  }
}
