import React from "react";
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
import CargarProductoScreen from "./screens/CargarProductoScreen"; // Importa la pantalla de cargar producto
import ProductoDetalleScreen from "./screens/ProductoDetalleScreen"; // Importa la pantalla de detalle del producto
import NavigationBar from "./components/NavigationBar";

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
      </Routes>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
