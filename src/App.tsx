import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import Cart from "./components/Cart";
import "./index.css";

const App = () => (
  <BrowserRouter>
    <Cart />
  </BrowserRouter>
);

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
