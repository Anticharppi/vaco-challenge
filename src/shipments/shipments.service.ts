import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import {
  CreateShipmentUseCase,
  GetShipmentByDroneIdUseCase,
  GetShipmentsUseCase,
  UpdateShipmentStatusUseCase,
} from './use-cases';
import { UpdateShipmentStatusDto } from './dto/update-shipment-status.dto';

@Injectable()
export class ShipmentsService {
  constructor(
    private readonly createShipmentUseCase: CreateShipmentUseCase,
    private readonly updateShipmentStatusUseCase: UpdateShipmentStatusUseCase,
    private readonly getShipmentsUseCase: GetShipmentsUseCase,
    private readonly getShipmentByDroneIdUseCase: GetShipmentByDroneIdUseCase,
  ) {}

  public async create(createShipmentDto: CreateShipmentDto) {
    return await this.createShipmentUseCase.execute(createShipmentDto);
  }

  public async update(updateShipmentDto: UpdateShipmentStatusDto) {
    return await this.updateShipmentStatusUseCase.execute(updateShipmentDto);
  }

  public async getAll() {
    return await this.getShipmentsUseCase.execute();
  }

  public async getByDroneId(droneId: string) {
    return await this.getShipmentByDroneIdUseCase.execute(droneId);
  }
}
