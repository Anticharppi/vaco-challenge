import { UpdateShipmentStatusUseCase } from '../../src/shipments/use-cases';
import { DronesRepository, ShipmentsRepository } from '../../src/repositories';
import { ShipmentStatus } from '../../src/enums';

const shipmentsRepositoryMock = {
  getById: jest.fn(),
  update: jest.fn(),
};

const dronesRepositoryMock = {
  update: jest.fn(),
};

jest.mock('../../src/repositories/drones.repository', () => {
  return {
    DronesRepository: jest.fn().mockImplementation(() => {
      return {
        update: dronesRepositoryMock.update,
      };
    }),
  };
});

jest.mock('../../src/repositories/shipments.repository', () => {
  return {
    ShipmentsRepository: jest.fn().mockImplementation(() => {
      return {
        update: shipmentsRepositoryMock.update,
        getById: shipmentsRepositoryMock.getById,
      };
    }),
  };
});

const dronesRepository = new DronesRepository({} as any);
const shipmentsRepository = new ShipmentsRepository({} as any);
const updateShipmentStatusUseCase = new UpdateShipmentStatusUseCase(
  shipmentsRepository,
  dronesRepository,
);

describe('UpdateShipmentStatusUseCase', () => {
  beforeEach(jest.clearAllMocks);

  it('should throw an error when the shipment is not found', async () => {
    shipmentsRepositoryMock.getById.mockResolvedValue(null);

    await expect(
      updateShipmentStatusUseCase.execute({
        id: '6a3007de-def5-4042-93a3-f08fb177476f',
        status: ShipmentStatus.InTransit,
      } as any),
    ).rejects.toThrow('Shipment was not found');
  });

  it('should throw an error when the shipment is already in transit', async () => {
    shipmentsRepositoryMock.getById.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      status: ShipmentStatus.InTransit,
    });

    await expect(
      updateShipmentStatusUseCase.execute({
        id: '6a3007de-def5-4042-93a3-f08fb177476f',
        status: ShipmentStatus.InTransit,
      } as any),
    ).rejects.toThrow('Shipment is already in IN_TRANSIT status');
  });

  it('should throw an error when the shipment is already delivered', async () => {
    shipmentsRepositoryMock.getById.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      status: ShipmentStatus.Delivered,
    });

    await expect(
      updateShipmentStatusUseCase.execute({
        id: '6a3007de-def5-4042-93a3-f08fb177476f',
        status: ShipmentStatus.InTransit,
      } as any),
    ).rejects.toThrow('Shipment is already delivered');
  });

  it('should update the shipment status', async () => {
    shipmentsRepositoryMock.getById.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      status: ShipmentStatus.InTransit,
    });

    shipmentsRepositoryMock.update.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      status: ShipmentStatus.Delivered,
    });

    await updateShipmentStatusUseCase.execute({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      status: ShipmentStatus.Delivered,
    } as any);

    expect(shipmentsRepositoryMock.update).toHaveBeenCalledWith({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      status: ShipmentStatus.Delivered,
    });
  });

  it('should update the drone state when the shipment is delivered', async () => {
    shipmentsRepositoryMock.getById.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      status: ShipmentStatus.InTransit,
      droneId: '8b484d36-b821-445a-9ed0-aeebdecced0e',
    });

    shipmentsRepositoryMock.update.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      status: ShipmentStatus.Delivered,
      droneId: '8b484d36-b821-445a-9ed0-aeebdecced0e',
    });

    await updateShipmentStatusUseCase.execute({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      status: ShipmentStatus.Delivered,
    } as any);

    expect(dronesRepositoryMock.update).toHaveBeenCalledWith({
      id: '8b484d36-b821-445a-9ed0-aeebdecced0e',
      state: 'DELIVERED',
    });
  });

  it('should not update the drone state when the shipment is not delivered', async () => {
    shipmentsRepositoryMock.getById.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      status: ShipmentStatus.Open,
      droneId: '8b484d36-b821-445a-9ed0-aeebdecced0e',
    });

    shipmentsRepositoryMock.update.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      status: ShipmentStatus.InTransit,
    });

    await updateShipmentStatusUseCase.execute({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      status: ShipmentStatus.InTransit,
    } as any);

    expect(dronesRepositoryMock.update).not.toHaveBeenCalled();
  });
});
