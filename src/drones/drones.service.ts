import { Injectable } from '@nestjs/common';
import { CreateDroneDto } from './dto/create-drone.dto';
import {
  CreateDronUseCase,
  GetAvailableToLoadUseCase,
  GetDroneBatteryUseCase,
} from './use-cases';

@Injectable()
export class DronesService {
  constructor(
    private readonly createDronUseCase: CreateDronUseCase,
    private readonly listAvailableToLoadUseCase: GetAvailableToLoadUseCase,
    private readonly getDroneBatteryUseCase: GetDroneBatteryUseCase,
  ) {}

  public async create(createDroneDto: CreateDroneDto) {
    return await this.createDronUseCase.execute(createDroneDto);
  }

  public async getAvailableToLoad() {
    return await this.listAvailableToLoadUseCase.execute();
  }

  public async getBattery(id: string) {
    return await this.getDroneBatteryUseCase.execute(id);
  }
}
