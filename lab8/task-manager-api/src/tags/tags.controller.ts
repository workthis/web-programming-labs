import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, ParseIntPipe, HttpCode, HttpStatus,
  NotFoundException, BadRequestException,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async create(@Body() dto: CreateTagDto) {
    try {
      return await this.tagsService.create(dto);
    } catch {
      throw new BadRequestException('Тег з такою назвою вже існує');
    }
  }

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTagDto) {
    const tag = await this.tagsService.update(id, dto);
    if (!tag) throw new NotFoundException(`Тег #${id} не знайдено`);
    return tag;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const removed = await this.tagsService.remove(id);
    if (!removed) throw new NotFoundException(`Тег #${id} не знайдено`);
  }
}