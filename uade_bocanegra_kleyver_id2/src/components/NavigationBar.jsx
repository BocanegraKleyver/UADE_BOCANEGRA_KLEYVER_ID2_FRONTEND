import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UsuarioContext } from '../contexts/UsuarioContext';
import { CarritoContext } from '../contexts/CarritoContext';
import { FaShoppingCart } from 'react-icons/fa'; // Importa el icono de carrito


const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, usuarioId, logout } = useContext(UsuarioContext);
  const { carritoId, logoutCarrito } = useContext(CarritoContext);

  console.log("Usuario en NavigationBar:", usuario);
  console.log("ID del usuario en NavigationBar:", usuarioId);

  const handleLogout = () => {
    logout(usuarioId); // Llamamos a logout con el usuarioId
    logoutCarrito(usuarioId); // Cerramos el carrito del usuario
  
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada correctamente',
      showConfirmButton: false,
      timer: 1500
    });
  
    navigate('/');
  };

  // Verificar si estamos en la página de inicio de sesión o registro para ocultar el enlace de "Cerrar Sesión"
  const isAuthRoute = location.pathname === "/" || location.pathname === "/register";

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-center">
      <Container>
        <Navbar.Brand as={Link} to="/home">Kleystore 😊</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>          
            <Nav.Link as={Link} to="/carrito"><FaShoppingCart style={{ fontSize: '1.5em', marginRight: '5px' }} /></Nav.Link>
            <Nav.Link as={Link} to="/pedido">Pedidos</Nav.Link> 
            <Nav.Link as={Link} to="/pago">Pagos</Nav.Link> 
            <Nav.Link as={Link} to="/factura">Facturas</Nav.Link>
            {usuario && usuario.usuario.role === 'admin' && (
              <Nav.Link as={Link} to="/cargar-producto">Catalogo</Nav.Link>
            )}
            {usuarioId && (
              <>
                <Nav.Item className="text-light ml-3">ID de Usuario: {usuarioId}</Nav.Item>
                {carritoId && <Nav.Item className="text-light ml-3">ID de Carrito: {carritoId}</Nav.Item>}
              </>
            )}
            {!isAuthRoute && <Nav.Link as={Link} to="/" onClick={handleLogout}>Cerrar Sesión</Nav.Link>}
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;








