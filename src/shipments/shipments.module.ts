import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import {
  CreateShipmentUseCase,
  GetShipmentByDroneIdUseCase,
  GetShipmentsUseCase,
  UpdateShipmentStatusUseCase,
} from './use-cases';
import { RepositoriesModule } from '../repositories/repositories.module';

@Module({
  controllers: [ShipmentsController],
  providers: [
    ShipmentsService,
    CreateShipmentUseCase,
    UpdateShipmentStatusUseCase,
    GetShipmentsUseCase,
    GetShipmentByDroneIdUseCase,
  ],
  imports: [RepositoriesModule],
})
export class ShipmentsModule {}
