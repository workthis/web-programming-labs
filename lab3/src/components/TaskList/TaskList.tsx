import React from 'react';
import TaskCard from '../TaskCard/TaskCard';
import { Task, TaskStatus } from '../../types/task';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onStatusChange }) => {
  if (tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Задач немає.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.listItem}>
            <TaskCard 
              task={task} 
              onDelete={onDelete} 
              onStatusChange={onStatusChange} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;