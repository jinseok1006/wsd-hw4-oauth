import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Movie } from "../api";

// wishlist 상태를 위한 인터페이스 정의
interface WishlistStore {
  wishlist: { [email: string]: Movie[] }; // 이메일별 찜한 영화 배열
  email?: string; // 현재 유저의 이메일
  setEmail: (email: string) => void; // 이메일을 설정하는 함수
  toggleWishlist: (newMovie: Movie) => void; // 영화 ID를 받아 찜 상태를 토글하는 함수
  includeWishlist: (movie: Movie) => boolean; // 영화 ID를 받아 찜 상태를 반환하는 함수
  getWishlist: () => Movie[]; // 이메일을 받아 찜 목록을 반환하는 함수
}

// zustand store 설정
const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      // 초기 상태
      wishlist: {},

      // 이메일 설정 함수
      setEmail: (email: string) => set({ email }),

      // 영화를 찜하거나 찜 해제하는 함수
      toggleWishlist: (newMovie: Movie) =>
        set((state) => {
          const email = state.email;
          console.log(email);
          if (!email) return state; // 이메일이 설정되지 않은 경우 아무 작업도 하지 않음

          const userWishlist = state.wishlist[email] || [];
          const isInWishlist = userWishlist.some(
            (movie) => movie.id === newMovie.id
          );

          const updatedWishlist = isInWishlist
            ? userWishlist.filter((movie) => movie.id !== newMovie.id) // 이미 찜한 영화라면 삭제
            : [...userWishlist, newMovie]; // 찜하지 않은 영화라면 추가

          return {
            wishlist: {
              ...state.wishlist,
              [email]: updatedWishlist,
            },
          };
        }),

      // 영화가 찜 목록에 포함되어 있는지 확인하는 함수
      includeWishlist: (movie: Movie) => {
        const email = get().email;
        if (!email) return false; // 이메일이 설정되지 않은 경우 false 반환

        const userWishlist = get().wishlist[email] || [];
        return userWishlist.some((m) => m.id === movie.id);
      },

      // 이메일을 이용해서 wishlist를 가져오는 함수
      getWishlist: () => {
        const email = get().email;
        if (!email) return []; // 이메일이 설정되지 않은 경우 빈 배열 반환
        return get().wishlist[email] || [];
      },
    }),
    {
      name: "wishlist", // 저장될 key 이름
      storage: createJSONStorage(() => window.localStorage), // 로컬 스토리지에 저장
    }
  )
);

export default useWishlistStore;
