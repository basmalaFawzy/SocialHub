import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router-dom";
import { MyRouter } from "./lib/router";
import AuthContextProvider from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContextProvider from "./context/UserContext";
import { ToastContainer } from "react-toastify";



const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <UserContextProvider>
          <HeroUIProvider>
            <RouterProvider router={MyRouter} />
            <ToastContainer/>
          </HeroUIProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
