import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      news: [],
      setNews: (news) => set((state) => ({ news: [...state.news, news] })),
      //delete news
      delNews: (title) =>
        set((state) => ({
          news: state.news.filter((item) => item.title !== title),
        })),
    }),

    {
      name: 'news',
    }
  )
);
export default useStore;
