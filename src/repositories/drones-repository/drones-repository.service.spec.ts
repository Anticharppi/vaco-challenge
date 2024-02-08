import { Test, TestingModule } from '@nestjs/testing';
import { DronesRepositoryService } from './drones-repository.service';

describe('DronesRepositoryService', () => {
  let service: DronesRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DronesRepositoryService],
    }).compile();

    service = module.get<DronesRepositoryService>(DronesRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
