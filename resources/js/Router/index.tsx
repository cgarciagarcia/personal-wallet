import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Main } from "@/Components/Layout/Main";
import { Animation } from "@/Router/Animation";
import { routes } from "@/Router/routes";

export const Router = () => {
  return (
    <BrowserRouter>
      <Main
        renderRoutes={(location) => (
          <Routes location={location} key={location.pathname}>
            {routes.map((route, index) => (
              <Route
                path={route.path}
                element={<Animation>{route.element}</Animation>}
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
