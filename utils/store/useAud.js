import create from 'zustand';

const useAud = create((set) => ({
  aud: null,
  setAud: (aud) => set(() => ({ aud })),
  clearAud: () => set(() => ({ aud: null })),
}));
export default useAud;
