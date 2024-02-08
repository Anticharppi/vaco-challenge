import { Injectable } from '@nestjs/common';
import { CreateShipmentLoadDto } from './dto/create-shippment-load.dto';
import { UpdateShippmentLoadDto } from './dto/update-shippment-load.dto';
import { CreateShipmentLoadUseCase } from './use-cases/create-shipment-load.use-case';

@Injectable()
export class ShippmentLoadsService {
  constructor(
    private readonly createShipmentLoadUseCase: CreateShipmentLoadUseCase,
  ) {}
  public async create(createShippmentLoadDto: CreateShipmentLoadDto) {
    return await this.createShipmentLoadUseCase.execute(createShippmentLoadDto);
  }

  findAll() {
    return `This action returns all shippmentLoads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shippmentLoad`;
  }

  update(id: number, updateShippmentLoadDto: UpdateShippmentLoadDto) {
    return `This action updates a #${id} shippmentLoad`;
  }

  remove(id: number) {
    return `This action removes a #${id} shippmentLoad`;
  }
}
