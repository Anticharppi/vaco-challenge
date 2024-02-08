import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Get,
} from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1048576 }), // Max 1MB
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createMedicationDto: CreateMedicationDto,
  ) {
    return this.medicationsService.create(createMedicationDto, file);
  }

  @Get()
  public async getAll() {
    return this.medicationsService.getAll();
  }
}
