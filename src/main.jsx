import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

// Wake up Render backend on app load
// The backend spins down after 15 mins of inactivity on the free plan
// This ping gives it time to wake before the user navigates to the blog
fetch(`${import.meta.env.VITE_API_URL}/health`).catch(() => {})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);