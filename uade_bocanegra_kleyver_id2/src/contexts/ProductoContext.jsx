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
      setProductos([...productos, response.data]);
      return response.data;
    } catch (error) {
      console.error("Error al guardar el producto:", error.response ? error.response.data : error.message);
    }
  };

  const updateProducto = async (id, producto) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/producto/${id}`, producto);
      setProductos(productos.map((prod) => (prod.id === id ? response.data : prod)));
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el producto:", error.response ? error.response.data : error.message);
    }
  };

  const deleteProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/producto/${id}`);
      setProductos(productos.filter((producto) => producto.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error.response ? error.response.data : error.message);
    }
  };

  const obtenerCantidadDisponibleEnStock = async (id) => {
    try {
      const response = await getProductoById(id);
      return response.cantidad;
    } catch (error) {
      console.error("Error al obtener la cantidad disponible en stock:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <ProductoContext.Provider value={{ productos, getAllProductos, getProductoById, saveProducto, updateProducto, deleteProducto, obtenerCantidadDisponibleEnStock }}>
      {children}
    </ProductoContext.Provider>
  );
};
