import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function ProtectedRoute() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return <div>Завантаження...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export function PublicOnlyRoute() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return <div>Завантаження...</div>;
  if (user) return <Navigate to="/profile" replace />;

  return <Outlet />;
}