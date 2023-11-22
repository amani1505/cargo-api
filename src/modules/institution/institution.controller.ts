import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './create-institution.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly _institutionService: InstitutionService) {}

  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  @Post()
  create(
    @Body() createInstitutionDto: CreateInstitutionDto,
    @UploadedFile() logo: any,
  ) {
    if (createInstitutionDto !== null) {
      createInstitutionDto.logo = logo.filename;
    }
    return this._institutionService.create(createInstitutionDto);
  }

  @Get()
  findAll() {
    return this._institutionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._institutionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstitutionDto: CreateInstitutionDto,
  ) {
    return this._institutionService.update(id, updateInstitutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._institutionService.remove(id);
  }
}
