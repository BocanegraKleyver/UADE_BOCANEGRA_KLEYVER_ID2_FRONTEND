import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterScreen = () => {
  const navigate = useNavigate();

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
      // Validaciones de campos
      if (!user.nombre || !user.direccion || !user.email) {
        throw new Error('Todos los campos son obligatorios, excepto la categoría');
      }
      if (user.nombre.length < 3) {
        throw new Error('El nombre debe tener al menos 3 caracteres');
      }
      if (user.direccion.length < 5) {
        throw new Error('La dirección debe tener al menos 5 caracteres');
      }
      if (!validateEmail(user.email)) {
        throw new Error('El email ingresado no es válido');
      }

      const response = await fetch('http://localhost:8080/api/usuario/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      setUser({
        nombre: '',
        direccion: '',
        documentoIdentidad: '',
        categoria: 'LOW',
        usuario: '',
        password: '',
        email: ''
      });

      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Bienvenido a nuestra plataforma.',
      });

      // Redireccionamos a la página de inicio
      navigate('/home');

    } catch (error) {
      console.error('Error:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Función para validar email
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={user.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={user.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Documento de Identidad:</label>
          <input
            type="text"
            name="documentoIdentidad"
            value={user.documentoIdentidad}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            name="categoria"
            value={user.categoria}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            name="usuario"
            value={user.usuario}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterScreen;
