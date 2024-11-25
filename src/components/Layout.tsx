import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Appbar from "./Appbar";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Appbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
