import { Test, TestingModule } from '@nestjs/testing';
import { CreateDroneService } from './create-dron.service';

describe('DronesService', () => {
  let service: CreateDroneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateDroneService],
    }).compile();

    service = module.get<CreateDroneService>(CreateDroneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
