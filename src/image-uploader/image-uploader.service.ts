import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ImageUploaderService {
  execute(image: Express.Multer.File, id: string) {
    const extension = image.mimetype.split('/').at(1);
    const name = `${id}.${extension}`;
    const publicFolder = join(__dirname, '..', '..', 'public');
    writeFileSync(join(publicFolder, name), image.buffer);
    const url = `http://localhost:3000/public/${name}`;
    return url;
  }
}
