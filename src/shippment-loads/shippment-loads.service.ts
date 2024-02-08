import { Injectable } from '@nestjs/common';
import { CreateShippmentLoadDto } from './dto/create-shippment-load.dto';
import { UpdateShippmentLoadDto } from './dto/update-shippment-load.dto';

@Injectable()
export class ShippmentLoadsService {
  create(createShippmentLoadDto: CreateShippmentLoadDto) {
    return 'This action adds a new shippmentLoad';
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
