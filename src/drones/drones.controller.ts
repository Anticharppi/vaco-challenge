import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDronDto } from './dtos';

@Controller('drones')
export class DronesController {
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body(new ValidationPipe()) createDronDto: CreateDronDto) {
    return 'Las validaciones pasaron todo bSSien';
  }
}
