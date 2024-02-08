import { Test, TestingModule } from '@nestjs/testing';
import { ShippmentLoadsService } from './shipment-loads.service';

describe('ShippmentLoadsService', () => {
  let service: ShippmentLoadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippmentLoadsService],
    }).compile();

    service = module.get<ShippmentLoadsService>(ShippmentLoadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
