import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DronesRepository } from '../repositories';
import { Logger } from 'winston';

@Injectable()
export class BatteryMonitorService {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    private readonly dronesRepository: DronesRepository,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  public async handleCron() {
    const drones = await this.dronesRepository.getAll();
    for (const drone of drones) {
      const message = `[${new Date().toUTCString()}]: Drone ${drone.id} battery is ${drone.batteryCapacity}%`;
      if (drone.batteryCapacity < 25) {
        this.logger.warn(message);
      } else {
        this.logger.info(message);
      }
    }
  }
}
