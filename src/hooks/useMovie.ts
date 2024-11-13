import { useEffect, useRef, useState } from "react";
import { useSessionStore } from "../store/useSessionStore";
import { useShallow } from "zustand/react/shallow";
import api, { Movie, MovieResponse } from "../api";

export default function useMovie(mounted: boolean) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const user = useSessionStore(useShallow((state) => state.user));
  const page = useRef(1);
  const fetched = useRef(false);

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
          },
        })
        .json<MovieResponse>();
    }
  };

  useEffect(() => {
    if (mounted && !fetched.current) {
      fetched.current = true;
      page.current = 1;
      for (let i = 0; i < 6; i++) setAdditionalMovies();
    }
  }, [fetched]);

  return [movies, setAdditionalMovies] as const;
}
