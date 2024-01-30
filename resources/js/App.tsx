import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { env } from "./env";

import "./bootstrap";
import "../css/app.css";

import { StrictMode } from "react";

const queryClient = new QueryClient();

export const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <h1 className="text-4xl font-bold text-red-500">saraza</h1>
      {env.VITE_APP_ENV === "local" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  </StrictMode>
);
