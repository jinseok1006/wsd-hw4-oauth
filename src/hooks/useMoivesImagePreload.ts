import { useState, useEffect } from "react";
import { Movie, TMDB_IMAGE } from "../api";

export default function useMoviesImagePreload(movies: Movie[]) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(movies);

    // 모든 이미지 로드 확인
    if (!movies || movies.length === 0) {
      setLoading(false);
      return;
    }

    const imageLoadPromises = movies.map(
      (movie) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = `${TMDB_IMAGE}/w300/${movie.poster_path}`; // replace with actual poster URL field
          img.onload = () => resolve();
          img.onerror = () => resolve(); // 에러가 발생해도 처리
        })
    );

    setLoading(true);
    Promise.all(imageLoadPromises).then(() => {
      setLoading(false);
    });

  }, [movies]);

  return loading;
}
