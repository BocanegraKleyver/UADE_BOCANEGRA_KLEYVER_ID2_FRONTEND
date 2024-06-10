import React, { createContext, useState } from 'react';

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null); // Almacena el usuarioId

  const login = (userData) => {
    setUsuario(userData);
    setUsuarioId(userData.id); // Almacena el usuarioId al iniciar sesión
  };

  const logout = () => {
    setUsuario(null);
    setUsuarioId(null); // Elimina el usuarioId al cerrar sesión
  };

  return (
    <UsuarioContext.Provider value={{ usuario, usuarioId, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
};
