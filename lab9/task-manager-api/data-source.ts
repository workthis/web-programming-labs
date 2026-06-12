import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Task } from './src/tasks/task.entity';
import { Tag } from './src/tags/tag.entity';
import { User } from './src/users/user.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'lab8_db',
  entities: [Task, Tag, User],  // ← додав User*{.ts,.js}'],
});