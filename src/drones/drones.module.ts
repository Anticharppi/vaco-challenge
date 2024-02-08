import { Module } from '@nestjs/common';
import { DronesService } from './drones.service';
import { DronesController } from './drones.controller';
import {
  CreateDronUseCase,
  GetAvailableToLoadUseCase,
  GetDroneBatteryUseCase,
} from './use-cases';
import { RepositoriesModule } from '../repositories/repositories.module';

@Module({
  controllers: [DronesController],
  imports: [RepositoriesModule],
  providers: [
    DronesService,
    CreateDronUseCase,
    GetAvailableToLoadUseCase,
    GetDroneBatteryUseCase,
  ],
  exports: [DronesService],
})
export class DronesModule {}
