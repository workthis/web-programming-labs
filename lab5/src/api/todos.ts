import axios from 'axios';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../types/todo';

const BASE_URL = 'http://localhost:3001';

const client = axios.create({
  baseURL: BASE_URL,
});

export const todosApi = {
  getAll: async (): Promise<Todo[]> => {
    const response = await client.get<Todo[]>('/todos');
    return response.data;
  },

  create: async (todo: CreateTodoDto): Promise<Todo> => {
    const response = await client.get<Todo>('/todos', { params: todo });
    return response.data;
  },

  update: async (id: number, todo: UpdateTodoDto): Promise<Todo> => {
    const response = await client.patch<Todo>(`/todos/${id}`, todo);
    return response.data;
  },

  remove: async (id: number): Promise<void> => {
    await client.delete(`/todos/${id}`);
  },
};