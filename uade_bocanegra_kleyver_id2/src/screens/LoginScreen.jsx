import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Form, Button, Container } from 'react-bootstrap';
import nuveVoladora from '../assets/img/nubeVoladora.jpg'; 
import { UsuarioContext } from '../contexts/UsuarioContext'; 

const LoginScreen = () => {
  const navigate = useNavigate();
  const { login } = useContext(UsuarioContext);

  const [credentials, setCredentials] = useState({
    usuario: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!credentials.usuario || !credentials.password) {
        throw new Error('Por favor, ingresa el usuario y la contraseña');
      }
   
      // Utilizamos el método login del contexto de usuario
      await login(credentials);
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 1500
      });

      navigate('/home');
  
    } catch (error) {
      console.error('Error:', error.message);
      
      // Verificamos si el error es por credenciales incorrectas
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrecta, o el usuario no se encuentra registrado. Por favor, verifique.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    }
  };
  

  return (
    <Container className="d-flex flex-column align-items-center text-center">
      <img src={nuveVoladora} alt="Silla" style={{ maxWidth: '200px', marginBottom: '20px' }} />
      <h2 className="my-4">Bienvenido a KleyStore</h2>
      <Form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <div className="mb-3">
          <Form.Label>Usuario:</Form.Label>
          <Form.Control
            type="text"
            name="usuario"
            value={credentials.usuario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button className="mt-3" variant="primary" type="submit">
          Iniciar Sesión
        </Button>
      </Form>
      <p className="mt-3">¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </Container>
  );
};

export default LoginScreen;
