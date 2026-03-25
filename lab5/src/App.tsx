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
    mutationFn: (newTitle: string) => 
      todosApi.create({ title: newTitle, completed: false }),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('');
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

      {/* input */}
      <form onSubmit={handleAddTodo} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Що зробити"
          disabled={createMutation.isPending} // 5.3Блок
        />
        <button 
          type="submit" 
          disabled={createMutation.isPending || !title.trim()}
        >
          {createMutation.isPending ? 'Додавання' : 'Додат'}
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos?.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;