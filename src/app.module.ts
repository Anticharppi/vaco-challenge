import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesController } from './drones/drones.controller';
import { MedicationsModule } from './medications/medications.module';
import { DronesModule } from './drones/drones.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { ShippmentLoadsModule } from './shippment-loads/shipment-loads.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BatteryMonitorService } from './battery-monitor/battery-monitor.service';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { join } from 'path';

@Module({
  imports: [
    MedicationsModule,
    DronesModule,
    RepositoriesModule,
    ShipmentsModule,
    ShippmentLoadsModule,
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          dirname: join(__dirname, './../logs/'),
          filename: 'low-battery-monitor.log',
          level: 'warn',
        }),
        new winston.transports.File({
          dirname: join(__dirname, './../logs/'),
          filename: 'normal-battery-monitor.log',
          level: 'info',
        }),
      ],
    }),
  ],
  controllers: [AppController, DronesController],
  providers: [AppService, BatteryMonitorService],
})
export class AppModule {}
