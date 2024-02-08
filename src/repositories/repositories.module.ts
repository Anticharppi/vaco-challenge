import { Module } from '@nestjs/common';
import { DronesRepository } from './drones.repository';
import { PrismaService } from './prisma.service';
import { MedicationsRepository } from './medication.repository';
import { ShipmentsRepository } from './shipments.repository';

@Module({
  providers: [
    DronesRepository,
    PrismaService,
    MedicationsRepository,
    ShipmentsRepository,
  ],
  exports: [DronesRepository, MedicationsRepository, ShipmentsRepository],
})
export class RepositoriesModule {}
