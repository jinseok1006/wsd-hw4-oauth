import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import { ROUTES } from "./constants";
import WishListPage from "./pages/WishListPage";

const Layout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

const routes = createRoutesFromElements(
  <Route path={ROUTES.root} element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path={ROUTES.signin} element={<SignInPage />} />
    <Route path={ROUTES.wishlist} element={<WishListPage />} />
  </Route>
);

const router = createBrowserRouter(routes);

export default router;
