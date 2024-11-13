import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSessionStore } from "../store/useSessionStore";
import { ROUTES } from "../constants";
import { useShallow } from "zustand/react/shallow";

const ProtectedRoute: React.FC = () => {
  const user = useSessionStore(useShallow((state) => state.user));
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={ROUTES.signin}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
