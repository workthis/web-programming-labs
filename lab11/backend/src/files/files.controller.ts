import {
  Controller, Post, Get, Param, Res,
  UploadedFile, UseInterceptors, HttpCode, HttpStatus,
  ParseFilePipe, MaxFileSizeValidator, FileTypeValidator,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { Response } from 'express';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FilesService } from './files.service';

const UPLOAD_DIR = join(process.cwd(), 'uploads');
const MAX_SIZE = 5 * 1024 * 1024; // 5 МБ

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_DIR,
        filename: (_req, file, cb) => {
          const ext = extname(file.originalname);
          cb(null, `${uuidv4()}${ext}`);
        },
      }),
      limits: { fileSize: MAX_SIZE },
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_SIZE }),
          new FileTypeValidator({ fileType: /image\/(jpeg|png|webp)/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const meta = this.filesService.save({
      name: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      url: `http://localhost:3000/files/${file.filename}`,
    });
    return meta;
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':name')
  serveFile(@Param('name') name: string, @Res() res: Response) {
    const files = this.filesService.findAll();
    const found = files.find((f) => f.name === name);
    if (!found) throw new NotFoundException('Файл не знайдено');

    const filePath = join(process.cwd(), 'uploads', name);
    res.setHeader('Content-Type', found.mimeType);
    res.sendFile(filePath);
  }
}