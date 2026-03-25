import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todosApi } from './api/todos';

function App() {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  const { data: todos, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: todosApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (newTitle: string) => todosApi.create({ title: newTitle, completed: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      todosApi.update(id, { completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => todosApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createMutation.mutate(title);
  };

  if (isLoading) return <p>Завантаження.</p>;
  if (isError) return <p>Помилка</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Мій список</h1>

      <form onSubmit={handleAddTodo} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Що зробити"
          disabled={createMutation.isPending}
        />
        <button type="submit" disabled={createMutation.isPending || !title.trim()}>
          Додати
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos?.map((todo) => (
          <li 
            key={todo.id} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              marginBottom: '8px',
              padding: '8px',
              borderBottom: '1px solid #f0f0f0'
            }}
          >
            {/* 6.1 */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateMutation.mutate({ id: todo.id, completed: !todo.completed })}
            />
            
            <span style={{ 
              flexGrow: 1, 
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#888' : 'inherit'
            }}>
              {todo.title}
            </span>

            {/* 6.2 */}
            <button 
              onClick={() => deleteMutation.mutate(todo.id)}
              style={{ color: 'red', cursor: 'pointer' }}
              disabled={deleteMutation.isPending}
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;