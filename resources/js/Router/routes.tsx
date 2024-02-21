import { type RouteObject } from "react-router/dist/lib/context";

import { Home } from "@/Pages/Home";
import { Login } from "@/Pages/Login";
import { NotFound } from "@/Pages/NotFound";

export const ROUTES = {
  home: {
    path: "/",
    component: <Home />,
    label: "Home",
  },
  login: {
    path: "/login",
    component: <Login />,
    label: "login",
  },
  notFound: {
    path: "/404",
    component: <NotFound />,
    label: "Not found",
  },
};

export interface AppRoute {
  useNavbar?: boolean;
}

export type AppRouteType<T> = {
  [K in keyof T]: T[K];
};

export const routes: AppRouteType<RouteObject & AppRoute>[] = [
  {
    path: ROUTES.home.path,
    element: ROUTES.home.component,
  },
  {
    path: ROUTES.notFound.path,
    element: ROUTES.notFound.component,
  },
  {
    path: ROUTES.login.path,
    element: ROUTES.login.component,
    useNavbar: false,
  },
];
