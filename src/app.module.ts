import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesController } from './drones/drones.controller';
import { CreateDroneService } from './drones/create-dron.service';
import { DronesRepositoryService } from './repositories/drones-repository/drones-repository.service';
import { PrismaService } from './repositories/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, DronesController],
  providers: [
    AppService,
    PrismaService,
    CreateDroneService,
    DronesRepositoryService,
  ],
})
export class AppModule {}
