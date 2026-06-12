import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Task } from './src/tasks/task.entity';
import { Tag } from './src/tags/tag.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Task, Tag],
  migrations: ['src/migrations/*{.ts,.js}'],
});