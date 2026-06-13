import { Injectable } from '@nestjs/common';
import { FileMeta } from './file-meta.interface';

@Injectable()
export class FilesService {
  private readonly files: FileMeta[] = [];

  save(meta: FileMeta): FileMeta {
    this.files.push(meta);
    return meta;
  }

  findAll(): FileMeta[] {
    return this.files;
  }
}