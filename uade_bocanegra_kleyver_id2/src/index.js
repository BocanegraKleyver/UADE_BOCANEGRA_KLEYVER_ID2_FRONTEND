import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { UsuarioProvider } from "./contexts/UsuarioContext";
import { CarritoProvider } from "./contexts/CarritoContext";
import { CarritoProductoProvider } from "./contexts/CarritoProductoContext";
import { PagoProvider } from "./contexts/PagoContext";
import { FacturaProvider } from "./contexts/FacturaContext";
import { ProductoProvider } from "./contexts/ProductoContext"; // Agregar ProductoProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UsuarioProvider>
      <CarritoProvider>
        <CarritoProductoProvider>
          <PagoProvider>
            <FacturaProvider>
              <ProductoProvider>
                {" "}
                {/* Agregar ProductoProvider */}
                <App />
              </ProductoProvider>
            </FacturaProvider>
          </PagoProvider>
        </CarritoProductoProvider>
      </CarritoProvider>
    </UsuarioProvider>
  </React.StrictMode>
);

reportWebVitals();
