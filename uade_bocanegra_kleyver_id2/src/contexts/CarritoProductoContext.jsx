import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { CarritoContext } from './CarritoContext';
import { UsuarioContext } from './UsuarioContext'; 

export const CarritoProductoContext = createContext();

export const CarritoProductoProvider = ({ children }) => {
  const { carritoId } = useContext(CarritoContext);
  const { usuarioId } = useContext(UsuarioContext); // Obtener usuarioId del contexto
  const [carritoProductos, setCarritoProductos] = useState([]);

  // Fetch all products in the cart when the component mounts
  useEffect(() => {
    if (carritoId) {
      getAllCarritoProducto();
    }
  }, [carritoId]);

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
    const response = await axios.post(`http://localhost:8080/api/carritoProducto/${carritoId}/producto`, productoRequest, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 201) {
      // Actualiza el estado del carrito en el contexto si es necesario
      // obtenerCarrito(usuarioId); // Asegúrate de definir esta función si es necesaria
      return response.data;
    } else {
      throw new Error("Error al agregar producto al carrito");
    }
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error.response ? error.response.data : error.message);
    throw error;
  }
};

  const eliminarProductoDelCarrito = async (productoId) => {
    try {
      await axios.delete(`http://localhost:8080/api/carritoProducto/producto/${productoId}`);
      setCarritoProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== productoId));
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
      return null;
    }
  };

  return (
    <CarritoProductoContext.Provider value={{ carritoProductos, getAllCarritoProducto, agregarProductoAlCarrito, eliminarProductoDelCarrito, obtenerProductoEnCarrito }}>
      {children}
    </CarritoProductoContext.Provider>
  );
};
