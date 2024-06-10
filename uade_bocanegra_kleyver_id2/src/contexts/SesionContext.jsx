import React, { createContext, useContext } from 'react';
import axios from 'axios';

export const SesionContext = createContext();

export const SesionProvider = ({ children }) => {
  const iniciarSesion = async (usuario) => {
    try {
      const response = await axios.post('http://localhost:8080/api/sesion/login', usuario);
      const sesion = response.data;
      return sesion;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.error : 'Error al iniciar sesión'
      );
    }
  };

  const cerrarSesion = async (sesionId) => {
    try {
      await axios.post(`http://localhost:8080/api/sesion/cerrar/${sesionId}`);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <SesionContext.Provider value={{ iniciarSesion, cerrarSesion }}>
      {children}
    </SesionContext.Provider>
  );
};

export const useSesion = () => useContext(SesionContext);
