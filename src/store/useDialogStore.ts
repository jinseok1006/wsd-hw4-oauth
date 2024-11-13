import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  title: string;
  desc: string;
  open: () => void;
  set: (title: string, desc: string) => void;
  close: () => void;
}

const useDialogStore = create<DialogState>()((set) => ({
  isOpen: false,
  title: "",
  desc: "",
  open: () => set({ isOpen: true }),
  set: (title: string, desc: string) => set({ title, desc }),
  close: () => set({ isOpen: false }),
}));

export default useDialogStore;
