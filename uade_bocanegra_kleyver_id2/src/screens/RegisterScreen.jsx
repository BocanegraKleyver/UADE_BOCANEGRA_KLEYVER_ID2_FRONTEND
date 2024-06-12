import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { UsuarioContext } from '../contexts/UsuarioContext';
import { Link, useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const { register, setUsuarioId } = useContext(UsuarioContext);

  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    documentoIdentidad: '',
    usuario: '',
    password: '',
    email: ''
  });

    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
    };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const validationErrors = {};
    if (user.nombre.length < 3 || user.nombre.length > 20) {
      validationErrors.nombre = 'El nombre debe tener entre 3 y 20 caracteres.';
    }
    if (user.apellido.length < 3 || user.apellido.length > 20) {
      validationErrors.apellido = 'El apellido debe tener entre 3 y 20 caracteres.';
    }
    if (user.direccion.length < 5 || user.direccion.length > 30) {
      validationErrors.direccion = 'La dirección debe tener entre 5 y 30 caracteres.';
    }
    if (user.documentoIdentidad.length !== 8) {
      validationErrors.documentoIdentidad = 'El documento de identidad debe tener 8 caracteres y ser Numerico.';
    }
    if (user.usuario.length < 5 || user.usuario.length > 20) {
      validationErrors.usuario = 'El usuario debe tener entre 5 y 20 caracteres.';
    }
    if (user.password.length < 6 || user.password.length > 20) {
      validationErrors.password = 'La contraseña debe tener entre 6 y 20 caracteres.';
    }
    if (!validateEmail(user.email)) {
      validationErrors.email = 'El email no es válido.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await register(user);
      console.log('Nuevo usuario registrado:', response);
      
      if (response && response.usuario) {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Bienvenido a nuestra plataforma. Por favor realiza el Login.',
        }).then(() => {
          navigate('/');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al registrar el usuario. Por favor, inténtalo de nuevo.',
        });
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined }); 
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="nombre" name="nombre" value={user.nombre} onChange={handleChange} />
          {errors.nombre && <div className="text-danger">{errors.nombre}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input type="text" className="form-control" id="apellido" name="apellido" value={user.apellido} onChange={handleChange} />
          {errors.apellido && <div className="text-danger">{errors.apellido}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input type="text" className="form-control" id="direccion" name="direccion" value={user.direccion} onChange={handleChange} />
          {errors.direccion && <div className="text-danger">{errors.direccion}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="documentoIdentidad" className="form-label">Documento de Identidad</label>
          <input type="text" className="form-control" id="documentoIdentidad" name="documentoIdentidad" value={user.documentoIdentidad} onChange={handleChange} />
          {errors.documentoIdentidad && <div className="text-danger">{errors.documentoIdentidad}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">Usuario</label>
          <input type="text" className="form-control" id="usuario" name="usuario" value={user.usuario} onChange={handleChange} />
          {errors.usuario && <div className="text-danger">{errors.usuario}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleChange} />
          {errors.password && <div className="text-danger">{errors.password}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
        <Link to="/" className="btn btn-link">Volver</Link>
      </form>
    </div>
  );
};

export default RegisterScreen;