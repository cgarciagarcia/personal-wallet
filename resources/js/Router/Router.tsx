import { Route, Routes, useLocation } from "react-router-dom";

import { Main } from "@/Components/Layout/Main";
import { GuestRoute, PrivateRoute, routes } from "@/Router";

export const Router = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<Main />}>
        <Route element={<GuestRoute />}>
          {routes.public.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </Route>
        <Route element={<PrivateRoute />}>
          {routes.private.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};
