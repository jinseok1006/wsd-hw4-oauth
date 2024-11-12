import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Movie } from "../api";

// wishlist 상태를 위한 인터페이스 정의
interface WishlistStore {
  wishlist: number[]; // 찜한 영화 ID 배열
  toggleWishlist: (movieId: number) => void; // 영화 ID를 받아 찜 상태를 토글하는 함수
}

// zustand store 설정
const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      // 찜한 영화 배열 초기화
      wishlist: [],

      // 영화를 찜하거나 찜 해제하는 함수
      toggleWishlist: (movieId: number) =>
        set((state) => {
          const isInWishlist = state.wishlist.includes(movieId);
          return {
            wishlist: isInWishlist
              ? state.wishlist.filter((id) => id !== movieId) // 이미 찜한 영화라면 삭제
              : [...state.wishlist, movieId], // 찜하지 않은 영화라면 추가
          };
        }),
    }),
    {
      name: "wishlist", // 저장될 key 이름
      getStorage: () => localStorage, // 로컬 스토리지에 저장
    }
  )
);

export default useWishlistStore;
