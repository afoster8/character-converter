import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import json from "./conversion_table.json"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App json={json}/>
  </React.StrictMode>
);
