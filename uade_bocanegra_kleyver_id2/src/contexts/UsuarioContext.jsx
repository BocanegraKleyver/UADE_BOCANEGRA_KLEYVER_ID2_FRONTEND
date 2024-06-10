import React, { createContext, useState, useEffect } from 'react';

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

  const login = (userData) => {
    console.log("Datos del usuario al iniciar sesión:", userData); // Agregar este console.log
    setUsuario(userData);
    setUsuarioId(userData.id);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const logout = () => {
    setUsuario(null);
    setUsuarioId(null);
    localStorage.removeItem('user');
  };

  return (
    <UsuarioContext.Provider value={{ usuario, usuarioId, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
};
