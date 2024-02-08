import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { DroneStates } from 'src/enums';

@Injectable()
export class DronesRepositoryService {
  constructor(private readonly db: PrismaService) {}

  public async create(data: Prisma.DroneCreateInput) {
    return await this.db.drone.create({ data });
  }

  public async getAvailableToLoad() {
    return await this.db.drone.findMany({
      where: {
        state: DroneStates.IDLE,
      },
    });
  }
}
