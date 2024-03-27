import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { env } from "./env";

import "./bootstrap";
import "../css/app.css";
import "react-tooltip/dist/react-tooltip.css";

import { StrictMode } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import { Router } from "@/Router";

const queryClient = new QueryClient();

export const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      {env.VITE_APP_ENV === "local" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <Tooltip id="tooltip" />
      <ToastContainer stacked={true} />
    </QueryClientProvider>
  </StrictMode>
);
