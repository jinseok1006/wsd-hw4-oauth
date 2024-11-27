import {  useRef, useState } from "react";
import { useSessionStore } from "../store/useSessionStore";
import { useShallow } from "zustand/react/shallow";
import api, { Movie, MovieResponse } from "../api";
import removeRedundantMovies from "../utils/removeRedundantMovies";

export default function useKeywordMovie() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const user = useSessionStore(useShallow((state) => state.user));
  const page = useRef(1);
  //   const fetched = useRef(false);

  const setAdditionalMovies = async (keyword: string, number: number) => {
    const cache: Movie[] = [];

    for (let i = 0; i < number; i++) {
      const moreMovies = await fetchMoreMovies(keyword);
      if (!moreMovies) {
        continue;
      }
      cache.push(...moreMovies.results);
      page.current++;
    }

    // 중복된 영화 제거
    const uniqueMoreMovies = removeRedundantMovies(movies, cache);

    // 상태 업데이트
    return setMovies([...movies, ...uniqueMoreMovies]);
  };

  const setNewMovies = async (keyword: string) => {
    page.current = 1;
    const newMovies = await fetchMoreMovies(keyword);
    if (newMovies) {
      setMovies([...newMovies.results]);
    }
  };

  const fetchMoreMovies = async (keyword: string) => {
    if (user) {
      return api
        .get("search/movie", {
          searchParams: {
            api_key: user.apiKey,
            page: page.current++,
            query: keyword,
          },
        })
        .json<MovieResponse>();
    }
  };

  return [movies, setNewMovies, setAdditionalMovies] as const;
}
