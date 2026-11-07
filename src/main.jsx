import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./style.css";
// Static hosts cannot rewrite nested routes. Hash routing keeps production refreshes on index.html.
const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);
