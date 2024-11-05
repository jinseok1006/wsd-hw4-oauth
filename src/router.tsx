import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import { ROUTES } from "./constants";
import WishListPage from "./pages/WishListPage";
import PopularPage from "./pages/PopularPage";
import SearchPage from "./pages/SearchPage";
import Layout from "./components/Layout";

const routes = createRoutesFromElements(
  <Route path={ROUTES.root} 
  element={<Layout />}
  >
    <Route index element={
      <HomePage />} 
      />
    <Route path={ROUTES.signin} element={<SignInPage />} />
    <Route path={ROUTES.wishlist} element={<WishListPage />} />
    <Route path={ROUTES.popular} element={<PopularPage />} />
    <Route path={ROUTES.search}
     element={<SearchPage />} 
     />
  </Route>
);

const router = createBrowserRouter(routes);

export default router;
