import { useEffect, useRef, useState } from "react";
import { useSessionStore } from "../store/useSessionStore";
import { useShallow } from "zustand/react/shallow";
import api, { Movie, MovieResponse } from "../api";

export default function useMovie() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const user = useSessionStore(useShallow((state) => state.user));
  const page = useRef(1);
  const fetched = useRef(false);

  const setAdditionalMovies = async (number: number) => {
    const cache: Movie[] = [];

    for (let i = 0; i < number; i++) {
      const moreMovies = await fetchMoreMovies();
      if (!moreMovies) {
        continue;
      }
      cache.push(...moreMovies.results);
    }

    // cache 값 내부의 중복되는 영화 ID 제거
    const movieIds = new Set<number>();
    if (movies.length > 0) {
      movies.slice(-20).forEach((movie) => {
        movieIds.add(movie.id);
      });
    }

    const uniqueMoreMovies = cache.filter((movie) => {
      if (movieIds.has(movie.id)) {
        return false;
      }
      movieIds.add(movie.id);
      return true;
    });

    if (movies.length === 0) {
      return setMovies(uniqueMoreMovies);
    }


    // 상태 업데이트
    return setMovies((prevMovies) => [...prevMovies, ...uniqueMoreMovies]);
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
    if (!fetched.current) {
      fetched.current = true;
      page.current = 1;
      setAdditionalMovies(10);
    }
  }, [fetched]);

  return [movies, setAdditionalMovies] as const;
}
