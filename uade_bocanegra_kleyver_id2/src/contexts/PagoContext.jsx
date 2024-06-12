import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PagoContext = createContext();

export const PagoProvider = ({ children }) => {
  const [pagos, setPagos] = useState([]);
  const [pago, setPago] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerTodosLosPagos();
  }, []);

  const obtenerTodosLosPagos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/pago');
      setPagos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener todos los pagos:", error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  const obtenerPagoPorId = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/pago/${id}`);
      setPago(response.data);
    } catch (error) {
      console.error("Error al obtener el pago:", error.response ? error.response.data : error.message);
    }
  };

  const crearPago = async (nuevoPago) => {
    try {
      const response = await axios.post('http://localhost:8080/api/pago/crear/', nuevoPago);
      setPagos([...pagos, response.data]);
    } catch (error) {
      console.error("Error al crear el pago:", error.response ? error.response.data : error.message);
    }
  };

  const actualizarPago = async (id, pagoActualizado) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/pago/${id}`, pagoActualizado);
      setPagos(pagos.map(p => (p.id === id ? response.data : p)));
    } catch (error) {
      console.error("Error al actualizar el pago:", error.response ? error.response.data : error.message);
    }
  };

  const eliminarPago = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/pago/${id}`);
      setPagos(pagos.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar el pago:", error.response ? error.response.data : error.message);
    }
  };

  const actualizarMetodoPago = async (id, metodoPago) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/pago/${id}/metodo-pago`, metodoPago);
      setPagos(pagos.map(p => (p.id === id ? response.data : p)));
    } catch (error) {
      console.error("Error al actualizar el método de pago:", error.response ? error.response.data : error.message);
    }
  };

  const actualizarMetodoEnvio = async (id, metodoEnvio) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/pago/${id}/metodo-envio`, metodoEnvio);
      setPagos(pagos.map(p => (p.id === id ? response.data : p)));
    } catch (error) {
      console.error("Error al actualizar el método de envío:", error.response ? error.response.data : error.message);
    }
  };

  const actualizarNotasCliente = async (id, notasCliente) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/pago/${id}/notas-cliente`, notasCliente);
      setPagos(pagos.map(p => (p.id === id ? response.data : p)));
    } catch (error) {
      console.error("Error al actualizar las notas del cliente:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <PagoContext.Provider value={{
      pagos,
      pago,
      loading,
      obtenerTodosLosPagos,
      obtenerPagoPorId,
      crearPago,
      actualizarPago,
      eliminarPago,
      actualizarMetodoPago,
      actualizarMetodoEnvio,
      actualizarNotasCliente
    }}>
      {children}
    </PagoContext.Provider>
  );
};
