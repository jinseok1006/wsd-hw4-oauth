import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSessionStore } from "../store/useSessionStore";
import { ROUTES } from "../constants";

const ProtectedRoute: React.FC = () => {
  const user = useSessionStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={ROUTES.signin}
        replace
        state={{from: location.pathname}}
      />
    );
  }

  return <Outlet />;
};



export default ProtectedRoute;
