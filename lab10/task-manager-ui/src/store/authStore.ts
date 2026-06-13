import { create } from 'zustand';
import api from '../api/axios';

interface User {
  id: number;
  email: string;
  createdAt?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem('access_token');
    set({ user: null });
  },

  fetchMe: async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      set({ isLoading: false });
      return;
    }
    try {
      const { data } = await api.get('/auth/me');
      set({ user: data, isLoading: false });
    } catch {
      localStorage.removeItem('access_token');
      set({ user: null, isLoading: false });
    }
  },
}));