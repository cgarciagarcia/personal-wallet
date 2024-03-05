import { type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/Router/routes";
import { useAuthStore } from "@/Stores/useAuthStore";

export const GuestRoute = ({ children }: { children?: ReactNode }) => {
  const { credentials } = useAuthStore();

  if (credentials.access_token || credentials.refresh_token) {
    return <Navigate to={ROUTES.home.path} replace />;
  }

  return <>{children ?? <Outlet />}</>;
};
