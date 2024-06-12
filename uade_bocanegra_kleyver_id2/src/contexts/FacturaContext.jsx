import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const FacturaContext = createContext();

export const FacturaProvider = ({ children }) => {
  const [facturas, setFacturas] = useState([]);
  const [factura, setFactura] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerTodasLasFacturas();
  }, []);

  const obtenerTodasLasFacturas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/factura');
      setFacturas(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener todas las facturas:", error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  const obtenerFacturaPorId = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/factura/${id}`);
      setFactura(response.data);
    } catch (error) {
      console.error("Error al obtener la factura:", error.response ? error.response.data : error.message);
    }
  };

  const crearFactura = async (nuevaFactura) => {
    try {
      const response = await axios.post('http://localhost:8080/api/factura', nuevaFactura);
      setFacturas([...facturas, response.data]);
    } catch (error) {
      console.error("Error al crear la factura:", error.response ? error.response.data : error.message);
    }
  };

  const actualizarFactura = async (id, facturaActualizada) => {
    try {
      await axios.put(`http://localhost:8080/api/factura/update/${id}`, facturaActualizada);
      // Actualizar localmente después de la respuesta exitosa del servidor
      setFacturas(facturas.map(f => (f.id === id ? facturaActualizada : f)));
    } catch (error) {
      console.error("Error al actualizar la factura:", error.response ? error.response.data : error.message);
    }
  };

  const eliminarFactura = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/factura/delete/${id}`);
      setFacturas(facturas.filter(f => f.id !== id));
    } catch (error) {
      console.error("Error al eliminar la factura:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <FacturaContext.Provider value={{
      facturas,
      factura,
      loading,
      obtenerTodasLasFacturas,
      obtenerFacturaPorId,
      crearFactura,
      actualizarFactura,
      eliminarFactura
    }}>
      {children}
    </FacturaContext.Provider>
  );
};
