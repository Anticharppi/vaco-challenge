import { ImageUploaderService } from '../../src/image-uploader';
import { CreateMedicationUseCase } from '../../src/medications/use-cases';
import { MedicationsRepository } from '../../src/repositories/medication.repository';

const createMedicationMock = jest.fn();
const imageUploaderExecuteMock = jest.fn();

jest.mock('../../src/repositories/medication.repository', () => {
  return {
    MedicationsRepository: jest.fn().mockImplementation(() => {
      return {
        create: createMedicationMock,
      };
    }),
  };
});

jest.mock('../../src/image-uploader', () => {
  return {
    ImageUploaderService: jest.fn().mockImplementation(() => {
      return {
        execute: imageUploaderExecuteMock,
      };
    }),
  };
});

const dronesRepository = new MedicationsRepository({} as any);
const imageUploader = new ImageUploaderService();
const createMedicationUseCase = new CreateMedicationUseCase(
  dronesRepository,
  imageUploader,
);

describe('CreateMedicationUseCase', () => {
  beforeEach(jest.clearAllMocks);

  it('should create a medication', async () => {
    createMedicationMock.mockResolvedValue({
      id: '6a3007de-def5-4042-93a3-f08fb177476f',
      name: 'Paracetamol',
      imageUrl: 'http://example.com/image.jpg',
    });
    imageUploaderExecuteMock.mockReturnValue('http://example.com/image.jpg');

    const result = await createMedicationUseCase.execute(
      {
        name: 'Paracetamol',
        weight: 200,
        code: '123456',
      } as any,
      {} as any,
    );

    expect(createMedicationMock).toHaveBeenCalled();
    expect(result).toHaveProperty('imageUrl', 'http://example.com/image.jpg');
  });
});
