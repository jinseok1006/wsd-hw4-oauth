import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import classNames from "classnames/bind";
import styles from "./index.module.css";

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
  const cx = classNames.bind(styles);
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
    <div className={cx("content-list")}>
      <h1>{title}</h1>
      <Swiper
        modules={[Navigation, Mousewheel]}
        slidesPerView={"auto"}
        navigation
        spaceBetween={10}
        slidesPerGroup={5}
        mousewheel={true}
        zoom={true}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className={cx("item")} >
            <img src={movie.medium_cover_image} alt={movie.title} style={{height: '100%'}}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
