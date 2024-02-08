import { GetAvailableToLoadUseCase } from '../../src/drones/use-cases';
import { DronesRepository } from '../../src/repositories/drones.repository';

const getAvailableToLoadMock = jest.fn();

jest.mock('../../src/repositories/drones.repository', () => {
  return {
    DronesRepository: jest.fn().mockImplementation(() => {
      return {
        getAvailableToLoad: getAvailableToLoadMock,
      };
    }),
  };
});

const dronesRepository = new DronesRepository({} as any);
const getAvailableToLoadUseCase = new GetAvailableToLoadUseCase(
  dronesRepository,
);

describe('GetAvailableToLoadUseCase', () => {
  beforeEach(jest.clearAllMocks);

  it('should get the available drones to load', async () => {
    getAvailableToLoadMock.mockResolvedValue([
      {
        id: '6a3007de-def5-4042-93a3-f08fb177476f',
        serialNumber: 'XXXXXXXXXX',
        model: 'Middleweight',
        weightLimit: 500,
        batteryCapacity: 100,
        state: 'IDLE',
      },
    ]);

    const result = await getAvailableToLoadUseCase.execute();
    expect(result).toHaveLength(1);
  });

  it('should return an empty array when there are no drones available to load', async () => {
    getAvailableToLoadMock.mockResolvedValue([]);

    const result = await getAvailableToLoadUseCase.execute();
    expect(result).toHaveLength(0);
  });
});
