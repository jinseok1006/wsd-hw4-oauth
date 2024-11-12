import classNames from "classnames/bind";
import styles from "./index.module.css";
import MovieSlider from "./MovieSliders";
import { useSessionStore } from "../../store/useSessionStore";

import { useAsync } from "react-use";
import ky from "ky";
import api, { TMDB_IMAGE, type MovieResponse } from "../../api";
import { useEffect } from "react";
/*
 https://nyagm.tistory.com/68
 */

// slider js로 변경하기
// mui로 헤더 푸터 메인 컴포넌트로 변경

export default function HomePage() {
  const cx = classNames.bind(styles);

  const user = useSessionStore((state) => state.user);

  const fetchMovies = async (endpoint: string) => {
    if (user) {
      const response = await api.get(endpoint, {
        searchParams: {
          api_key: user.apiKey,
        },
      });
      return response.json<MovieResponse>();
    }
  };

  const PopularMovies = useAsync(
    () => fetchMovies("movie/popular"),
    [user]
  );
  const nowPlayingMovies = useAsync(
    () => fetchMovies("movie/now_playing"),
    [user]
  );
  const actionMovies = useAsync(
    () => fetchMovies("discover/movie"),
    [user]
  );

  useEffect(() => {
    console.log(
      PopularMovies.value,
      nowPlayingMovies.value,
      actionMovies.value
    );
  }, [PopularMovies, nowPlayingMovies, actionMovies]);

  if (
    PopularMovies.loading ||
    nowPlayingMovies.loading ||
    actionMovies.loading
  ) {
    return <div>loading...</div>;
  }

  if (PopularMovies.error || nowPlayingMovies.error || actionMovies.error) {
    if (PopularMovies.error) {
      console.error(PopularMovies.error.message);
    }
    if (nowPlayingMovies.error) {
      console.error(nowPlayingMovies.error.message);
    }
    if (actionMovies.error) {
      console.error(actionMovies.error.message);
    }
    return <div>error...</div>;
  }

  if (!PopularMovies.value || !nowPlayingMovies.value || !actionMovies.value) {
    return <div>No popular movies found.</div>;
  }

  const movie = PopularMovies.value.results[0];

  return (
    <div className={cx("container")}>
      <main>
        <div className={cx("video")}>
          <img src={`${TMDB_IMAGE}/original/${movie.backdrop_path}`}></img>
        </div>
        <div className={cx("description")}>
          <h1>{movie.title}</h1>

          <p>{movie.overview}</p>
          <div className={cx("buttons")}>
            <button className={cx("play")}>
              <i className={cx("fa-solid", "fa-play")}></i>
              <span>재생</span>
            </button>
            <button className={cx("detail")}>
              <i className={cx("fa-solid", "fa-circle-info")}></i>상세 정보
            </button>
          </div>
        </div>
        <div className={cx("age-info")}>
          <i className={cx("fa-solid", "fa-rotate-right")}></i>
          <div className={cx("age")}>15+</div>
        </div>
      </main>
      <section>
        <MovieSlider
          title="지금 뜨는 콘텐츠"
          movies={PopularMovies.value.results}
        />
        <MovieSlider
          title="현재 상영작"
          movies={nowPlayingMovies.value.results}
        />
        <MovieSlider title="액션 영화" movies={actionMovies.value.results} />
      </section>
      <footer>
        <div className={cx("wrap")}>
          <div className={cx("social-icons")}>
            <i className={cx("fa-brands", "fa-facebook-square")}></i>
            <i className={cx("fa-brands", "fa-instagram")}></i>
            <i className={cx("fa-brands", "fa-twitter")}></i>
            <i className={cx("fa-brands", "fa-youtube")}></i>
          </div>
          <div className={cx("options")}>
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
          </div>
        </div>
      </footer>
    </div>
  );
}
