import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateShipmentLoadDto {
  @IsUUID()
  medicationId: string;

  @IsUUID()
  shipmentId: string;

  @IsInt()
  @Min(1)
  medicationAmount: number;
}
