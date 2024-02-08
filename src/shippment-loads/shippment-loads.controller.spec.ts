import { Test, TestingModule } from '@nestjs/testing';
import { ShippmentLoadsController } from './shippment-loads.controller';
import { ShippmentLoadsService } from './shippment-loads.service';

describe('ShippmentLoadsController', () => {
  let controller: ShippmentLoadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippmentLoadsController],
      providers: [ShippmentLoadsService],
    }).compile();

    controller = module.get<ShippmentLoadsController>(ShippmentLoadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
