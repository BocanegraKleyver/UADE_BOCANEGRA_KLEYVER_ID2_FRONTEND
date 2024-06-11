import React, { useContext, useEffect } from 'react';
import { PagoContext } from '../contexts/PagoContext';

const PagoScreen = ({ pedidoId }) => {
  const { pago, loading, obtenerPagoPorId, actualizarMetodoPago, actualizarMetodoEnvio, actualizarNotasCliente } = useContext(PagoContext);

  useEffect(() => {
    if (pedidoId) {
      obtenerPagoPorId(pedidoId);
    }
  }, [pedidoId]);

  const handleMetodoPagoChange = (nuevoMetodoPago) => {
    if (pago) {
      actualizarMetodoPago(pago.id, nuevoMetodoPago);
    }
  };

  const handleMetodoEnvioChange = (nuevoMetodoEnvio) => {
    if (pago) {
      actualizarMetodoEnvio(pago.id, nuevoMetodoEnvio);
    }
  };

  const handleNotasClienteChange = (nuevasNotasCliente) => {
    if (pago) {
      actualizarNotasCliente(pago.id, nuevasNotasCliente);
    }
  };

  const handleRealizarCompra = () => {
    // Lógica para realizar la compra
    // Aquí podrías redirigir al usuario a una pantalla de confirmación o éxito de la compra
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {pago && (
        <div>
          <h2>Detalles del Pago</h2>
          <p>ID del Pago: {pago.id}</p>
          <p>Fecha: {pago.fecha}</p>
          <p>Importe Total: ${pago.importeTotal}</p>
          <p>Método de Pago: {pago.metodoPago}</p>
          <p>Estado del Pago: {pago.estadoPago}</p>
          <p>Número de Transacción: {pago.numeroTransaccion}</p>
          <p>Método de Envío: {pago.metodoEnvio}</p>
          <p>Información de Contacto: {pago.informacionContacto}</p>
          <p>Notas del Cliente: {pago.notasCliente}</p>

          {/* Botones para modificar método de pago, método de envío y notas del cliente */}
          <button onClick={() => handleMetodoPagoChange('tarjeta de crédito')}>Modificar Método de Pago</button>
          <button onClick={() => handleMetodoEnvioChange('envío express')}>Modificar Método de Envío</button>
          <button onClick={() => handleNotasClienteChange('Nuevas notas del cliente')}>Actualizar Notas del Cliente</button>

          {/* Botón para realizar la compra */}
          <button onClick={handleRealizarCompra}>Realizar Compra</button>
        </div>
      )}
    </div>
  );
};

export default PagoScreen;
