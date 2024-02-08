import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesController } from './drones/drones.controller';

@Module({
  imports: [],
  controllers: [AppController, DronesController],
  providers: [AppService],
})
export class AppModule {}
