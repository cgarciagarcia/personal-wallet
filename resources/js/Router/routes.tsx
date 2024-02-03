import type { RouteObject } from "react-router-dom";

import { Home } from "@/Pages/Home";
import { NotFound } from "@/Pages/NotFound";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
