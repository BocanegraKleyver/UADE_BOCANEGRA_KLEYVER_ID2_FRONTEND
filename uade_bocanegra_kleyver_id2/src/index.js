import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el CSS de Bootstrap
import reportWebVitals from "./reportWebVitals";
import { UsuarioProvider } from "./contexts/UsuarioContext"; // Ajusta la ruta según tu estructura de carpetas
import { CarritoProvider } from "./contexts/CarritoContext"; // Ajusta la ruta según tu estructura de carpetas
import { CarritoProductoProvider } from "./contexts/CarritoProductoContext";
import { PagoProvider } from "./contexts/PagoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UsuarioProvider>
      <CarritoProvider>
        <CarritoProductoProvider>
          <PagoProvider>
            <App />
          </PagoProvider>
        </CarritoProductoProvider>
      </CarritoProvider>
    </UsuarioProvider>
  </React.StrictMode>
);
// Si quieres empezar a medir el rendimiento de tu aplicación, pasa una función
// para registrar resultados (por ejemplo: reportWebVitals(console.log))
// o envía a un punto de análisis. Aprende más: https://bit.ly/CRA-vitals
reportWebVitals();
