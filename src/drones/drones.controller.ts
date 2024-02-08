import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDronDto } from './dtos';
import { CreateDroneService } from './create-dron.service';

@Controller('drones')
export class DronesController {
  constructor(private readonly createDronService: CreateDroneService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() createDronDto: CreateDronDto) {
    return await this.createDronService.execute(createDronDto);
  }
}
