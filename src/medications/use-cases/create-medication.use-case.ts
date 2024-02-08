import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from '../dto/create-medication.dto';
import { MedicationsRepository } from 'src/repositories';
import { ImageUploaderService } from 'src/image-uploader/image-uploader.service';
import { v4 } from 'uuid';
@Injectable()
export class CreateMedicationUseCase {
  constructor(
    private readonly medicationsRepository: MedicationsRepository,
    private readonly imageUploaderService: ImageUploaderService,
  ) {}

  async execute(
    createMedicationDto: CreateMedicationDto,
    file: Express.Multer.File,
  ) {
    const imageId = v4();
    createMedicationDto.imageUrl = this.imageUploaderService.execute(
      file,
      imageId,
    );
    const medication =
      await this.medicationsRepository.create(createMedicationDto);
    return medication;
  }
}
