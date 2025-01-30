import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./state/AppProvider.tsx";
import LoginPage from "./pages/Login.tsx";
import ProtectedLayout from "./layouts/ProtectedLayout.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedLayout element={<App />} />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>,
);
