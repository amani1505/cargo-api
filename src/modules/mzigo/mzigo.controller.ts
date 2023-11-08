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
import { MzigoService } from './mzigo.service';
import { CreateMzigoDto } from './create-mzigo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('mzigo')
export class MzigoController {
  constructor(private readonly _mzigoService: MzigoService) {}

  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  @Post()
  create(@Body() createMzigoDto: CreateMzigoDto, @UploadedFile() images: any) {
    if (images !== null) {
      createMzigoDto.image = images.filename;
    }
    return this._mzigoService.create(createMzigoDto);
  }

  @Get()
  findAll() {
    return this._mzigoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._mzigoService.findOne(id);
  }

  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMzigoDto: CreateMzigoDto,
    @UploadedFile() images: any,
  ) {
    if (images !== null) {
      updateMzigoDto.image = images.filename;
    }

    return this._mzigoService.update(id, updateMzigoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._mzigoService.remove(id);
  }
}
