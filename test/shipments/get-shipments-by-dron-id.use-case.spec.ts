import { GetShipmentByDroneIdUseCase } from '../../src/shipments/use-cases';
import { ShipmentsRepository, DronesRepository } from '../../src/repositories';
import { ShipmentStatus } from '../../src/enums';

const shipmentsRepositoryMock = {
  getByDroneId: jest.fn(),
};
const dronesRepositoryMock = {
  getById: jest.fn(),
};

jest.mock('../../src/repositories/drones.repository', () => {
  return {
    DronesRepository: jest.fn().mockImplementation(() => {
      return {
        getById: dronesRepositoryMock.getById,
      };
    }),
  };
});

jest.mock('../../src/repositories/shipments.repository', () => {
  return {
    ShipmentsRepository: jest.fn().mockImplementation(() => {
      return {
        getByDroneId: shipmentsRepositoryMock.getByDroneId,
      };
    }),
  };
});

const shipmentsRepository = new ShipmentsRepository({} as any);
const dronesRepository = new DronesRepository({} as any);
const getShipmentByDroneIdUseCase = new GetShipmentByDroneIdUseCase(
  shipmentsRepository,
  dronesRepository,
);
const droneId = '686356c1-a8c0-49ef-b59e-3a322912f14a';
const shipmentId = 'fc9bd8c5-c6c4-4056-b767-9f7f60c4a347';

describe('GetShipmentByDroneIdUseCase', () => {
  beforeEach(jest.clearAllMocks);

  it('should throw an error when the drone is not found', async () => {
    shipmentsRepositoryMock.getByDroneId.mockResolvedValue(null);

    await expect(
      getShipmentByDroneIdUseCase.execute({
        droneId,
      } as any),
    ).rejects.toThrow('Drone was not found');
  });

  it('should return the shipments when the drone is found', async () => {
    const shipments = [
      {
        id: 'fc9bd8c5-c6c4-4056-b767-9f7f60c4a347',
        droneId,
        status: ShipmentStatus.Open,
        shipmentLoads: [
          {
            id: 'b3b28ec9-e2e5-4020-9cab-2a369c28d2c9',
            medicationId: 'ce8d46ce-8d73-4165-bb4a-acb5d1b63834',
            shipmentId,
            medicationAmount: 1,
            medication: {
              id: 'ce8d46ce-8d73-4165-bb4a-acb5d1b63834',
              name: 'Misoprostol',
              weight: 250,
              code: 'A_2',
              imageUrl:
                'http://localhost:3000/public/498f986b-4588-4e1c-998a-0e8c946524a4.jpeg',
            },
          },
        ],
      },
    ];
    dronesRepositoryMock.getById.mockResolvedValue({ id: droneId });
    shipmentsRepositoryMock.getByDroneId.mockResolvedValue(shipments);

    const result = await getShipmentByDroneIdUseCase.execute({
      droneId,
    } as any);
    expect(result).toEqual(shipments);
  });
});
