import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class CreateMedicationDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  weight: number;

  @Matches(/^[A-Z0-9_]+$/)
  code: string;
  imageUrl: string;
}
