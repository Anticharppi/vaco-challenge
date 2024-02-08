import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentLoadsController } from './shipment-loads.controller';
import { ShippmentLoadsService } from './shipment-loads.service';

describe('ShippmentLoadsController', () => {
  let controller: ShipmentLoadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipmentLoadsController],
      providers: [ShippmentLoadsService],
    }).compile();

    controller = module.get<ShipmentLoadsController>(ShipmentLoadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
