import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
const UsuarioActividadContext = createContext();

// Creamos un Provider para el contexto
export const UsuarioActividadProvider = ({ children }) => {
  const [usuarioActividades, setUsuarioActividades] = useState([]);

  // Función para agregar una nueva actividad al contexto
  const agregarActividad = (nuevaActividad) => {
    setUsuarioActividades([...usuarioActividades, nuevaActividad]);
  };

  // Función para eliminar una actividad del contexto
  const eliminarActividad = (id) => {
    setUsuarioActividades(usuarioActividades.filter((actividad) => actividad.id !== id));
  };

  return (
    <UsuarioActividadContext.Provider value={{ usuarioActividades, agregarActividad, eliminarActividad }}>
      {children}
    </UsuarioActividadContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useUsuarioActividad = () => useContext(UsuarioActividadContext);
