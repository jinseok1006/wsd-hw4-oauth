import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";

const Layout = () => {
  return (
    <>
      <Appbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
