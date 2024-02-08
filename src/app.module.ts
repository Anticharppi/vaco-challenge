import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesController } from './drones/drones.controller';
import { MedicationsModule } from './medications/medications.module';
import { DronesModule } from './drones/drones.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { ImageUploaderService } from './image-uploader/image-uploader.service';
import { ShipmentsModule } from './shipments/shipments.module';
import { ShipmentsModule } from './shipments/shipments.module';

@Module({
  imports: [MedicationsModule, DronesModule, RepositoriesModule, ShipmentsModule],
  controllers: [AppController, DronesController],
  providers: [AppService],
})
export class AppModule {}
