import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { DroneStates } from '../enums';
import { UpdateDroneDto } from '../drones/dto/update-drone.dto';

@Injectable()
export class DronesRepository {
  constructor(private readonly db: PrismaService) {}

  public async create(data: Prisma.DroneCreateInput) {
    return await this.db.drone.create({ data });
  }

  public async update(data: UpdateDroneDto) {
    return await this.db.drone.update({
      where: { id: data.id },
      data,
    });
  }

  public async getAvailableToLoad() {
    return await this.db.drone.findMany({
      where: {
        state: DroneStates.IDLE,
        batteryCapacity: {
          gte: 25,
        },
      },
    });
  }

  public async getById(id: string) {
    return await this.db.drone.findUnique({
      where: {
        id,
      },
    });
  }

  public async getBattery(id: string) {
    return await this.db.drone.findUnique({
      where: {
        id,
      },
      select: {
        batteryCapacity: true,
      },
    });
  }

  public async getAll() {
    return await this.db.drone.findMany({
      select: {
        id: true,
        batteryCapacity: true,
        state: true,
      },
    });
  }
}
