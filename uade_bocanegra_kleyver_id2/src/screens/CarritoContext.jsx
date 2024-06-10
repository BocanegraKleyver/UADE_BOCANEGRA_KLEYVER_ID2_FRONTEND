import React, { createContext, useState } from 'react';
import axios from 'axios';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState({ carritoProducto: [] });

  const obtenerCarrito = async (usuarioId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/carrito/${usuarioId}`);
      setCarrito(response.data);
    } catch (error) {
      console.error("Error al obtener el carrito:", error.response ? error.response.data : error.message);
    }
  };

  const eliminarDelCarrito = async (usuarioId, productoId) => {
    try {
      await axios.delete(`http://localhost:8080/api/carrito/${usuarioId}/carritoProducto/producto/${productoId}`);
      obtenerCarrito(usuarioId); // Actualiza el carrito después de eliminar un producto
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <CarritoContext.Provider value={{ carrito, obtenerCarrito, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
