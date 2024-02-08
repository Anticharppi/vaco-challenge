import { Test, TestingModule } from '@nestjs/testing';
import { BatteryMonitorService } from './battery-monitor.service';

describe('BatteryMonitorService', () => {
  let service: BatteryMonitorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BatteryMonitorService],
    }).compile();

    service = module.get<BatteryMonitorService>(BatteryMonitorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
