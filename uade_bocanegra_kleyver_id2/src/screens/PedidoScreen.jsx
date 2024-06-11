import React, { useContext, useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { PedidoContext } from '../contexts/PedidoContext'; // Ajusta la ruta según tu estructura de carpetas
import { Link, useParams } from 'react-router-dom';

const PedidoScreen = () => {
  const { id } = useParams(); // Obtener el ID del pedido de los parámetros de la URL
  const { obtenerPedidoPorId, actualizarPedido, eliminarPedido } = useContext(PedidoContext); // Obtener funciones del contexto
  const [pedido, setPedido] = useState(null); // Estado para almacenar la información del pedido

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const pedidoObtenido = await obtenerPedidoPorId(id);
        setPedido(pedidoObtenido);
      } catch (error) {
        console.error('Error al obtener el pedido:', error.response ? error.response.data : error.message);
      }
    };

    fetchPedido();
  }, [id]); // Se ejecutará cada vez que cambie el ID del pedido

  const handleCancelarPedido = async () => {
    try {
      // Actualizar el pedido a cancelado
      const pedidoActualizado = { ...pedido, estado: 'cancelado' };
      await actualizarPedido(id, pedidoActualizado);
      // Redirigir al usuario al carrito después de cancelar el pedido
      window.location.href = "/carrito"; // Redirigir al usuario al carrito
    } catch (error) {
      console.error('Error al cancelar el pedido:', error.response ? error.response.data : error.message);
    }
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container>
      <h1>Detalle del Pedido</h1>
      {pedido ? (
        <div>
          <h2>Información del Pedido</h2>
          <p>ID: {pedido.id}</p>
          {/* <p>Usuario ID: {pedido.usuarioId}</p> */}
          <p>Fecha: {formatDate(pedido.fecha)}</p>
          <p>Estado: {pedido.estado}</p>
          <h2>Información del Cliente</h2>
          <p>Nombre: {pedido.nombreCliente}</p>
          <p>Apellido: {pedido.apellidoCliente}</p>
          <p>Dirección: {pedido.direccionCliente}</p>
          <p>Condición IVA: {pedido.condicionIVA}</p>
          <h2>Importe Total</h2>
          <p>Importe: ${pedido.importe}</p>
          {/* Puedes agregar más detalles del pedido si es necesario */}
          <Link to="/pagar" className="btn btn-primary mr-2">Ir a Pagar</Link>
          <Button variant="danger" onClick={handleCancelarPedido}>Cancelar Pedido</Button>{' '}
          {/* Agregar botón para cancelar pedido */}
          <Link to="/home" className="btn btn-primary">Ir a la Página Principal</Link>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </Container>
  );
};

export default PedidoScreen;
