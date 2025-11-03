/**
 * Application entry point.
 *
 * Initializes the React root and mounts the top-level <App /> component
 * inside React.StrictMode. This file should remain small — its responsibility
 * is limited to bootstrapping the React app and applying global CSS.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/global.css";

// createRoot obtains the DOM container and prepares the React root for rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application wrapped in StrictMode to help surface potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
