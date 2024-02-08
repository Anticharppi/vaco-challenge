import { PartialType } from '@nestjs/mapped-types';
import { CreateDroneDto } from './create-drone.dto';
import { IsEnum, IsUUID } from 'class-validator';
import { DroneStates } from 'src/enums';

export class UpdateDroneDto extends PartialType(CreateDroneDto) {
  @IsUUID()
  id: string;

  @IsEnum(DroneStates)
  state: DroneStates;
}
