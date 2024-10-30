import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import HomePage from "./pages/HomePage";

const Layout = () => {
    return (
      <>
        {/* <Navbar /> */}
        <Outlet />
        {/* <Footer /> */}
      </>
    )
  }

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="signin" element={<LoginPage />} />
    <Route path="signup" element={<SignupPage />} />
  </Route>
);

const router = createBrowserRouter(routes);

export default router;
