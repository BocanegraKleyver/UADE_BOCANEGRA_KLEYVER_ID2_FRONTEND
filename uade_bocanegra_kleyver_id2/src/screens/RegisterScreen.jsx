// RegisterScreen.jsx

import React, { useState } from 'react';

const RegisterScreen = () => {
  const [user, setUser] = useState({
    nombre: '',
    direccion: '',
    dni: '',
    categoria: '',
    usuario: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos de registro al backend
    console.log('Datos de registro:', user);
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={user.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={user.direccion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>DNI:</label>
          <input
            type="text"
            name="dni"
            value={user.dni}
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
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterScreen;
