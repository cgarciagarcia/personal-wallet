import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { env } from "./env";

import "./bootstrap";
import "../css/app.css";

import { StrictMode } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Router } from "@/Router";

const queryClient = new QueryClient();

export const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
      {env.VITE_APP_ENV === "local" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
