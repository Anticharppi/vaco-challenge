import { Injectable } from '@nestjs/common';
import { CreateDroneDto } from './dto/create-drone.dto';
import { CreateDronUseCase, GetAvailableToLoadUseCase } from './use-cases';

@Injectable()
export class DronesService {
  constructor(
    private readonly createDronUseCase: CreateDronUseCase,
    private readonly listAvailableToLoadUseCase: GetAvailableToLoadUseCase,
  ) {}

  public async create(createDroneDto: CreateDroneDto) {
    return await this.createDronUseCase.execute(createDroneDto);
  }

  public async getAvailableToLoad() {
    return await this.listAvailableToLoadUseCase.execute();
  }
}
