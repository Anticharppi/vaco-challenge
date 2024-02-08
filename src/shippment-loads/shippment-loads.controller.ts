import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShippmentLoadsService } from './shippment-loads.service';
import { CreateShippmentLoadDto } from './dto/create-shippment-load.dto';
import { UpdateShippmentLoadDto } from './dto/update-shippment-load.dto';

@Controller('shippment-loads')
export class ShippmentLoadsController {
  constructor(private readonly shippmentLoadsService: ShippmentLoadsService) {}

  @Post()
  create(@Body() createShippmentLoadDto: CreateShippmentLoadDto) {
    return this.shippmentLoadsService.create(createShippmentLoadDto);
  }

  @Get()
  findAll() {
    return this.shippmentLoadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippmentLoadsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShippmentLoadDto: UpdateShippmentLoadDto) {
    return this.shippmentLoadsService.update(+id, updateShippmentLoadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippmentLoadsService.remove(+id);
  }
}
