import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null);

  // Al iniciar, verifica si hay un usuario almacenado en el localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUsuario(userData);
      setUsuarioId(userData.id);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:8080/api/usuario/login', credentials);
      const userData = response.data;
      console.log("Datos del usuario al iniciar sesión:", userData);
      setUsuario(userData);
      setUsuarioId(userData.id);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const logout = async () => {
    if (usuario) {
      try {
        await axios.post('http://localhost:8080/api/usuario/logout', { id: usuarioId });
        console.log(`Usuario con ID: ${usuarioId} ha cerrado su sesión`);
        setUsuario(null);
        setUsuarioId(null);
        localStorage.removeItem('user');
      } catch (error) {
        console.error("Error al cerrar sesión:", error.response ? error.response.data : error.message);
        throw error;
      }
    }
  };

  const register = async (newUser) => {
    try {
      const response = await axios.post('http://localhost:8080/api/usuario/register', newUser);
      return response.data;
    } catch (error) {
      console.error("Error al registrar el usuario:", error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const getUsuarioById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/usuario/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el usuario por ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  };

  return (
    <UsuarioContext.Provider value={{ usuario, usuarioId, login, logout, register, getUsuarioById, setUsuarioId }}>
      {children}
    </UsuarioContext.Provider>
  );
};
