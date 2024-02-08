import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentStatusDto } from './dto/update-shipment-status.dto';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  create(@Body() createShipmentDto: CreateShipmentDto) {
    return this.shipmentsService.create(createShipmentDto);
  }

  @Patch('/status/:id')
  update(
    @Param('id') id: string,
    @Body() updateShipmentDto: UpdateShipmentStatusDto,
  ) {
    return this.shipmentsService.update({ id, ...updateShipmentDto });
  }

  @Get()
  getAll() {
    return this.shipmentsService.getAll();
  }

  @Get('/drone/:droneId')
  getByDroneId(@Param('droneId') droneId: string) {
    return this.shipmentsService.getByDroneId(droneId);
  }
}
