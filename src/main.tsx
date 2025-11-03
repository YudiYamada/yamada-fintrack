import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { Toaster } from "./components/ui/sonner.tsx";
import { AuthContextProvider } from "./contexts/auth.tsx";
import HomePage from "./pages/home.tsx";
import LoginPage from "./pages/login.tsx";
import NotFoundPage from "./pages/not-found.tsx";
import SignupPage from "./pages/signup.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
