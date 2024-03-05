import { Route, Routes, useLocation } from "react-router-dom";

import { Main } from "@/Components/Layout/Main";
import { Animation } from "@/Router/Animation";
import { GuestRoute } from "@/Router/GuestRoute";
import { PrivateRoute } from "@/Router/PrivateRoute";
import { routes } from "@/Router/routes";

export const Router = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<Main />}>
        <Route element={<GuestRoute />}>
          {routes.public.map((route) => (
            <Route
              path={route.path}
              element={<Animation>{route.element}</Animation>}
              key={route.path}
            />
          ))}
        </Route>
        <Route element={<PrivateRoute />}>
          {routes.private.map((route) => (
            <Route
              path={route.path}
              element={<Animation>{route.element}</Animation>}
              key={route.path}
            />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};
