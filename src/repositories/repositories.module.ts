import { Module } from '@nestjs/common';
import { DronesRepository } from './drones.repository';
import { PrismaService } from './prisma.service';
import { MedicationsRepository } from './medication.repository';

@Module({
  providers: [DronesRepository, PrismaService, MedicationsRepository],
  exports: [DronesRepository, MedicationsRepository],
})
export class RepositoriesModule {}
