import { create } from "zustand";

interface SnackbarStore {
  isOpen: boolean;
  desc: string;
  open: () => void;
  set: (desc: string) => void;
  close: () => void;
}

const useSnackbarStore = create<SnackbarStore>()((set) => ({
  isOpen: false,
  desc: "",
  open: () => {
    set({ isOpen: true });
  },
  set: (desc: string) => set({ desc }),
  close: () => set({ isOpen: false }),
}));

export default useSnackbarStore;
