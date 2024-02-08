import { CreateShipmentUseCase } from '../../src/shipments/use-cases';
import { DronesRepository, ShipmentsRepository } from '../../src/repositories';
import { DroneStates } from '../../src/enums';

const dronesRepositoryMock = {
  getById: jest.fn(),
  update: jest.fn(),
};

const shipmentsRepositoryMock = {
  create: jest.fn(),
};

jest.mock('../../src/repositories/drones.repository', () => {
  return {
    DronesRepository: jest.fn().mockImplementation(() => {
      return {
        update: dronesRepositoryMock.update,
        getById: dronesRepositoryMock.getById,
      };
    }),
  };
});

jest.mock('../../src/repositories/shipments.repository', () => {
  return {
    ShipmentsRepository: jest.fn().mockImplementation(() => {
      return {
        create: shipmentsRepositoryMock.create,
      };
    }),
  };
});

const dronesRepository = new DronesRepository({} as any);
const shipmentsRepository = new ShipmentsRepository({} as any);
const createShipmentUseCase = new CreateShipmentUseCase(
  shipmentsRepository,
  dronesRepository,
);

describe('CreateShipmentUseCase', () => {
  beforeEach(jest.clearAllMocks);

  it('should throw an error when the drone is not found', async () => {
    dronesRepositoryMock.getById.mockResolvedValue(null);

    await expect(
      createShipmentUseCase.execute({
        droneId: '6a3007de-def5-4042-93a3-f08fb177476f',
      } as any),
    ).rejects.toThrow('Drone was not found');
  });

  it("should throw an error when the drones's state is LOADING", async () => {
    dronesRepositoryMock.getById.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      state: DroneStates.LOADING,
    });

    await expect(
      createShipmentUseCase.execute({
        droneId: '6a3007de-def5-4042-93a3-f08fb177476f',
      } as any),
    ).rejects.toThrow('Cannot create shipment because drone is not available');
  });

  it("should throw an error when the drones's state is LOADED", async () => {
    dronesRepositoryMock.getById.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      state: DroneStates.LOADED,
    });

    await expect(
      createShipmentUseCase.execute({
        droneId: '6a3007de-def5-4042-93a3-f08fb177476f',
      } as any),
    ).rejects.toThrow('Cannot create shipment because drone is not available');
  });

  it('should throw an error when the drones state is .DELIVERING', async () => {
    dronesRepositoryMock.getById.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      state: DroneStates.DELIVERING,
    });

    await expect(
      createShipmentUseCase.execute({
        droneId: '6a3007de-def5-4042-93a3-f08fb177476f',
      } as any),
    ).rejects.toThrow('Cannot create shipment because drone is not available');
  });

  it('should throw an error when the drones state is .DELIVERED', async () => {
    dronesRepositoryMock.getById.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      state: DroneStates.DELIVERED,
    });

    await expect(
      createShipmentUseCase.execute({
        droneId: '6a3007de-def5-4042-93a3-f08fb177476f',
      } as any),
    ).rejects.toThrow('Cannot create shipment because drone is not available');
  });

  it('should throw an error when the drones state is .RETURNING', async () => {
    dronesRepositoryMock.getById.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      state: DroneStates.RETURNING,
    });

    await expect(
      createShipmentUseCase.execute({
        droneId: '6a3007de-def5-4042-93a3-f08fb177476f',
      } as any),
    ).rejects.toThrow('Cannot create shipment because drone is not available');
  });

  it('should create a shipment', async () => {
    dronesRepositoryMock.getById.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      state: 'IDLE',
    });

    shipmentsRepositoryMock.create.mockResolvedValue({
      id: 'fc9bd8c5-c6c4-4056-b767-9f7f60c4a347',
      droneId: '686356c1-a8c0-49ef-b59e-3a322912f14a',
      status: 'OPEN',
    });

    const result = await createShipmentUseCase.execute({
      droneId: '6a3007de-def5-4042-93a3-f08fb177476f',
    } as any);

    expect(shipmentsRepositoryMock.create).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
    expect(dronesRepositoryMock.update).toHaveBeenCalledWith({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      state: DroneStates.LOADING,
    });
  });
});
