import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TagsService } from '../tags/tags.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly tagsService: TagsService,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: { tags: true } });
  }

  findOne(id: number): Promise<Task | null> {
    return this.tasksRepository.findOne({
      where: { id },
      relations: { tags: true },
    });
  }

  findByStatus(status: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { status: status as any },
      relations: { tags: true },
    });
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const { tagIds, ...taskData } = dto;
    const task = this.tasksRepository.create(taskData);

    if (tagIds && tagIds.length > 0) {
      const tags = await Promise.all(
        tagIds.map((id) => this.tagsService.findOne(id)),
      );
      task.tags = tags.filter((t): t is NonNullable<typeof t> => t !== null);
    } else {
      task.tags = [];
    }

    return this.tasksRepository.save(task);
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task | null> {
    const task = await this.findOne(id);
    if (!task) return null;

    const { tagIds, ...taskData } = dto;
    Object.assign(task, taskData);

    if (tagIds !== undefined) {
      const tags = await Promise.all(
        tagIds.map((tid) => this.tagsService.findOne(tid)),
      );
      task.tags = tags.filter((t): t is NonNullable<typeof t> => t !== null);
    }

    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<boolean> {
    const task = await this.findOne(id);
    if (!task) return false;
    await this.tasksRepository.remove(task);
    return true;
  }
}