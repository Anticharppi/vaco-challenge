import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { CreateMedicationUseCase } from './use-cases';

@Injectable()
export class MedicationsService {
  constructor(
    private readonly createMedicationUseCase: CreateMedicationUseCase,
  ) {}

  public async create(
    createMedicationDto: CreateMedicationDto,
    file: Express.Multer.File,
  ) {
    return await this.createMedicationUseCase.execute(
      createMedicationDto,
      file,
    );
  }
}
