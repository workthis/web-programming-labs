import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';

const schema = z.object({
  email: z.string().email('Невірний формат email'),
  password: z.string().min(8, 'Мінімум 8 символів'),
});

type FormData = z.infer<typeof schema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { fetchMe } = useAuthStore();
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => api.post('/auth/login', data),
    onSuccess: async (res) => {
      localStorage.setItem('access_token', res.data.access_token);
      await fetchMe();
      navigate('/profile');
    },
    onError: (error: any) => {
      const status = error.response?.status;
      if (status === 401) setServerError('Невірний email або пароль');
      else setServerError('Помилка сервера, спробуйте пізніше');
    },
  });

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Вхід</h2>
      {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label><br />
          <input {...register('email')} style={{ width: '100%', padding: '0.5rem' }} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Пароль</label><br />
          <input type="password" {...register('password')} style={{ width: '100%', padding: '0.5rem' }} />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Завантаження...' : 'Увійти'}
        </button>
      </form>
      <p>Немає акаунта? <Link to="/register">Зареєструватися</Link></p>
    </div>
  );
}