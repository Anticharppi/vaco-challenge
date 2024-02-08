import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateDronDto } from './dtos';
import { CreateDroneService, ListAvailableToLoadService } from './services';

@Controller('drones')
export class DronesController {
  constructor(
    private readonly createDronService: CreateDroneService,
    private readonly listAvailableToLoadService: ListAvailableToLoadService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() createDronDto: CreateDronDto) {
    return await this.createDronService.execute(createDronDto);
  }

  @Get('available-to-load')
  @HttpCode(HttpStatus.OK)
  public async availableToLoad() {
    return await this.listAvailableToLoadService.execute();
  }
}
