import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
      <Link to="/" style={{ fontWeight: 'bold' }}>Task Manager</Link>
      <nav>
        {user ? (
          <span>
            {user.email}&nbsp;&nbsp;
            <button onClick={handleLogout}>Вийти</button>
          </span>
        ) : (
          <span>
            <Link to="/login">Увійти</Link>&nbsp;&nbsp;
            <Link to="/register">Зареєструватися</Link>
          </span>
        )}
      </nav>
    </header>
  );
}