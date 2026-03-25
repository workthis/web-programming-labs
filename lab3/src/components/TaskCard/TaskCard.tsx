import React from 'react';
import clsx from 'clsx';
import { Task, TaskStatus } from '../../types/task';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onStatusChange }) => {
  const { id, title, description, priority, status, createdAt } = task;

  const formattedDate = new Intl.DateTimeFormat('uk-UA').format(new Date(createdAt));

  const priorityClassMap = {
    low: styles.cardLow,
    medium: styles.cardMedium,
    high: styles.cardHigh,
  };

  return (
    <div className={clsx(styles.card, priorityClassMap[priority])}>
      <h3 className={styles.title}>{title}</h3>
      
      {description.trim() !== '' && (
        <p className={styles.description}>{description}</p>
      )}

      <div className={styles.meta}>
        <span>Пріоритет: <strong>{priority}</strong></span>
        <span>{formattedDate}</span>
      </div>

      <div className={styles.actions}>
        <select
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value as TaskStatus)}
        >
          <option value="todo">To Do</option>
          <option value="-inprogress--">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button 
          className={styles.deleteBtn} 
          onClick={() => onDelete(id)}
        >
          Видалити
        </button>
      </div>
    </div>
  );
};

export default TaskCard;