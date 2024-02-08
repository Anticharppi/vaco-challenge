import { Module } from '@nestjs/common';
import { ShippmentLoadsService } from './shipment-loads.service';
import { ShipmentLoadsController } from './shipment-loads.controller';
import { CreateShipmentLoadUseCase } from './use-cases/create-shipment-load.use-case';
import { RepositoriesModule } from '../repositories/repositories.module';

@Module({
  controllers: [ShipmentLoadsController],
  providers: [ShippmentLoadsService, CreateShipmentLoadUseCase],
  imports: [RepositoriesModule],
})
export class ShippmentLoadsModule {}
