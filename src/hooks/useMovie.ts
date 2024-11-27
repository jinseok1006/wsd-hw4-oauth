import { useEffect, useRef, useState } from "react";
import { useSessionStore } from "../store/useSessionStore";
import { useShallow } from "zustand/react/shallow";
import api, { Movie, MovieResponse } from "../api";
import removeRedundantMovies from "../utils/removeRedundantMovies";

export default function useMovie() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const user = useSessionStore(useShallow((state) => state.user));
  const page = useRef(1);
  const fetched = useRef(false);

  const setAdditionalMovies = async (number: number) => {
    const cache: Movie[] = [];

    for (let i = 0; i < number; i++) {
      const moreMovies = await fetchMoreMovies(page.current);
      if (!moreMovies) {
        continue;
      }
      cache.push(...moreMovies.results);
      page.current++;
    }

    // 중복된 영화 제거
    const uniqueMoreMovies = removeRedundantMovies(movies, cache).filter(
      (movie) => movie.poster_path !== null
    );

    // 상태 업데이트
    return setMovies([...movies, ...uniqueMoreMovies]);
  };

  const fetchMoreMovies = async (page: number) => {
    if (user) {
      return api
        .get("movie/popular", {
          searchParams: {
            api_key: user.apiKey,
            page,
          },
        })
        .json<MovieResponse>();
    }
  };

  useEffect(() => {
    if (!fetched.current) {
      fetched.current = true;
      page.current = 1;
      setAdditionalMovies(10);
    }
  }, [fetched]);

  return [movies, setAdditionalMovies] as const;
}
