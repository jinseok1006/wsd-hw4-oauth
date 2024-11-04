import classNames from "classnames/bind";
import styles from "./index.module.css";
import logoImg from "../../assets/logo.png";
import MovieSlider from "./MovieSliders";
/*
 https://nyagm.tistory.com/68
 */

// slider js로 변경하기
// mui로 헤더 푸터 메인 컴포넌트로 변경

export default function HomePage() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx("container")}>
      <nav>
        <div className={cx("left")}>
          <div className={cx("logo")}>
            <a href="#">
              <img src={logoImg} alt="" />
            </a>
          </div>
          <div className={cx("mobile-menu")}>메뉴</div>
          <ul className={cx("menu-list")}>
            <li>
              <a href="#">홈</a>
            </li>
            <li>
              <a href="#">시리즈</a>
            </li>
            <li>
              <a href="#">영화</a>
            </li>
            <li>
              <a href="#">NEW! 요즘 대세 콘텐츠</a>
            </li>
            <li>
              <a href="#">내가 찜한 콘텐츠</a>
            </li>
          </ul>
        </div>
        <div className={cx("right")}>
          <div className={cx("icon", "search")}>
            <div className={cx("search-bar")}>
              <i className={cx("fa-solid", "fa-magnifying-glass")}></i>
              <input type="text" placeholder="제목, 사람, 장르" />
            </div>
          </div>
          <div className={cx("icon", "kids")}>
            <a href="#">키즈</a>
          </div>
          <div className={cx("icon", "bell")}>
            <a href="#">
              <i className={cx("fa-solid", "fa-bell")}></i>
            </a>
          </div>
          <div className={cx("icon", "profile")}>
            <a href="#">
              <div className={cx("avatar-box")}></div>
              <i className={cx("fa-solid", "fa-caret-down")}></i>
            </a>
          </div>
        </div>
      </nav>
      <main>
        <div className={cx("video")}>
          <video src="./video/doctor.mp4" autoPlay muted loop></video>
        </div>
        <div className={cx("description")}>
          <h1>Doctor Strange 2</h1>
          <h3>매주 새로운 트레일러 공개</h3>
          <p>
            5월, 차원의 경계가 무너지고 닥터 스트레인지가 온다 전 세계를 뒤흔들
            역대급 멀티버스 전쟁의 시작! [닥터 스트레인지: 대혼돈의 멀티버스]
            티저 예고편 공개!
          </p>
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
        <MovieSlider page={0} title="한국이 만든 콘텐츠"/>
        <MovieSlider page={0} title="지금 뜨는 콘텐츠"/>
        <MovieSlider page={0} title="오늘 한국의 TOP 10 콘텐츠"/>
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
