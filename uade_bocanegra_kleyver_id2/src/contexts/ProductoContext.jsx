import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductoContext = createContext();

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getAllProductos();
  }, []);

  const getAllProductos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/producto');
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener todos los productos:", error.response ? error.response.data : error.message);
    }
  };

  const getProductoById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/producto/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error.response ? error.response.data : error.message);
    }
  };

  const saveProducto = async (producto) => {
    try {
      const response = await axios.post('http://localhost:8080/api/producto', producto);
      setProductos([...productos, response.data]); // Actualiza el estado con el nuevo producto
      return response.data;
    } catch (error) {
      console.error("Error al guardar el producto:", error.response ? error.response.data : error.message);
      throw new Error("Hubo un error al guardar el producto.");
    }
  };

  const updateProducto = async (id, producto) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/producto/${id}`, producto);
      setProductos(prevProductos => prevProductos.map((prod) => (prod.id === id ? response.data : prod)));
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el producto:", error.response ? error.response.data : error.message);
      throw new Error("Hubo un error al actualizar el producto.");
    }
  };

  const deleteProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/producto/${id}`);
      setProductos(prevProductos => prevProductos.filter((producto) => producto.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error.response ? error.response.data : error.message);
      throw new Error("Hubo un error al eliminar el producto.");
    }
  };

  const obtenerCantidadDisponibleEnStock = async (id) => {
    try {
      const response = await getProductoById(id);
      return response.cantidad;
    } catch (error) {
      console.error("Error al obtener la cantidad disponible en stock:", error.response ? error.response.data : error.message);
      throw new Error("Hubo un error al obtener la cantidad disponible en stock.");
    }
  };

  const verificarStockDisponible = async (productoId, cantidadRequerida) => {
    try {
      const producto = await getProductoById(productoId);
      if (producto) {
        const cantidadDisponible = producto.cantidad;
        return cantidadDisponible >= cantidadRequerida;
      }
      return false;
    } catch (error) {
      console.error("Error al verificar el stock disponible:", error.response ? error.response.data : error.message);
      throw new Error("Hubo un error al verificar el stock disponible.");
    }
  };

  return (
    <ProductoContext.Provider value={{ productos, getAllProductos, getProductoById, saveProducto, updateProducto, deleteProducto, obtenerCantidadDisponibleEnStock, verificarStockDisponible }}>
      {children}
    </ProductoContext.Provider>
  );
};
