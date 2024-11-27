import classNames from "classnames/bind";
import styles from "./index.module.css";
import MovieSlider from "./MovieSliders";
import { User, useSessionStore } from "../../store/useSessionStore";

import { useAsync } from "react-use";
import api, { Movie, TMDB_IMAGE, type MovieResponse } from "../../api";

import { useShallow } from "zustand/react/shallow";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import { motion } from "motion/react";
import { fadeInCommonOption } from "../../animation/pageTransition";
import { Box,  Typography } from "@mui/material";
import { MotionBox } from "../../utils/motionBox";

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

  // const allMovies = useMemo(
  //   () => [
  //     ...(popularMovies?.results ?? []),
  //     ...(tvShowMovies?.results ?? []),
  //     ...(animationMovies?.results ?? []),
  //   ],
  //   [popularMovies?.results, tvShowMovies?.results, animationMovies?.results]
  // );

  if (loading) {
    return <CircularIndeterminate />;
  }

  if (error) {
    console.error(error);
    return <div>error!</div>;
  }

  if (
    !popularMovies?.results ||
    !tvShowMovies?.results ||
    !animationMovies?.results
  ) {
    return <div>No popular movies found.</div>;
  }

  const featuredMovie = popularMovies.results[0];

  // if (imageSrcLoading) {
  //   return <CircularIndeterminate />;
  // }

  return (
    <div className={cx("container")} style={{ overflow: "hidden" }}>
      <main>
        <Hero featuredMovie={featuredMovie} />
      </main>
      <section>
        <MovieSlider title="지금 뜨는 콘텐츠" movies={popularMovies.results} />
        <MovieSlider title="TV 시리즈" movies={tvShowMovies.results} />
        <MovieSlider title="애니메이션 영화" movies={animationMovies.results} />
      </section>
      <Box component="footer" sx={{ pt: 10 }}>
        <div className={cx("wrap")}>
          <motion.div className={cx("social-icons")} {...fadeInCommonOption}>
            <i className={cx("fa-brands", "fa-facebook-square")}></i>
            <i className={cx("fa-brands", "fa-instagram")}></i>
            <i className={cx("fa-brands", "fa-twitter")}></i>
            <i className={cx("fa-brands", "fa-youtube")}></i>
          </motion.div>
          <SimpleFooter />
        </div>
      </Box>
    </div>
  );
}

function Hero({ featuredMovie }: { featuredMovie: Movie }) {
  const cx = classNames.bind(styles);
  // featuredMovie.backdrop_path
  const src = `${TMDB_IMAGE}/original/${featuredMovie.backdrop_path}`;

  // const loading = useImagePreload(src);
  // const loading = true;

  // console.log(loading);

  // if (loading) {
  //   return (
  //     <Box display="flex" justifyContent="center" alignItems="center">
  //       <Skeleton
  //         variant="rectangular"
  //         height="60vh"
  //         width="100%"
  //         animation="wave"
  //       />
  //     </Box>
  //   );
  // }

  return (
    <>
      <motion.div className={cx("video")} {...heroImageZoomOut}>
        {/* <img src={src} /> */}
        <Box
          sx={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover", // 배경 이미지가 컨테이너를 완전히 덮도록 설정
            backgroundPosition: "center", // 배경 이미지를 컨테이너의 중앙에 위치
            backgroundRepeat: "no-repeat", // 배경 이미지 반복 방지
            height: { md: "60vh", xs: "30vh"},
            width: "100%",
          }}
        />
      </motion.div>
      <MotionBox
        className={cx("description")}
        {...heroDescriptionFadeIn(1)}
        sx={{ display: { xs: "none", md: "block" } }}
      >
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
      </MotionBox>
      <MotionBox
          className={cx("description")}
          {...heroDescriptionFadeIn(1)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <h1>{featuredMovie.title}</h1>
          <div className={cx("buttons")}>
            <button className={cx("play")}>
              <i className={cx("fa-solid", "fa-play")}></i>
              <span>재생</span>
            </button>
            <button className={cx("detail")}>
              <i className={cx("fa-solid", "fa-circle-info")}></i>상세 정보
            </button>
          </div>
        </MotionBox>
      <MotionBox
        className={cx("age-info")}
        sx={{ display: { xs: "none !important", md: "flex !important" } }}
        {...heroDescriptionFadeIn(1.5)}
      >
        <i className={cx("fa-solid", "fa-rotate-right")}></i>
        <div className={cx("age")}>15+</div>
      </MotionBox>
    </>
  );
}

function SimpleFooter() {
  const cx = classNames.bind(styles);
  return (
    <motion.div className={cx("options")} {...fadeInCommonOption}>
      <Typography
        sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
        component="div"
        className={cx("option")}
      >
        자막 및 음성
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
        component="div"
        className={cx("option")}
      >
        음성 지원
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
        component="div"
        className={cx("option")}
      >
        고객 센터
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
        component="div"
        className={cx("option")}
      >
        기프트카드
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
        component="div"
        className={cx("option")}
      >
        미디어 센터
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
        component="div"
        className={cx("option")}
      >
        투자 정보(IR)
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
        component="div"
        className={cx("option")}
      >
        입사 정보
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
        component="div"
        className={cx("option")}
      >
        이용 약관
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
        component="div"
        className={cx("option")}
      >
        개인 정보
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
        component="div"
        className={cx("option")}
      >
        법적 고지
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
        component="div"
        className={cx("option")}
      >
        쿠키 설정
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
        component="div"
        className={cx("option")}
      >
        회사 정보
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
        component="div"
        className={cx("option")}
      >
        문의하기
      </Typography>
    </motion.div>
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
    movies: value,
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
    .get("discover/movie", {
      searchParams: {
        api_key: user.apiKey,
        with_genres: 10770,
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
