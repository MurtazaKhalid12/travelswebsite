import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Your custom styles
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
