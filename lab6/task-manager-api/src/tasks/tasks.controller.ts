import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import type { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
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

  @Get()
  findAll(): Task[] {
    return this.tasks;
  }

  @Get('search')
  findByStatus(@Query('status') status?: string): Task[] {
    if (!status) return this.tasks;
    return this.tasks.filter((task) => task.status === status);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Task | { message: string } {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return { message: `Задачу з id ${id} не знайдено` };
    return task;
  }

  @Post()
  create(@Body() dto: CreateTaskDto): Task {
    const newTask: Task = {
      id: Date.now().toString(),
      title: dto.title,
      description: dto.description ?? '',
      status: 'pending',
      priority: dto.priority,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return { message: `Задачу з id ${id} не знайдено` };
    this.tasks.splice(index, 1);
    return { message: `Задачу з id ${id} успішно видалено` };
  }
}