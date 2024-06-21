import { type RouteObject } from "react-router/dist/lib/context";

import {
  BudgetPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
} from "@/Pages";

export interface AppRoute {
  useNavbar?: boolean;
  useFooter?: boolean;
}

export type AppRouteType<T> = {
  [K in keyof T]: T[K];
};

export type AppRoutesType = AppRouteType<RouteObject & AppRoute>;

export const ROUTES = {
  home: {
    path: "/",
    component: <HomePage />,
    label: "Home",
  },
  login: {
    path: "/login",
    component: <LoginPage />,
    label: "Login",
  },
  register: {
    path: "/registration",
    component: <RegisterPage />,
    label: "Register",
  },
  notFound: {
    path: "/404",
    component: <NotFoundPage />,
    label: "Not found",
  },
  budget: {
    path: "/budget",
    component: <BudgetPage />,
    label: "Budgets",
  },
};

export const routes: {
  public: AppRoutesType[];
  private: AppRoutesType[];
} = {
  public: [
    {
      path: "/*",
      element: ROUTES.notFound.component,
    },
    {
      path: ROUTES.notFound.path,
      element: ROUTES.notFound.component,
    },
    {
      path: ROUTES.login.path,
      element: ROUTES.login.component,
      useNavbar: false,
      useFooter: false,
    },
    {
      path: ROUTES.register.path,
      element: ROUTES.register.component,
      useNavbar: false,
      useFooter: false,
    },
  ],
  private: [
    {
      path: ROUTES.home.path,
      element: ROUTES.home.component,
    },
    {
      path: ROUTES.budget.path,
      element: ROUTES.budget.component,
    },
  ],
};
