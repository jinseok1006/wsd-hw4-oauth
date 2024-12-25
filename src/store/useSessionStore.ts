import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import useSnackbarStore from "./useSnakbarStore";

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

const triggerSnackbar = (message: string) => {
  const snackbar = useSnackbarStore.getState();
  snackbar.set(message, 'success');
  snackbar.open();
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        set({ user });
        triggerSnackbar("로그인 성공");
      },
      logout: async () => {
        // kakao sdk를 이용하여 확실하게 로그아웃
        // @ts-ignore
        await window.Kakao.Auth.logout();
        set({ user: null });
        triggerSnackbar("로그아웃 성공");
      },
    }),
    {
      name: "zustand-login-session",
      storage: createJSONStorage(() => window.sessionStorage),
    }
  )
);
