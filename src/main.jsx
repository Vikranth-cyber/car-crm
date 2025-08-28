import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,     // ✅ Enable React.startTransition for smoother updates
        v7_relativeSplatPath: true,   // ✅ Future-proof relative splat route behavior
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
