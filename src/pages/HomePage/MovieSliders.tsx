import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Movie {
  id: number;
  medium_cover_image: string;
  title: string;
}

export default function MovieSlider({
  title,
  page,
}: {
  title: string;
  page: number;
}) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(
      `https://yts.mx/api/v2/list_movies.json?limit=20&sort_by=rating&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => setMovies(data.data.movies))
      .catch((error) => console.error("Error fetching movies:", error));
  }, [page]);

  return (
    <div className="content-list">
      <h1>{title}</h1>
      <Swiper
        modules={[Navigation]}
        slidesPerView={8}
        navigation
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="item">
              <img src={movie.medium_cover_image} alt={movie.title} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}