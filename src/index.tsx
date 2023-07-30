import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import BackgroundImg from "./Components/BackgroundImg";
import Navbar from "./Components/Navbar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BackgroundImg />
    <Navbar />
    <App />
  </React.StrictMode>
);
