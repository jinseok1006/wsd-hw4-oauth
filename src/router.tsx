import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { ROUTES } from "./constants";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import WishListPage from "./pages/WishListPage";
import PopularPage from "./pages/PopularPage";
import SearchPage from "./pages/SearchPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const routes = createRoutesFromElements(
  <Route path={ROUTES.root} element={<Layout />}>
    <Route path={ROUTES.signin} element={<SignInPage />} />
    <Route element={<ProtectedRoute />}>
      <Route index element={<HomePage />} />
      <Route path={ROUTES.wishlist} element={<WishListPage />} />
      <Route path={ROUTES.popular} element={<PopularPage />} />
      <Route path={ROUTES.search} element={<SearchPage />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routes, { basename: '/wsd-hw2-fe'});

export default router;
