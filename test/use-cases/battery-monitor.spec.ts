import { DronesRepository } from '../../src/repositories/drones.repository';
import { BatteryMonitorService } from '../../src/battery-monitor/battery-monitor.service';
import { Logger } from 'winston';

const getAllMock = jest.fn();
const warnLoggerMock = jest.fn();
const infoLoggerMock = jest.fn();

jest.mock('winston', () => {
  return {
    Logger: jest.fn().mockImplementation(() => ({
      info: infoLoggerMock,
      warn: warnLoggerMock,
    })),
  };
});

jest.mock('../../src/repositories/drones.repository', () => {
  return {
    DronesRepository: jest.fn().mockImplementation(() => {
      return {
        getAll: getAllMock,
      };
    }),
  };
});

const logger = new Logger();
const dronesRepository = new DronesRepository({} as any);
const batteryMonitorService = new BatteryMonitorService(
  logger,
  dronesRepository,
);

describe.only('BatteryMonitorService', () => {
  beforeEach(jest.clearAllMocks);

  it("should log a warning if the drone's battery is below 25%", async () => {
    getAllMock.mockResolvedValue([
      { id: 1, batteryCapacity: 20 },
      { id: 2, batteryCapacity: 10 },
    ]);

    await batteryMonitorService.handleCron();

    expect(warnLoggerMock).toHaveBeenCalledTimes(2);
    expect(infoLoggerMock).not.toHaveBeenCalled();
  });

  it('should log an info message if the drone battery is above 25%', async () => {
    getAllMock.mockResolvedValue([
      { id: 1, batteryCapacity: 30 },
      { id: 2, batteryCapacity: 50 },
    ]);

    await batteryMonitorService.handleCron();

    expect(warnLoggerMock).not.toHaveBeenCalled();
    expect(infoLoggerMock).toHaveBeenCalledTimes(2);
  });
});
