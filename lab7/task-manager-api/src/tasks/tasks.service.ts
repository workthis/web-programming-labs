import { Injectable } from '@nestjs/common';
import type { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Розробити макет',
      description: 'Зробити дизайн головної сторінки',
      status: 'pending',
      priority: 'high',
      createdAt: '2025-01-01T10:00:00.000Z',
    },
    {
      id: '2',
      title: 'Написати тести',
      description: 'Покрити юніт-тестами основні модулі',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2025-01-02T12:00:00.000Z',
    },
    {
      id: '3',
      title: 'Задеплоїти на сервер',
      description: 'Налаштувати CI/CD та зробити деплой',
      status: 'done',
      priority: 'low',
      createdAt: '2025-01-03T09:00:00.000Z',
    },
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  findByStatus(status: string): Task[] {
    return this.tasks.filter((t) => t.status === status);
  }

  findOne(id: string): Task | null {
    return this.tasks.find((t) => t.id === id) ?? null;
  }

  create(dto: CreateTaskDto): Task {
    const task: Task = {
      id: Date.now().toString(),
      title: dto.title,
      description: dto.description ?? '',
      status: 'pending',
      priority: dto.priority,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(task);
    return task;
  }

  update(id: string, dto: UpdateTaskDto): Task | null {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return null;
    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) task.description = dto.description;
    if (dto.priority !== undefined) task.priority = dto.priority;
    if (dto.status !== undefined) task.status = dto.status;
    return task;
  }

  remove(id: string): boolean {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }
}