import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { CreateMedicationUseCase, GetMedicationsUseCase } from './use-cases';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { ImageUploaderService } from 'src/image-uploader/image-uploader.service';

@Module({
  controllers: [MedicationsController],
  providers: [
    MedicationsService,
    CreateMedicationUseCase,
    GetMedicationsUseCase,
    ImageUploaderService,
  ],
  imports: [RepositoriesModule],
})
export class MedicationsModule {}
