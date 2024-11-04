import { ROUTES } from "../constants";
import { Link } from "react-router-dom";

// react window, react-virtualized 사용하기
//https://kyounghwan01.github.io/blog/React/infinite-scroll/#intersection-observer-api%E1%84%85%E1%85%B3%E1%86%AF-%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB-%E1%84%86%E1%85%AE%E1%84%92%E1%85%A1%E1%86%AB-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AF
// react-infinite-scroll-component

export default function SearchPage() {
  return (
    <div>
      <Link to={ROUTES.signin}>login</Link>
      <Link to={ROUTES.wishlist}>wishlist</Link>
      <Link to={ROUTES.popular}>popular</Link>
      <Link to={ROUTES.search}>search</Link>
      SearchPage
    </div>
  );
}
