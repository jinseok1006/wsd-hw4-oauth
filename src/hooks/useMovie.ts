import { useEffect, useRef, useState } from "react";
import { useSessionStore } from "../store/useSessionStore";
import { useShallow } from "zustand/react/shallow";
import api, { Movie, MovieResponse } from "../api";

export default function useMovie(mounted: boolean, perPage = 20) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const user = useSessionStore(useShallow((state) => state.user));
  const page = useRef(1);

  const setAdditionalMovies = async () => {
    const moreMovies = await fetchMoreMovies();
    if (moreMovies) {
      setMovies((movies) => [...movies, ...moreMovies.results]);
    }
  };

  const fetchMoreMovies = async () => {
    if (user) {
      return api
        .get("movie/popular", {
          searchParams: {
            api_key: user.apiKey,
            page: page.current++,
            per_page: perPage,
          },
        })
        .json<MovieResponse>();
    }
  };

  useEffect(() => {
    if (mounted) {
      page.current = 1;
      for (let i = 0; i < 6; i++) setAdditionalMovies();
    }
  }, []);

  return [movies, setAdditionalMovies] as const;
}
