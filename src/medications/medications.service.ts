import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { CreateMedicationUseCase, GetMedicationsUseCase } from './use-cases';

@Injectable()
export class MedicationsService {
  constructor(
    private readonly createMedicationUseCase: CreateMedicationUseCase,
    private readonly getMedicationsUseCase: GetMedicationsUseCase,
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

  public async getAll() {
    return await this.getMedicationsUseCase.execute();
  }
}
