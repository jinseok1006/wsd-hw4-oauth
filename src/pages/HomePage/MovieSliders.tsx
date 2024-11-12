
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { Movie, TMDB_IMAGE } from "../../api";

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
      <h1>{title}</h1>
      <Swiper
        modules={[Navigation, Mousewheel]}
        slidesPerView={"auto"}
        navigation
        spaceBetween={20}
        slidesPerGroup={5}
        mousewheel={true}
        zoom={true}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className={cx("item")} style={slideStyle}>
            <img
              src={`${TMDB_IMAGE}/w300/${movie.poster_path}`}
              alt={movie.title}
              style={{ height: "100%" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
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
