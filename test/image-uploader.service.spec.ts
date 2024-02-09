const writeFileSyncMock = jest.fn();
const joinMock = jest.fn();

jest.mock('path', () => {
  return {
    join: joinMock,
  };
});

import { ImageUploaderService } from '../src/image-uploader/image-uploader.service';

jest.mock('fs', () => {
  return {
    writeFileSync: writeFileSyncMock,
  };
});

const imageUploaderService = new ImageUploaderService();

describe('ImageUploaderService', () => {
  beforeEach(jest.clearAllMocks);

  it('should upload an image', () => {
    const image = {
      mimetype: 'image/png',
      buffer: Buffer.from('image'),
    } as any;
    const id = '686356c1-a8c0-49ef-b59e-3a322912f14a';

    joinMock.mockReturnValue('public/686356c1-a8c0-49ef-b59e-3a322912f14a.png');

    const url = imageUploaderService.execute(image, id);

    expect(writeFileSyncMock).toHaveBeenCalledWith(
      'public/686356c1-a8c0-49ef-b59e-3a322912f14a.png',
      Buffer.from('image'),
    );
    expect(url).toBe('http://localhost:3000/public/686356c1-a8c0-49ef-b59e-3a322912f14a.png');
  });
});
