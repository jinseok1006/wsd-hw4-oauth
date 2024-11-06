import { create } from "zustand";

interface SessionState {
  user: { email: string } | null;
  setUser: (user: { email: string } | null) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

