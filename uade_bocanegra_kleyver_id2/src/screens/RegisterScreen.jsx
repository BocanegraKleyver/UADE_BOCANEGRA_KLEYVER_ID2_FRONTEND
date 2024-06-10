import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UsuarioContext } from '../contexts/UsuarioContext';
import { CarritoProductoContext } from '../contexts/CarritoProductoContext'; // Importa el contexto del carrito si lo necesitas

const RegisterScreen = () => {
  const navigate = useNavigate();
  const { register, setUsuarioId } = useContext(UsuarioContext);

  const [user, setUser] = useState({
    nombre: '',
    direccion: '',
    documentoIdentidad: '',
    categoria: 'LOW',
    usuario: '',
    password: '',
    email: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await register(user);
      console.log('Nuevo usuario registrado:', response);
      setUsuarioId(response.id); // Establece el ID del usuario en el contexto
      
      // Mostrar mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Bienvenido a nuestra plataforma.',
      }).then(() => {
        // Redirigir a la página de inicio después del registro exitoso
        navigate('/');
      });
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      // Mostrar mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="nombre" name="nombre" value={user.nombre} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input type="text" className="form-control" id="direccion" name="direccion" value={user.direccion} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="documentoIdentidad" className="form-label">Documento de Identidad</label>
          <input type="text" className="form-control" id="documentoIdentidad" name="documentoIdentidad" value={user.documentoIdentidad} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">Usuario</label>
          <input type="text" className="form-control" id="usuario" name="usuario" value={user.usuario} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterScreen;
