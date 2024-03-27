import { useLocation } from "react-router-dom";

import { routes } from "@/Router/routes";

export const useFooter = () => {
  const location = useLocation();

  let renderFooter = false;
  [routes.private, routes.public].flat().map((route) => {
    if (route.path === location.pathname) {
      renderFooter = route.useFooter === undefined || route.useFooter;
    }
  });

  return renderFooter;
};
