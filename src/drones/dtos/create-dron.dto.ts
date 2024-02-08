import {
  IsEnum,
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { DroneModels, DroneStates } from 'src/enums';

export class CreateDronDto {
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  serialNumber: string;

  @IsEnum(DroneModels)
  model: DroneModels;

  @IsInt()
  @Max(500)
  @Min(1)
  weight: number;

  @IsInt()
  @Max(100)
  @Min(0)
  batteryCapacity: number;

  @IsEnum(DroneStates)
  state: DroneStates;
}
