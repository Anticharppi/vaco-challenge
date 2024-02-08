import { ShipmentStatus } from '../../src/enums';
import {
  ShipmentsRepository,
  MedicationsRepository,
  ShipmentLoadsRepository,
} from '../../src/repositories';
import { CreateShipmentLoadUseCase } from '../../src/shippment-loads/use-cases/create-shipment-load.use-case';

const shipmentsRepositoryMock = {
  getById: jest.fn(),
};

const medicationRepositoryMock = {
  getById: jest.fn(),
};

const shipmentLoadsRepositoryMock = {
  getAllByShipmentId: jest.fn(),
  create: jest.fn(),
};

jest.mock('../../src/repositories/shipment-loads.repository', () => {
  return {
    ShipmentLoadsRepository: jest.fn().mockImplementation(() => {
      return {
        getAllByShipmentId: shipmentLoadsRepositoryMock.getAllByShipmentId,
        create: shipmentLoadsRepositoryMock.create,
      };
    }),
  };
});

jest.mock('../../src/repositories/shipments.repository', () => {
  return {
    ShipmentsRepository: jest.fn().mockImplementation(() => {
      return {
        getById: shipmentsRepositoryMock.getById,
      };
    }),
  };
});

jest.mock('../../src/repositories/medication.repository', () => {
  return {
    MedicationsRepository: jest.fn().mockImplementation(() => {
      return {
        getById: medicationRepositoryMock.getById,
      };
    }),
  };
});

const prisma = {} as any;

const shipmentsRepository = new ShipmentsRepository(prisma);
const medicationRepository = new MedicationsRepository(prisma);
const shipmentLoadsRepository = new ShipmentLoadsRepository(prisma);
const createShipmentLoadUseCase = new CreateShipmentLoadUseCase(
  shipmentsRepository,
  medicationRepository,
  shipmentLoadsRepository,
);

const shipmentId = 'ba3da163-d6f5-4441-9217-e820c048f043';
const medicationId = '1526e289-9992-405f-81fb-346e24d3adff';

describe('CreateShipmentLoadUseCase', () => {
  beforeEach(jest.clearAllMocks);

  it('should throw an error if shipment was not found', async () => {
    shipmentsRepositoryMock.getById.mockResolvedValue(null);

    await expect(
      createShipmentLoadUseCase.execute({
        shipmentId,
        medicationId,
        medicationAmount: 1,
      }),
    ).rejects.toThrow('Shipment was not found');
  });

  it('should throw an error if shipment is in transit', async () => {
    shipmentsRepositoryMock.getById.mockResolvedValue({
      status: ShipmentStatus.InTransit,
    });

    await expect(
      createShipmentLoadUseCase.execute({
        shipmentId,
        medicationId,
        medicationAmount: 1,
      }),
    ).rejects.toThrow(
      'Shipment is not available for loading medications because it is in transit',
    );
  });

  it('should throw an error if shipment is delivered', async () => {
    shipmentsRepositoryMock.getById.mockResolvedValue({
      status: ShipmentStatus.Delivered,
    });

    await expect(
      createShipmentLoadUseCase.execute({
        shipmentId,
        medicationId,
        medicationAmount: 1,
      }),
    ).rejects.toThrow(
      'Shipment is not available for loading medications because it is already delivered',
    );
  });

  it('should throw an error if medication was not found', async () => {
    shipmentsRepositoryMock.getById.mockResolvedValue({});
    medicationRepositoryMock.getById.mockResolvedValue(null);

    await expect(
      createShipmentLoadUseCase.execute({
        shipmentId,
        medicationId,
        medicationAmount: 1,
      }),
    ).rejects.toThrow('Medication was not found');
  });

  it('should throw an error if shipment is overweight', async () => {
    shipmentsRepositoryMock.getById.mockResolvedValue({
      drone: {
        weightLimit: 10,
      },
    });
    medicationRepositoryMock.getById.mockResolvedValue({
      weight: 5,
    });
    shipmentLoadsRepositoryMock.getAllByShipmentId.mockResolvedValue([
      {
        medication: {
          weight: 5,
        },
        medicationAmount: 1,
      },
    ]);

    await expect(
      createShipmentLoadUseCase.execute({
        shipmentId,
        medicationId,
        medicationAmount: 3,
      }),
    ).rejects.toThrow(
      'Shipment is not available for loading medications because it is overweight',
    );
  });

  it('should create a shipment load', async () => {
    shipmentsRepositoryMock.getById.mockResolvedValue({
      drone: {
        weightLimit: 10,
      },
    });
    medicationRepositoryMock.getById.mockResolvedValue({
      weight: 5,
    });
    shipmentLoadsRepositoryMock.getAllByShipmentId.mockResolvedValue([
      {
        medication: {
          weight: 5,
        },
        medicationAmount: 1,
      },
    ]);

    await createShipmentLoadUseCase.execute({
      shipmentId,
      medicationId,
      medicationAmount: 1,
    });

    expect(shipmentLoadsRepositoryMock.create).toBeCalledWith({
      shipmentId,
      medicationId,
      medicationAmount: 1,
    });
  });
});
