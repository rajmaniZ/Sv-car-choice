import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./styles/reset.css";
import "./styles/globals.css";
import "./styles/typography.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error(
        'Root element with id="root" was not found.'
    );
}

createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>
);