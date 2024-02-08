import { IsUUID } from 'class-validator';

export class CreateShippmentLoadDto {
  @IsUUID()
  medicationId: string;

  @IsUUID()
  shipmentId: string;
}
