import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { Movie } from "../../api";
import { useEffect } from "react";
import { motion } from "motion/react";
import { fadeInCommonOption } from "../../animation/pageTransition";
import MoviePoster from "./MoviePoster";
import { Typography } from "@mui/material";

const slideStyle = { paddingTop: "10px", paddingBottom: "10px" };

export default function MovieSlider({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
}) {
  const cx = classNames.bind(styles);


  return (
    <div className={cx("content-list")}>
      <Typography
        component="h1"
        sx={{
          mx: 2.5,
          mt: { xs: 2, md: 3 },
          mb: { xs: 0, md: 1.5 },
          fontSize: { xs: "1.2rem", md: "1.5rem" },
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
      <motion.div {...fadeInCommonOption}>
        <Swiper
          modules={[Navigation, Mousewheel]}
          slidesPerView={"auto"}
          navigation
          spaceBetween={20}
          slidesPerGroup={5}
          // mousewheel={true}
          zoom={true}
        >
          {movies.map((movie) => (
            <SwiperSlide
              key={movie.id}
              className={cx("item")}
              style={slideStyle}
            >
              <MoviePoster movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
}

// const [movies, setMovies] = useState<Movie[]>([]);

// useEffect(() => {
//   fetch(
//     `https://yts.mx/api/v2/list_movies.json?limit=20&sort_by=rating&page=${page}`
//   )
//     .then((response) => response.json())
//     .then((data) => setMovies(data.data.movies))
//     .catch((error) => console.error("Error fetching movies:", error));
// }, [page]);
