import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Movie } from "../api";

// wishlist 상태를 위한 인터페이스 정의
interface WishlistStore {
  wishlist: Movie[]; // 찜한 영화 ID 배열
  toggleWishlist: (newMovie: Movie) => void; // 영화 ID를 받아 찜 상태를 토글하는 함수
  includeWishlist: (movie: Movie) => boolean; // 영화 ID를 받아 찜 상태를 반환하는 함수
}

// zustand store 설정
const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      // 찜한 영화 배열 초기화
      wishlist: [],

      // 영화를 찜하거나 찜 해제하는 함수
      toggleWishlist: (newMovie: Movie) =>
        set((state) => {
          const isInWishlist = state.wishlist.some(
            (movie) => movie.id === newMovie.id
          );
          return {
            wishlist: isInWishlist
              ? state.wishlist.filter((movie) => movie.id !== newMovie.id) // 이미 찜한 영화라면 삭제
              : [...state.wishlist, newMovie], // 찜하지 않은 영화라면 추가
          };
        }),
      includeWishlist: (movie: Movie) => {
        return get().wishlist.some((m) => m.id === movie.id);
      },
    }),
    {
      name: "wishlist", // 저장될 key 이름
      getStorage: () => localStorage, // 로컬 스토리지에 저장
    }
  )
);

export default useWishlistStore;
