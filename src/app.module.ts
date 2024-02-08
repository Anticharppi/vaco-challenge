import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesController } from './drones/drones.controller';
import {
  CreateDroneService,
  ListAvailableToLoadService,
} from './drones/services';
import { DronesRepositoryService } from './repositories/drones-repository/drones-repository.service';
import { PrismaService } from './repositories/prisma.service';
import {} from './drones/services/list-available-to-load/list-available-to-load.service';

@Module({
  imports: [],
  controllers: [AppController, DronesController],
  providers: [
    AppService,
    PrismaService,
    CreateDroneService,
    ListAvailableToLoadService,
    DronesRepositoryService,
  ],
})
export class AppModule {}
