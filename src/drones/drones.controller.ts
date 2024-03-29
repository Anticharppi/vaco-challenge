import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { DronesService } from './drones.service';
import { CreateDroneDto } from './dto/create-drone.dto';

@Controller('drones')
export class DronesController {
  constructor(private readonly dronesService: DronesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() createDronDto: CreateDroneDto) {
    return await this.dronesService.create(createDronDto);
  }

  @Get('available-to-load')
  @HttpCode(HttpStatus.OK)
  public async availableToLoad() {
    return await this.dronesService.getAvailableToLoad();
  }

  @Get('battery/:id')
  @HttpCode(HttpStatus.OK)
  public async getBattery(@Param('id') id: string) {
    return await this.dronesService.getBattery(id);
  }
}
