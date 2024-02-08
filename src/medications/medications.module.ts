import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { CreateMedicationUseCase } from './use-cases';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { ImageUploaderService } from 'src/image-uploader/image-uploader.service';

@Module({
  controllers: [MedicationsController],
  providers: [
    MedicationsService,
    CreateMedicationUseCase,
    ImageUploaderService,
  ],
  imports: [RepositoriesModule],
})
export class MedicationsModule {}
