// src/stores/useAuthStore.ts   ← FINAL FIXED – CLEAN & RELIABLE

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,

      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        toast.success('Welcome back to albyeb.shopi!');
        set({
          user: {
            id: 'fake-1',
            email,
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) || 'User',
          },
          isLoading: false,
        });
      },

      register: async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        toast.success('Account created successfully!');
        set({
          user: { id: 'fake-1', email, name },
          isLoading: false,
        });
      },

      logout: () => {
        toast.success('Logged out successfully. See you soon!');
        set({ user: null });
      },

      checkAuth: () => {
        set({ isLoading: false });

        // Optional: fake auto-login for development (comment out in production)
        // set({
        //   user: {
        //     id: '1',
        //     email: 'sarah@albyeb.shopi',
        //     name: 'Sarah',
        //   },
        // });
      },
    }),
    {
      name: 'albyeb-auth',
      partialize: (state) => ({ user: state.user }), // only persist user
    }
  )
);

// Optional convenience hook
export const useUser = () => useAuthStore((state) => state.user);