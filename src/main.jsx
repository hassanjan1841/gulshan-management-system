import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./components/theme-provider.jsx";
import { PaginateProvider } from "./context/PaginateContext.jsx";
import { ChangingInBatchContextProvider } from "./context/batchContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <BrowserRouter>
      <PaginateProvider>
        <AuthProvider>
          <ChangingInBatchContextProvider>
          <StrictMode>
            <App />
            <Toaster />
          </StrictMode>
          </ChangingInBatchContextProvider>
        </AuthProvider>
      </PaginateProvider>
    </BrowserRouter>
  </ThemeProvider>
);
