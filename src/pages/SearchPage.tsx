import { ROUTES } from "../constants";
import { Link } from "react-router-dom";
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
