import { create } from "zustand";

interface SnackbarStore {
  isOpen: boolean;
  desc: string;
  severity: "error" | "success";
  open: () => void;
  set: (desc: string, severity: SnackbarStore['severity']) => void;
  close: () => void;
}

const useSnackbarStore = create<SnackbarStore>()((set) => ({
  isOpen: false,
  desc: "",
  severity: 'success',
  open: () => {
    set({ isOpen: true });
  },
  set: (desc, severity) => set({ desc, severity }),
  close: () => set({ isOpen: false }),
}));

export default useSnackbarStore;
