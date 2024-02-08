import { Module } from '@nestjs/common';
import { DronesService } from './drones.service';
import { DronesController } from './drones.controller';
import { CreateDronUseCase, GetAvailableToLoadUseCase } from './use-cases';
import { RepositoriesModule } from 'src/repositories/repositories.module';

@Module({
  controllers: [DronesController],
  imports: [RepositoriesModule],
  providers: [DronesService, CreateDronUseCase, GetAvailableToLoadUseCase],
  exports: [DronesService],
})
export class DronesModule {}