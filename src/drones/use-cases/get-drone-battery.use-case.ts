import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DronesRepository } from '../../repositories/drones.repository';

@Injectable()
export class GetDroneBatteryUseCase {
  constructor(private readonly dronesRepository: DronesRepository) {}

  public async execute(id: string) {
    const drone = await this.dronesRepository.getBattery(id);
    if (!drone) {
      throw new HttpException('Drone not found', HttpStatus.NOT_FOUND);
    }
    return { battery: `${drone.batteryCapacity}%` };
  }
}
