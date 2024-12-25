import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface User {
  email: string;
  name: string; // 사용자 이름
  accessToken: string; // 액세스 토큰
  refreshToken: string; // 리프레시 토큰
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
      logout: async () => {
        // kakao sdk를 이용하여 확실하게 로그아웃
        // @ts-ignore
        await window.Kakao.Auth.logout();
        console.log("로그아웃 성공");
        set({ user: null });
      },
    }),
    {
      name: "zustand-login-session",
      storage: createJSONStorage(() => window.sessionStorage),
    }
  )
);
