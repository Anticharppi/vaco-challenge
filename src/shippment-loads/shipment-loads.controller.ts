import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShippmentLoadsService } from './shipment-loads.service';
import { CreateShippmentLoadDto } from './dto/create-shippment-load.dto';

@Controller('shipment-loads')
export class ShipmentLoadsController {
  constructor(private readonly shippmentLoadsService: ShippmentLoadsService) {}

  @Post()
  create(@Body() createShippmentLoadDto: CreateShippmentLoadDto) {
    return this.shippmentLoadsService.create(createShippmentLoadDto);
  }
}