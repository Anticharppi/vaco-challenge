import { Allow, IsUUID } from 'class-validator';
import { ShipmentStatus } from 'src/enums';

export class CreateShipmentDto {
  @IsUUID()
  droneId: string;

  @Allow()
  status = ShipmentStatus.Open;
}
