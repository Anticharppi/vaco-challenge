import { Module } from '@nestjs/common';
import { DronesRepository } from './drones.repository';
import { PrismaService } from './prisma.service';

@Module({
  providers: [DronesRepository, PrismaService],
  exports: [DronesRepository],
})
export class RepositoriesModule {}
