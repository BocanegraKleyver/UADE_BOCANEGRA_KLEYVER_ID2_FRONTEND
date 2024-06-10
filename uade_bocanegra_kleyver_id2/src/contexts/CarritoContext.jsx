import React, { createContext, useState } from 'react';
import axios from 'axios';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState({});
  const [carritoId, setCarritoId] = useState(null);

  const obtenerCarrito = async (usuarioId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/carrito/${usuarioId}`);
      setCarrito(response.data);
      setCarritoId(response.data.id);
    } catch (error) {
      console.error("Error al obtener el carrito:", error.response ? error.response.data : error.message);
    }
  };

  const crearCarrito = async (usuarioId) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/carrito/${usuarioId}`);
      setCarrito(response.data);
      setCarritoId(response.data.id);
    } catch (error) {
      console.error("Error al crear el carrito:", error.response ? error.response.data : error.message);
    }
  };

  const eliminarCarrito = async (carritoId) => {
    try {
      await axios.delete(`http://localhost:8080/api/carrito/${carritoId}`);
      setCarrito({});
      setCarritoId(null);
    } catch (error) {
      console.error("Error al eliminar el carrito:", error.response ? error.response.data : error.message);
    }
  };

  const modificarEstadoCarrito = async (carritoId, estado) => {
    try {
      await axios.put(`http://localhost:8080/api/carrito/${carritoId}?estado=${estado}`);
      // Actualizar el estado del carrito en el contexto
      setCarrito((prevCarrito) => ({
        ...prevCarrito,
        estado: estado,
      }));
    } catch (error) {
      console.error("Error al modificar el estado del carrito:", error.response ? error.response.data : error.message);
    }
  };

  const agregarIdsCarritoProductoAlCarrito = async (carritoId, idsCarritoProducto) => {
    try {
      await axios.post(`http://localhost:8080/api/carrito/${carritoId}/carritoProducto`, idsCarritoProducto);
      // Actualizar los IDs de los productos del carrito en el contexto
      setCarrito((prevCarrito) => ({
        ...prevCarrito,
        carritoProductoId: idsCarritoProducto,
      }));
    } catch (error) {
      console.error("Error al agregar IDs de productos al carrito:", error.response ? error.response.data : error.message);
    }
  };

  const eliminarCarritoProductoDelCarrito = async (carritoId, productoId) => {
    try {
      await axios.delete(`http://localhost:8080/api/carrito/${carritoId}/carritoProducto/producto/${productoId}`);
      // Remover el producto del carrito en el contexto
      setCarrito((prevCarrito) => ({
        ...prevCarrito,
        carritoProductoId: prevCarrito.carritoProductoId.filter((id) => id !== productoId),
      }));
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <CarritoContext.Provider value={{ carrito, carritoId, obtenerCarrito, crearCarrito, eliminarCarrito, modificarEstadoCarrito, agregarIdsCarritoProductoAlCarrito, eliminarCarritoProductoDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
