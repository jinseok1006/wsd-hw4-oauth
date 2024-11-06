import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSessionStore } from "../store/useSessionStore";
import { ROUTES } from "../constants";

const ProtectedRoute: React.FC = () => {
  const user = useSessionStore((state) => state.user);

  if (!user) {
    return <Navigate to={ROUTES.signin} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;