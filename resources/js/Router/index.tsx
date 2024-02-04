import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Main } from "@/Components/Layout/Main";
import { routes } from "@/Router/routes";

export const Router = () => {
  return (
    <BrowserRouter>
      <Main>
        <Routes>
          {routes.map((route, index) => (
            <Route path={route.path} element={route.element} key={index} />
          ))}
        </Routes>
      </Main>
    </BrowserRouter>
  );
};
