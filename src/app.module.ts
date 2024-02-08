import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesController } from './drones/drones.controller';
import { MedicationsModule } from './medications/medications.module';
import { DronesModule } from './drones/drones.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { ShippmentLoadsModule } from './shippment-loads/shippment-loads.module';

@Module({
  imports: [
    MedicationsModule,
    DronesModule,
    RepositoriesModule,
    ShipmentsModule,
    ShippmentLoadsModule,
  ],
  controllers: [AppController, DronesController],
  providers: [AppService],
})
export class AppModule {}
