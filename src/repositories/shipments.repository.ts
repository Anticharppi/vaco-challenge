import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateShipmentDto } from 'src/shipments/dto/create-shipment.dto';
import { UpdateShipmentStatusDto } from 'src/shipments/dto/update-shipment-status.dto';

@Injectable()
export class ShipmentsRepository {
  constructor(private readonly db: PrismaService) {}

  public async create(data: CreateShipmentDto) {
    return await this.db.shipment.create({
      data: {
        status: data.status,
        drone: {
          connect: {
            id: data.droneId,
          },
        },
      },
    });
  }

  public async update(data: UpdateShipmentStatusDto) {
    return await this.db.shipment.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
      include: {
        drone: true,
      },
    });
  }

  public async getById(id: string) {
    return await this.db.shipment.findUnique({
      where: {
        id,
      },
      include: {
        drone: true,
      },
    });
  }

  public getByDroneId(droneId: string) {
    return this.db.shipment.findMany({
      where: {
        droneId,
      },
      include: {
        shipmentLoads: {
          include: {
            medication: true,
          },
        },
      },
    });
  }

  public async getAll() {
    return await this.db.shipment.findMany();
  }
}
