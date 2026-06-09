import { IsString, IsIn, IsOptional, MaxLength, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsIn(['low', 'medium', 'high'], { message: 'Пріоритет має бути: low, medium або high' })
  priority?: 'low' | 'medium' | 'high';

  @IsOptional()
  @IsIn(['pending', 'in-progress', 'done'], { message: 'Статус має бути: pending, in-progress або done' })
  status?: 'pending' | 'in-progress' | 'done';
}