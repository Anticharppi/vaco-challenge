import { PartialType } from '@nestjs/mapped-types';
import { CreateShipmentLoadDto } from './create-shippment-load.dto';

export class UpdateShippmentLoadDto extends PartialType(CreateShipmentLoadDto) {}
