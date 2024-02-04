import { type RouteObject } from "react-router-dom";

import { Home } from "@/Pages/Home";
import { NotFound } from "@/Pages/NotFound";

export const ROUTES = {
  home: {
    path: "/",
    component: <Home />,
    label: "Home",
  },
  notFound: {
    path: "/404",
    component: <NotFound />,
    label: "Not found",
  },
};

export const routes: RouteObject[] = [
  {
    path: ROUTES.home.path,
    element: ROUTES.home.component,
  },
  {
    path: ROUTES.notFound.path,
    element: ROUTES.notFound.component,
  },
];
