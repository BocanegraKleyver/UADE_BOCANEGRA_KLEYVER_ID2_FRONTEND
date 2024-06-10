import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { CarritoContext } from './CarritoContext';

export const CarritoProductoContext = createContext();

export const CarritoProductoProvider = ({ children }) => {
  const { carritoId } = useContext(CarritoContext);
  const [carritoProductos, setCarritoProductos] = useState([]);

  const getAllCarritoProducto = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/carritoProducto`);
      setCarritoProductos(response.data);
    } catch (error) {
      console.error("Error al obtener todos los productos del carrito:", error.response ? error.response.data : error.message);
    }
  };

  const agregarProductoAlCarrito = async (productoRequest) => {
    try {
      if (!carritoId) {
        throw new Error("No hay un carrito activo para agregar productos.");
      }
      const response = await axios.post(`http://localhost:8080/api/carritoProducto/${carritoId}/producto`, productoRequest);
      setCarritoProductos([...carritoProductos, response.data]);
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error.response ? error.response.data : error.message);
    }
  };

  const eliminarProductoDelCarrito = async (productoId) => {
    try {
      await axios.delete(`http://localhost:8080/api/carritoProducto/producto/${productoId}`);
      setCarritoProductos(carritoProductos.filter((producto) => producto.id !== productoId));
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error.response ? error.response.data : error.message);
    }
  };

  const obtenerProductoEnCarrito = async (productoId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/carritoProducto/producto/${productoId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener producto en el carrito:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <CarritoProductoContext.Provider value={{ carritoProductos, getAllCarritoProducto, agregarProductoAlCarrito, eliminarProductoDelCarrito, obtenerProductoEnCarrito }}>
      {children}
    </CarritoProductoContext.Provider>
  );
};
