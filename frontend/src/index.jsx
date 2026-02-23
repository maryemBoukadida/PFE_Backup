import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
/*import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// On récupère le div root
const rootElement = document.getElementById("root");

// Création du root React
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);*/