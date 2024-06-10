import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el CSS de Bootstrap
import reportWebVitals from "./reportWebVitals";
import { UsuarioProvider } from "./screens/UsuarioContext"; // Ajusta la ruta según tu estructura de carpetas
import { CarritoProvider } from "./screens/CarritoContext"; // Ajusta la ruta según tu estructura de carpetas

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UsuarioProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </UsuarioProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
