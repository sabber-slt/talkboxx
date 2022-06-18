import create from 'zustand';
import { persist } from 'zustand/middleware';

const useUser = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user })),
      clearUser: () => set(() => ({ user: null })),
    }),
    {
      name: 'info',
      reset: () => ({ user: null }),
    }
  )
);
export default useUser;
