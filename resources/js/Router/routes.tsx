import { type RouteObject } from "react-router/dist/lib/context";

import { Home } from "@/Pages/Home";
import { Login } from "@/Pages/Login";
import { NotFound } from "@/Pages/NotFound";
import { Register } from "@/Pages/Register";

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
  register: {
    path: "/registration",
    component: <Register />,
    label: "register",
  },
  notFound: {
    path: "/404",
    component: <NotFound />,
    label: "Not found",
  },
};

export interface AppRoute {
  useNavbar?: boolean;
  visibility?: "public" | "private";
}

export type AppRouteType<T> = {
  [K in keyof T]: T[K];
};

export type AppRoutesType = AppRouteType<RouteObject & AppRoute>;

export const routes: {
  public: AppRoutesType[];
  private: AppRoutesType[];
} = {
  public: [
    {
      path: "/*",
      element: ROUTES.notFound.component,
      visibility: "public",
    },
    {
      path: ROUTES.notFound.path,
      element: ROUTES.notFound.component,
      visibility: "public",
    },
    {
      path: ROUTES.login.path,
      element: ROUTES.login.component,
      useNavbar: false,
      visibility: "public",
    },
    {
      path: ROUTES.register.path,
      element: ROUTES.register.component,
      useNavbar: false,
      visibility: "public",
    },
  ],
  private: [
    {
      path: ROUTES.home.path,
      element: ROUTES.home.component,
      visibility: "private",
    },
  ],
};
