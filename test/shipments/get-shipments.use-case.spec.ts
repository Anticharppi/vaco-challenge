import { GetShipmentsUseCase } from '../../src/shipments/use-cases';
import { ShipmentsRepository } from '../../src/repositories';
import { ShipmentStatus } from '../../src/enums';

const shipmentsRepositoryMock = {
  getAll: jest.fn(),
};

jest.mock('../../src/repositories/shipments.repository', () => {
  return {
    ShipmentsRepository: jest.fn().mockImplementation(() => {
      return {
        getAll: shipmentsRepositoryMock.getAll,
      };
    }),
  };
});

const shipmentsRepository = new ShipmentsRepository({} as any);
const getShipmentsUseCase = new GetShipmentsUseCase(shipmentsRepository);

describe('GetShipmentsUseCase', () => {
  beforeEach(jest.clearAllMocks);

  it('should return the shipments', async () => {
    const shipments = [
      {
        id: 'fc9bd8c5-c6c4-4056-b767-9f7f60c4a347',
        droneId: '686356c1-a8c0-49ef-b59e-3a322912f14a',
        status: ShipmentStatus.Open,
      },
    ];
    shipmentsRepositoryMock.getAll.mockResolvedValue(shipments);

    const result = await getShipmentsUseCase.execute();

    expect(result).toEqual(shipments);
  });

  it('should return an empty array when there are no shipments', async () => {
    shipmentsRepositoryMock.getAll.mockResolvedValue([]);

    const result = await getShipmentsUseCase.execute();

    expect(result).toEqual([]);
  });
});
