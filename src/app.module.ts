import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesController } from './drones/drones.controller';
import { DronesService } from './drones/drones.service';

@Module({
  imports: [],
  controllers: [AppController, DronesController],
  providers: [AppService, DronesService],
})
export class AppModule {}
