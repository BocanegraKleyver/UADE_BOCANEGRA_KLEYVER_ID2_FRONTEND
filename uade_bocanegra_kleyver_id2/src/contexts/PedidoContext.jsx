import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PedidoContext = React.createContext();

const PedidoProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);

  // Obtener todos los pedidos al cargar el componente
  useEffect(() => {
    obtenerTodosPedidos();
  }, []);

  // Función para obtener todos los pedidos
  const obtenerTodosPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/pedido');
      setPedidos(response.data);
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
    }
  };

  // Función para obtener un pedido por su ID
  const obtenerPedidoPorId = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/pedido/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el pedido:', error);
    }
  };

  // Función para crear un nuevo pedido
  const crearPedido = async (carritoId) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/pedido/crear/${carritoId}`);
      setPedidos([...pedidos, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  };

  // Función para actualizar un pedido
  const actualizarPedido = async (id, pedidoActualizado) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/pedido/${id}`, pedidoActualizado);
      setPedidos(pedidos.map(pedido => (pedido.id === id ? response.data : pedido)));
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
    }
  };

  // Función para eliminar un pedido
  const eliminarPedido = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/pedido/${id}`);
      setPedidos(pedidos.filter(pedido => pedido.id !== id));
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
    }
  };

  return (
    <PedidoContext.Provider
      value={{
        pedidos,
        obtenerPedidoPorId,
        crearPedido,
        actualizarPedido,
        eliminarPedido
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};

export { PedidoProvider, PedidoContext };
