import { GetMedicationsUseCase } from '../../src/medications/use-cases';
import { MedicationsRepository } from '../../src/repositories/medication.repository';

const getAllMedicationMock = jest.fn();

jest.mock('../../src/repositories/medication.repository', () => {
  return {
    MedicationsRepository: jest.fn().mockImplementation(() => {
      return {
        getAll: getAllMedicationMock,
      };
    }),
  };
});

const medicationsRepository = new MedicationsRepository({} as any);
const getMedicationsUseCase = new GetMedicationsUseCase(medicationsRepository);

describe('GetMedicationsUseCase', () => {
  beforeEach(jest.clearAllMocks);

  it('should get all medications', async () => {
    getAllMedicationMock.mockResolvedValue([
      {
        id: '6a3007de-def5-4042-93a3-f08fb177476f',
        name: 'Paracetamol',
        imageUrl: 'http://example.com/image.jpg',
      },
    ]);

    const result = await getMedicationsUseCase.execute();

    expect(getAllMedicationMock).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it('should return an empty array if no medications are found', async () => {
    getAllMedicationMock.mockResolvedValue([]);

    const result = await getMedicationsUseCase.execute();

    expect(getAllMedicationMock).toHaveBeenCalled();
    expect(result).toHaveLength(0);
  });
});
