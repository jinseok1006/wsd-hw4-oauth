import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
export interface User {
  email: string;
  apiKey: string;
}

interface SessionState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "login-session",
      storage: createJSONStorage(() => window.sessionStorage),
    }
  )
);
