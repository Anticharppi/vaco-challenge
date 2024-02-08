import { Allow, IsUUID } from 'class-validator';
import { ShipmentStatus } from '../../enums';

export class CreateShipmentDto {
  @IsUUID()
  droneId: string;

  @Allow()
  status = ShipmentStatus.Open;
}
