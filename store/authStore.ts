import { create } from 'zustand';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  currentHealthScore: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasSeenLanding: boolean;
  login: (userData: User) => void;
  logout: () => void;
  setHasSeenLanding: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  hasSeenLanding: false,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  setHasSeenLanding: () => set({ hasSeenLanding: true }),
}));
