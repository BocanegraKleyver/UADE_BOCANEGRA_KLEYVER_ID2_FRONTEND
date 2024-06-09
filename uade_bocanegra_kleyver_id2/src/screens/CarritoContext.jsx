// CarritoContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children, usuarioId }) => {
  const [carrito, setCarrito] = useState(null);

  const obtenerCarrito = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/carrito/${usuarioId}`);
      setCarrito(response.data);
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
    }
  };

  useEffect(() => {
    obtenerCarrito();
  }, [usuarioId]);

  const agregarAlCarrito = async (productoId, cantidad) => {
    try {
      await axios.put(`http://localhost:8080/api/carrito/${usuarioId}/producto`, { productoId, cantidad });
      obtenerCarrito();
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

  const eliminarDelCarrito = async (productoId) => {
    try {
      await axios.delete(`http://localhost:8080/api/carrito/${usuarioId}/producto/${productoId}`);
      obtenerCarrito();
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    }
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
