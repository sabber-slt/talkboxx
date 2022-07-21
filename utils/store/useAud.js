import create from 'zustand';

const useAud = create((set) => ({
  aud: null,
  setAud: (aud) => set(() => ({ aud })),
  //delete audio
  clearAud: (title) => set(() => ({ aud: null })),
}));
export default useAud;
