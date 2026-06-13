import { useAuthStore } from '../store/authStore';

export function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) return <div>Завантаження...</div>;

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Профіль</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {user.createdAt && (
        <p><strong>Дата реєстрації:</strong> {new Date(user.createdAt).toLocaleString()}</p>
      )}
    </div>
  );
}