import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './TaskForm.module.css';

const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Заголовок має містити ++ 3 символи")
    .max(100, "Заголовок не може перевищувати 100 символів"),
  description: z.string().max(500, "Опис не може перевищувати 500 символів"),
  priority: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "пріоритет -- " }),
  }),
});

export type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: undefined,
    }
  });

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={styles.field}>
        <label htmlFor="title">Назва задачі</label>
        <input
          id="title"
          type="text"
          placeholder="Вивчити React"
          {...register('title')}
        />
        {errors.title && <span className={styles.error}>{errors.title.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Опис (необов'язково)</label>
        <textarea
          id="description"
          placeholder="Додайте деталі"
          {...register('description')}
        />
        {errors.description && <span className={styles.error}>{errors.description.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="priority">Пріоритет</label>
        <select id="priority" {...register('priority')}>
          <option value="">Оберіть пріоритет</option>
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
        {errors.priority && <span className={styles.error}>{errors.priority.message}</span>}
      </div>

      <button type="submit" className={styles.submit}>
        Додати задачу
      </button>
    </form>
  );
};

export default TaskForm;