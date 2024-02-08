import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import {
  CreateShipmentUseCase,
  GetShipmentsUseCase,
  UpdateShipmentStatusUseCase,
} from './use-cases';
import { RepositoriesModule } from 'src/repositories/repositories.module';

@Module({
  controllers: [ShipmentsController],
  providers: [
    ShipmentsService,
    CreateShipmentUseCase,
    UpdateShipmentStatusUseCase,
    GetShipmentsUseCase,
  ],
  imports: [RepositoriesModule],
})
export class ShipmentsModule {}
