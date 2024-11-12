import { create } from "zustand";
import { persist} from "zustand/middleware";
import { Movie } from "../api";

interface WishlistState {
  wishlist: Movie[];
  add: (movie: Movie) => void;
  remove: (movie: Movie) => void;
}

const useWishlist = create(
  persist(
    (set) => ({
      wishlist: [],
      add: (movie: Movie) =>
        set((state: WishlistState) => ({
          wishlist: [...state.wishlist, movie],
        })),
      remove: (movie: Movie) =>
        set((state: WishlistState) => ({
          wishlist: state.wishlist.filter((m) => m.id !== movie.id),
        })),
    }),
    {
      name: "wishlist-storage",
    }
  )
);

export default useWishlist;
