import { Injectable } from '@nestjs/common';
import { MedicationsRepository } from '../../repositories';
@Injectable()
export class GetMedicationsUseCase {
  constructor(private readonly medicationsRepository: MedicationsRepository) {}

  public async execute() {
    return await this.medicationsRepository.getAll();
  }
}
