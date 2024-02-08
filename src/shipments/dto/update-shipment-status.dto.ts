import { IsEnum } from 'class-validator';
import { ShipmentStatus } from 'src/enums';

export class UpdateShipmentStatusDto {
  id: string;

  @IsEnum(ShipmentStatus)
  status: ShipmentStatus;
}
