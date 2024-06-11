import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductosScreen from "./screens/ProductosScreen";
import ContactoScreen from "./screens/ContactoScreen";
import CarritoScreen from "./screens/CarritoScreen";
import CargarProductoScreen from "./screens/CargarProductoScreen";
import ProductoDetalleScreen from "./screens/ProductoDetalleScreen";
import PedidoScreen from "./screens/PedidoScreen";
import PagoScreen from "./screens/PagoScreen"; // Importar la pantalla de pago
import NavigationBar from "./components/NavigationBar";
import { UsuarioProvider } from "./contexts/UsuarioContext";
import { CarritoProvider } from "./contexts/CarritoContext";
import { CarritoProductoProvider } from "./contexts/CarritoProductoContext";
import { PedidoProvider } from "./contexts/PedidoContext";
import { PagoProvider } from "./contexts/PagoContext"; // Importar PagoProvider

const App = () => {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <div className="App">
      {!isAuthRoute && <NavigationBar />}
      <Routes>
        <Route exact path="/" element={<LoginScreen />} />
        <Route exact path="/register" element={<RegisterScreen />} />
        <Route exact path="/home" element={<HomeScreen />} />
        <Route exact path="/productos" element={<ProductosScreen />} />
        <Route exact path="/contacto" element={<ContactoScreen />} />
        <Route exact path="/carrito" element={<CarritoScreen />} />
        <Route exact path="/producto/:id" element={<ProductoDetalleScreen />} />
        <Route
          exact
          path="/cargar-producto"
          element={<CargarProductoScreen />}
        />
        <Route exact path="/realizar-pedido" element={<PedidoScreen />} />
        <Route path="/pedido/:id" element={<PedidoScreen />} />
        {/* Agregar la ruta para la página de pago */}
        <Route path="/pagar/:id" element={<PagoScreen />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => {
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const usuarioIdFromSession = sessionStorage.getItem("usuarioId");
    if (usuarioIdFromSession) {
      setUsuarioId(usuarioIdFromSession);
    }
  }, []);

  return (
    <Router>
      <UsuarioProvider value={{ usuarioId, setUsuarioId }}>
        <CarritoProvider>
          <CarritoProductoProvider>
            <PedidoProvider>
              <PagoProvider>
                <App />
              </PagoProvider>
            </PedidoProvider>
          </CarritoProductoProvider>
        </CarritoProvider>
      </UsuarioProvider>
    </Router>
  );
};

export default AppWrapper;
