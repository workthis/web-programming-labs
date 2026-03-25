import { useQuery } from '@tanstack/react-query';
import { todosApi } from './api/todos';

function App() {
  const { 
    data: todos, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['todos'],
    queryFn: todosApi.getAll,
  });

  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Завантаження завдань</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <p>Помилка: {error instanceof Error ? error.message : 'Невідома помилка'}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Мій список</h1>
      
      {todos && todos.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((todo) => (
            <li 
              key={todo.id} 
              style={{
                padding: '10px',
                borderBottom: '1px solid #eee',
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#888' : 'inherit'
              }}
            >
              {todo.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>Список пуст.</p>
      )}
    </div>
  );
}

export default App;