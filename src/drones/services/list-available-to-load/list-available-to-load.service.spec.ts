import { Test, TestingModule } from '@nestjs/testing';
import { ListAvailableToLoadService } from './list-available-to-load.service';

describe('ListAvailableToLoadService', () => {
  let service: ListAvailableToLoadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListAvailableToLoadService],
    }).compile();

    service = module.get<ListAvailableToLoadService>(ListAvailableToLoadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
