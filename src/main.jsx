import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter wraps the entire app to enable React Router v6 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);