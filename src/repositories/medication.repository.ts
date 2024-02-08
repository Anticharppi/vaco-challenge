import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MedicationsRepository {
  constructor(private readonly db: PrismaService) {}

  public async create(data: Prisma.MedicationCreateInput) {
    return await this.db.medication.create({ data });
  }

  public async getAll() {
    return await this.db.medication.findMany();
  }
}
