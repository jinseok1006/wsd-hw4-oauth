import appbarStyle from "./appbar.module.css";
import classNames from "classnames/bind";


export default function Appbar() {
  const cx = classNames.bind(appbarStyle);

  return (
    <nav className={cx("appbar")}>
      <div className={cx("left")}>
        <div className={cx("logo")}>
          <a href="#">
            <img src="logo.png" alt="" />
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
  );
}
