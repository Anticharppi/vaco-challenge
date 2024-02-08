import { Module } from '@nestjs/common';
import { DronesRepository } from './drones.repository';
import { PrismaService } from './prisma.service';
import { MedicationsRepository } from './medication.repository';
import { ShipmentsRepository } from './shipments.repository';
import { ShipmentLoadsRepository } from './shipment-loads.repository';

@Module({
  providers: [
    DronesRepository,
    PrismaService,
    MedicationsRepository,
    ShipmentsRepository,
    ShipmentLoadsRepository,
  ],
  exports: [
    DronesRepository,
    MedicationsRepository,
    ShipmentsRepository,
    ShipmentLoadsRepository,
  ],
})
export class RepositoriesModule {}
