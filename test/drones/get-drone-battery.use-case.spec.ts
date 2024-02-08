import { GetDroneBatteryUseCase } from '../../src/drones/use-cases';
import { DronesRepository } from '../../src/repositories/drones.repository';
import { DroneModels, DroneStates } from '../../src/enums';

const getBatteryMock = jest.fn();

jest.mock('../../src/repositories/drones.repository', () => {
  return {
    DronesRepository: jest.fn().mockImplementation(() => {
      return {
        getBattery: getBatteryMock,
      };
    }),
  };
});

const dronesRepository = new DronesRepository({} as any);
const getDroneBatteryUseCase = new GetDroneBatteryUseCase(dronesRepository);

describe('GetDroneBatteryUseCase', () => {
  beforeEach(jest.clearAllMocks);

  it('should throw an error when the drone is not found', async () => {
    getBatteryMock.mockResolvedValue(null);

    await expect(
      getDroneBatteryUseCase.execute('6a3007de-def5-4042-93a3-f08fb177476f'),
    ).rejects.toThrow('Drone not found');
  });

  it('should get the battery of a drone', async () => {
    getBatteryMock.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      serialNumber: 'XXXXXXXXXX',
      model: DroneModels.Middleweight,
      weightLimit: 500,
      batteryCapacity: 100,
      state: DroneStates.IDLE,
    });

    const result = await getDroneBatteryUseCase.execute(
      '6a3007de-def5-4042-93a3-f08fb177476f',
    );
    expect(result).toHaveProperty('battery', '100%');
  });
});
