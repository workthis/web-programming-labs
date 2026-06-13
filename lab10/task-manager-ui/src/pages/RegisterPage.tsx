import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const schema = z.object({
  email: z.string().email('Невірний формат email'),
  password: z.string().min(8, 'Мінімум 8 символів'),
});

type FormData = z.infer<typeof schema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => api.post('/auth/register', data),
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    },
    onError: (error: any) => {
      const status = error.response?.status;
      if (status === 409) setServerError('Користувач з таким email вже існує');
      else if (status === 400) setServerError('Невалідні дані');
      else setServerError('Помилка сервера');
    },
  });

  if (success) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Акаунт створений</p>;

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Реєстрація</h2>
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
          {mutation.isPending ? 'Завантаження...' : 'Зареєструватися'}
        </button>
      </form>
      <p>Вже є акаунт? <Link to="/login">Увійти</Link></p>
    </div>
  );
}