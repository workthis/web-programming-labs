import { IsString, IsOptional, IsIn, IsArray, IsInt, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['pending', 'in-progress', 'done'])
  status?: 'pending' | 'in-progress' | 'done';

  @IsOptional()
  @IsIn(['low', 'medium', 'high'])
  priority?: 'low' | 'medium' | 'high';

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tagIds?: number[];
}