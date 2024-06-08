import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Form, Button, Container } from 'react-bootstrap';

const LoginScreen = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    usuario: '', // Cambiar a 'usuario' en lugar de 'username'
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!credentials.usuario || !credentials.password) { // Cambiar a 'usuario' en lugar de 'username'
        throw new Error('Por favor, ingresa el usuario y la contraseña');
      }

      const response = await fetch('http://localhost:8080/api/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error('Usuario o contraseña incorrectos');
      }

      const user = await response.json();
      // Guardar el usuario en el localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Mostrar mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 1500
      });

      // Redirigir al HomeScreen después de iniciar sesión correctamente
      navigate('/home');

    } catch (error) {
      console.error('Error:', error.message);
      // Mostrar mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  return (
    <Container>
      <h2 className="my-4">Iniciar Sesión</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="usuario">
          <Form.Label>Usuario:</Form.Label>
          <Form.Control
            type="text"
            name="usuario"
            value={credentials.usuario}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Iniciar Sesión
        </Button>
      </Form>
      <p className="mt-3">¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </Container>
  );
};

export default LoginScreen;
