import { Link } from "react-router-dom";
import { ROUTES } from "../constants";

// https://codewithcurious.com/projects/netflix-clone-using-html-css-and-js/


export default function HomePage() {
  return (
    <div>
      <Link to={ROUTES.signin}>login</Link>
      <Link to={ROUTES.wishlist}>wishlist</Link>
      <Link to={ROUTES.popular}>popular</Link>
      <Link to={ROUTES.search}>search</Link>
    </div>
  );
}
