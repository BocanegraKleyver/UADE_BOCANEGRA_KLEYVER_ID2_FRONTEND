import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UsuarioContext } from './UsuarioContext';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const { usuarioId } = useContext(UsuarioContext);
  const [carrito, setCarrito] = useState(null);
  // const [carrito, setCarrito] = useState({});
  const [carritoId, setCarritoId] = useState(null);
  const [carritoProductos, setCarritoProductos] = useState([]); // 

  useEffect(() => {
    if (usuarioId) {
      obtenerCarrito(usuarioId);
    }
  }, [usuarioId]);

  const obtenerCarrito = async (usuarioId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/carrito/${usuarioId}`);
      const carritoData = response.data;
      setCarrito(carritoData);
      setCarritoId(carritoData.id);
      setCarritoProductos(response.data.carritoProductos);
    } catch (error) {
      console.error("Error al obtener el carrito:", error.response ? error.response.data : error.message);
      throw error;
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

  const eliminarCarrito = async (usuarioId) => {
    try {
      await axios.delete(`http://localhost:8080/api/carrito/${usuarioId}`);
      setCarrito({});
      setCarritoId(null);
    } catch (error) {
      console.error("Error al eliminar el carrito:", error.response ? error.response.data : error.message);
    }
  };

  const modificarEstadoCarrito = async (usuarioId, estado) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/carrito/${usuarioId}?estado=${estado}`);
      setCarrito((prevCarrito) => ({
        ...prevCarrito,
        activo: estado === 'activo',
      }));
    } catch (error) {
      console.error("Error al modificar el estado del carrito:", error.response ? error.response.data : error.message);
    }
  };

  const agregarIdsCarritoProductoAlCarrito = async (usuarioId, idsCarritoProducto) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/carrito/${usuarioId}/carritoProducto`, idsCarritoProducto);
      setCarrito(response.data);
    } catch (error) {
      console.error("Error al agregar IDs de productos al carrito:", error.response ? error.response.data : error.message);
    }
  };


  const eliminarCarritoProductoDelCarrito = async (productoId) => {
    try {
      await axios.delete(`http://localhost:8080/api/carritoProducto/delete/{carritoProductoId}`);
      // Volver a obtener el carrito para asegurarse de que el precio total se actualiza correctamente
      await obtenerCarrito(usuarioId);
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error.response ? error.response.data : error.message);
    }
  };

// Agrega este método para actualizar el carrito después de eliminar un producto
const actualizarCarritoDespuesDeEliminarProducto = async (productoId) => {
  try {
    await axios.put(`http://localhost:8080/api/carritoProducto/${carritoId}/producto/${productoId}`);
    // Volver a obtener el carrito para asegurarse de que los productos se actualizan correctamente
    await obtenerCarrito(usuarioId);
  } catch (error) {
    console.error("Error al actualizar el carrito después de eliminar el producto:", error.response ? error.response.data : error.message);
  }
};


const actualizarCantidadProductoEnCarrito = async (carritoProductoId, nuevaCantidad) => {
  try {
    await axios.put(`http://localhost:8080/api/carritoProducto/${carritoId}/cantidad`, {
      carritoProductoId,
      nuevaCantidad,
    });
    // Actualizar el carrito después de modificar la cantidad
    await obtenerCarrito(usuarioId);
  } catch (error) {
    console.error("Error al actualizar la cantidad del producto en el carrito:", error.response ? error.response.data : error.message);
  }
};



  const logoutCarrito = async (usuarioId) => {
    try {
      await modificarEstadoCarrito(usuarioId, 'cerrado');
      setCarrito({});
      setCarritoId(null);
    } catch (error) {
      console.error("Error al cerrar sesión del carrito:", error.response ? error.response.data : error.message);
    }
  }
  
  
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
  

  
  const actualizarCarrito = async () => {
    try {
      if (usuarioId) {
        const response = await axios.get(`http://localhost:8080/api/carrito/${usuarioId}`);
        setCarrito(response.data);
        setCarritoId(response.data.id);
        setCarritoProductos(response.data.carritoProductos);
      }
    } catch (error) {
      console.error("Error al actualizar el carrito:", error.response ? error.response.data : error.message);
    }
  };

  
  ;

  return (
    <CarritoContext.Provider value={{
      carrito,
      carritoId,
      setCarritoId,
      obtenerCarrito,
      crearCarrito,
      eliminarCarrito,
      modificarEstadoCarrito,
      agregarIdsCarritoProductoAlCarrito,
      eliminarCarritoProductoDelCarrito,
      logoutCarrito,
      agregarProductoAlCarrito,
      actualizarCarritoDespuesDeEliminarProducto,
      actualizarCarrito,
      actualizarCantidadProductoEnCarrito
    }}>
      {children}
    </CarritoContext.Provider>
  );
};
