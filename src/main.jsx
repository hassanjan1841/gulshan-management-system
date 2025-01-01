import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./components/theme-provider.jsx";
import { PaginateProvider } from "./context/PaginateContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <BrowserRouter>
      <PaginateProvider>
        <AuthProvider>
          <StrictMode>
            <App />
            <Toaster />
          </StrictMode>
        </AuthProvider>
      </PaginateProvider>
    </BrowserRouter>
  </ThemeProvider>
);
