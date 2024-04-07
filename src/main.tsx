import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import SpiritAnimal from "./SpiritAnimal.jsx";
import Layout from "./Layout.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <SpiritAnimal />
    </Layout>
  </React.StrictMode>,
);
