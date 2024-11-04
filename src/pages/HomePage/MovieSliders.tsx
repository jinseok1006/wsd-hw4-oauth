import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";

interface Moive {
  id: number;
  medium_cover_image: string;
  title: string;
}

export default function MovieSlider({ page }: { page: number }) {
  const cx = classNames.bind(styles);
  const [movies, setMovies] = useState<Moive[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(
      `https://yts.mx/api/v2/list_movies.json?limit=20&sort_by=rating&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => setMovies(data.data.movies))
      .catch((error) => console.error("Error fetching movies:", error));
  }, [page]);

  const scrollSlider = (offset: number) => {
    sliderRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className={cx("content-list")}>
      <h1>한국이 만든 콘텐츠</h1>

      <div className={cx("slider")}>
        {movies.map((movie) => (
          <div key={movie.id} className="item">
            <img src={movie.medium_cover_image} alt={movie.title} />
          </div>
        ))}
      </div>
      <button
        className={cx("prev")}
        onClick={() => scrollSlider(-(sliderRef.current?.offsetWidth ?? 0))}
      >
        <i className={cx("fa-solid", "fa-angle-right", "prev-arrow")}></i>
      </button>
      <button
        className={cx("next")}
        onClick={() => scrollSlider(sliderRef.current?.offsetWidth ?? 0)}
      >
        <i className={cx("fa-solid", "fa-angle-right")}></i>
      </button>
    </div>
  );
}

// <div className="movie-slider-container">
//   <button
//     className="prev"
//     onClick={() => scrollSlider(-(sliderRef.current?.offsetWidth ?? 0))}
//   >
//     Prev
//   </button>
//   <div className="slider" ref={sliderRef}>
//     {movies.map((movie) => (
//       <div key={movie.id} className="item">
//         <img src={movie.medium_cover_image} alt={movie.title} />
//       </div>
//     ))}
//   </div>
//   <button
//     className="next"
//     onClick={() => scrollSlider(sliderRef.current?.offsetWidth ?? 0)}
//   >
//     Next
//   </button>
// </div>

// export default function MovieSliders() {
//   return (
//     <div>
//       {[1, 2, 3].map((page) => (
//         <MovieSlider key={page} page={page} />
//       ))}
//     </div>
//   );
// }
