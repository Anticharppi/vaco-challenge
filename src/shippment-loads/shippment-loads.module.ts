import { Module } from '@nestjs/common';
import { ShippmentLoadsService } from './shippment-loads.service';
import { ShippmentLoadsController } from './shippment-loads.controller';

@Module({
  controllers: [ShippmentLoadsController],
  providers: [ShippmentLoadsService],
})
export class ShippmentLoadsModule {}
