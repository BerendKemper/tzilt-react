import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./app/Router/Router";
import "./app/Router/Router.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Router />
  </StrictMode>
);


