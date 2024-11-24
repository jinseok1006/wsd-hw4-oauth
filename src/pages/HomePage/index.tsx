import classNames from "classnames/bind";
import styles from "./index.module.css";
import MovieSlider from "./MovieSliders";
import { User, useSessionStore } from "../../store/useSessionStore";

import { useAsync } from "react-use";
import api, { TMDB_IMAGE, type MovieResponse } from "../../api";

import { useShallow } from "zustand/react/shallow";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import { motion } from "motion/react";
import {
  fadeInAnimation,
  fadeInCommonOptions,
} from "../../animation/pageTransition";
// const zoomOutAnimation = {
//   initial: { scale: 1.05, opacity: 0 },  // 확대된 상태와 투명한 상태에서 시작
//   animate: { scale: 1, opacity: 1 },   // 원래 크기와 불투명 상태로 이동
//   transition: { duration: 1, ease: "easeOut" }, // 1초 동안 자연스러운 전환
// };

const heroImageZoomOut = {
  initial: { scale: 1.05, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const heroDescriptionFadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 }, // 살짝 아래에서 등장
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut", delay }, // 지연 시간 추가
  },
});

export default function HomePage() {
  const cx = classNames.bind(styles);

  const user = useSessionStore(useShallow((state) => state.user));
  const { popularMovies, tvShowMovies, animationMovies, loading, error } =
    useFetchMovies(user);

  if (loading) {
    return <CircularIndeterminate />;
  }

  if (error) {
    console.error(error);
    return <div>error!</div>;
  }

  if (!popularMovies || !tvShowMovies || !animationMovies) {
    return <div>No popular movies found.</div>;
  }

  const featuredMovie = popularMovies.results[0];

  return (
    <div className={cx("container")} style={{ overflowY: "hidden" }}>
      <main>
        <motion.div className={cx("video")} {...heroImageZoomOut}>
          <img
            src={`${TMDB_IMAGE}/original/${featuredMovie.backdrop_path}`}
          ></img>
        </motion.div>
        <motion.div className={cx("description")} {...heroDescriptionFadeIn(1)}>
          <h1>{featuredMovie.title}</h1>

          <p>{featuredMovie.overview}</p>
          <div className={cx("buttons")}>
            <button className={cx("play")}>
              <i className={cx("fa-solid", "fa-play")}></i>
              <span>재생</span>
            </button>
            <button className={cx("detail")}>
              <i className={cx("fa-solid", "fa-circle-info")}></i>상세 정보
            </button>
          </div>
        </motion.div>
        <div className={cx("age-info")}>
          <i className={cx("fa-solid", "fa-rotate-right")}></i>
          <div className={cx("age")}>15+</div>
        </div>
      </main>
      <section>
        <MovieSlider title="지금 뜨는 콘텐츠" movies={popularMovies.results} />
        <MovieSlider title="TV 시리즈" movies={tvShowMovies.results} />
        <MovieSlider title="애니메이션 영화" movies={animationMovies.results} />
      </section>
      <footer>
        <div className={cx("wrap")}>
          <motion.div className={cx("social-icons")} {...fadeInCommonOptions}>
            <i className={cx("fa-brands", "fa-facebook-square")}></i>
            <i className={cx("fa-brands", "fa-instagram")}></i>
            <i className={cx("fa-brands", "fa-twitter")}></i>
            <i className={cx("fa-brands", "fa-youtube")}></i>
          </motion.div>
          <motion.div className={cx("options")} {...fadeInCommonOptions}>
            <div className={cx("option")}>자막 및 음성</div>
            <div className={cx("option")}>음성 지원</div>
            <div className={cx("option")}>고객 센터</div>
            <div className={cx("option")}>기프트카드</div>
            <div className={cx("option")}>미디어 센터</div>
            <div className={cx("option")}>투자 정보(IR)</div>
            <div className={cx("option")}>입사 정보</div>
            <div className={cx("option")}>이용 약관</div>
            <div className={cx("option")}>개인 정보</div>
            <div className={cx("option")}>법적 고지</div>
            <div className={cx("option")}>쿠키 설정</div>
            <div className={cx("option")}>회사 정보</div>
            <div className={cx("option")}>문의하기</div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

function useFetchMovies(user: User | null) {
  const { value, loading, error } = useAsync(
    async () =>
      user &&
      Promise.all([
        fetchPopularMovies(user),
        fetchTvShows(user),
        fetchAnimations(user),
      ]),
    [user]
  );

  const [popularMovies, tvShowMovies, animationMovies] = value ?? [];

  return {
    popularMovies,
    tvShowMovies,
    animationMovies,
    loading,
    error,
  };
}

const fetchPopularMovies = (user: User) =>
  api
    .get("movie/popular", {
      searchParams: {
        api_key: user.apiKey,
      },
    })
    .json<MovieResponse>();

const fetchTvShows = (user: User) =>
  api
    .get("discover/tv", {
      searchParams: {
        api_key: user.apiKey,
      },
    })
    .json<MovieResponse>();

const fetchAnimations = (user: User) =>
  api
    .get("discover/movie", {
      searchParams: {
        api_key: user.apiKey,
        with_genres: 16,
      },
    })
    .json<MovieResponse>();
