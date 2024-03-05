import { useLocation } from "react-router-dom";

import { routes } from "@/Router/routes";

export const useNavbar = () => {
  const location = useLocation();

  let renderNavbar = false;
  [routes.private, routes.public].flat().map((route) => {
    if (route.path === location.pathname) {
      renderNavbar = route.useNavbar === undefined || route.useNavbar;
    }
  });

  return renderNavbar;
};
