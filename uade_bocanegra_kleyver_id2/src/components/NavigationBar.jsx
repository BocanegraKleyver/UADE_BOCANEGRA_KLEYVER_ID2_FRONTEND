import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Simular el cierre de sesión
    localStorage.removeItem('user');
    
    // Mostrar mensaje de éxito al cerrar sesión
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada correctamente',
      showConfirmButton: false,
      timer: 1500
    });

    // Redirigir al HomeScreen después de cerrar sesión
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-center">
      <Container>
        {/* Actualizado para mostrar el nombre de la tienda "Kleystore" con una carita feliz */}
        <Navbar.Brand>
          Kleystore <span role="img" aria-label="smiley">😊</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/carrito">Carrito</Nav.Link>
            <Nav.Link as={Link} to="/" onClick={handleLogout}>Cerrar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
