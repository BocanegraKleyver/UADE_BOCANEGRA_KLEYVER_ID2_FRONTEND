import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UsuarioContext } from '../contexts/UsuarioContext';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { usuario, usuarioId, logout } = useContext(UsuarioContext);

  console.log("Usuario en NavigationBar:", usuario); // Agregamos este console.log para verificar el usuario
  console.log("ID del usuario en NavigationBar:", usuarioId); // Agregamos este console.log

  const handleLogout = () => {
    // Realizar el cierre de sesión
    logout();

    // Mostrar mensaje de éxito al cerrar sesión
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada correctamente',
      showConfirmButton: false,
      timer: 1500
    });

    // Redirigir al LoginScreen después de cerrar sesión
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-center">
      <Container>
        <Navbar.Brand>Kleystore 😊</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/carrito">Carrito</Nav.Link>
            {/* Verificar si usuarioId está definido antes de mostrarlo */}
            {usuarioId && (
              <Nav.Item className="text-light ml-3">ID de Usuario: {usuarioId}</Nav.Item>
            )}
            <Nav.Link as={Link} to="/" onClick={handleLogout}>Cerrar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


export default NavigationBar;
