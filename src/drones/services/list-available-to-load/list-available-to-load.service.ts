import { Injectable } from '@nestjs/common';
import { DronesRepositoryService } from 'src/repositories';

@Injectable()
export class ListAvailableToLoadService {
  constructor(private readonly dronesRepository: DronesRepositoryService) {}
  public async execute() {
    return await this.dronesRepository.getAvailableToLoad();
  }
}
