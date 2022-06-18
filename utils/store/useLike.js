import create from 'zustand';
import { persist } from 'zustand/middleware';

const useLike = create(
  persist(
    (set) => ({
      like: [],
      setLike: (like) => set((state) => ({ like: [...state.like, like] })),
    }),
    {
      name: 'like',
    }
  )
);
export default useLike;
