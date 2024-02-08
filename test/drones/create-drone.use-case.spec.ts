import { CreateDronUseCase } from '../../src/drones/use-cases';
import { DronesRepository } from '../../src/repositories/drones.repository';
import { DroneModels, DroneStates } from '../../src/enums';

const createDronMock = jest.fn();

jest.mock('../../src/repositories/drones.repository', () => {
  return {
    DronesRepository: jest.fn().mockImplementation(() => {
      return {
        create: createDronMock,
      };
    }),
  };
});

const dronesRepository = new DronesRepository({} as any);
const createDronUseCase = new CreateDronUseCase(dronesRepository);

describe('CreateDroneUseCase', () => {
  beforeEach(jest.clearAllMocks);

  it('should create a new drone', async () => {
    createDronMock.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      serialNumber: 'XXXXXXXXXX',
      model: DroneModels.Middleweight,
      weightLimit: 500,
      batteryCapacity: 100,
      state: 'IDLE',
    });

    const newDrone = {
      serialNumber: 'XXXXXXXXXX',
      model: DroneModels.Middleweight,
      weightLimit: 500,
      batteryCapacity: 100,
    };

    const result = await createDronUseCase.execute(newDrone);
    expect(result).toHaveProperty('id', '6a3007de-def5-4042-93a3-f08fb177476f');
    expect(result).toHaveProperty('state', DroneStates.IDLE);
  });
});
