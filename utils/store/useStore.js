import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      news: [],
      setNews: (news) => set((state) => ({ news: [...state.news, news] })),
    }),
    {
      name: 'news',
    }
  )
);
export default useStore;
