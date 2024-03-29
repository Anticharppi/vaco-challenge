import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateShipmentLoadDto } from '../shippment-loads/dto/create-shippment-load.dto';

@Injectable()
export class ShipmentLoadsRepository {
  constructor(private readonly db: PrismaService) {}

  public async create(data: CreateShipmentLoadDto) {
    return await this.db.shipmentLoad.create({
      data: {
        medicationAmount: data.medicationAmount,
        medication: {
          connect: {
            id: data.medicationId,
          },
        },
        shipment: {
          connect: {
            id: data.shipmentId,
          },
        },
      },
    });
  }

  public async getAllByShipmentId(shipmentId: string) {
    return await this.db.shipmentLoad.findMany({
      where: {
        shipmentId,
      },
      include: {
        medication: true,
      },
    });
  }

  public async getAll() {
    return await this.db.shipment.findMany();
  }
}
