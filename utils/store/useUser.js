import create from 'zustand';
import { persist } from 'zustand/middleware';

const useUser = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user })),
      clearUser: (user) => set(() => ({ user: user })),
    }),
    {
      name: 'info',
      reset: () => ({ user: null }),
    }
  )
);
export default useUser;
