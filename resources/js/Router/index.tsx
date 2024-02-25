import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Main } from "@/Components/Layout/Main";
import { Animation } from "@/Router/Animation";
import { ROUTES, routes } from "@/Router/routes";

export const Router = () => {
  return (
    <BrowserRouter>
      <Main
        renderRoutes={(location, hasSession) => (
          <Routes location={location} key={location.pathname}>
            {routes.public.map((route, index) => (
              <Route
                path={route.path}
                element={<Animation>{route.element}</Animation>}
                key={index}
              />
            ))}
            {routes.private.map((route, index) => (
              <Route
                path={route.path}
                element={
                  <Animation>
                    {hasSession ? (
                      route.element
                    ) : (
                      <Navigate to={ROUTES.login.path} replace />
                    )}
                  </Animation>
                }
                key={index}
              />
            ))}
            )
          </Routes>
        )}
      />
    </BrowserRouter>
  );
};
