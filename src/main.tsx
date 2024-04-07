import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import CharacterAssignment from "./CharacterAssignment.jsx";
import Layout from "./Layout.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <CharacterAssignment />
    </Layout>
  </React.StrictMode>,
);
