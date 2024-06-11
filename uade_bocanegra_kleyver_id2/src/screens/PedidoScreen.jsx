import React, { useContext, useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { PedidoContext } from '../contexts/PedidoContext'; // Ajusta la ruta según tu estructura de carpetas
import { Link, useParams } from 'react-router-dom';
import { PagoContext } from '../contexts/PagoContext'; // Importa el contexto de pago

const PedidoScreen = () => {
  const { id } = useParams(); // Obtener el ID del pedido de los parámetros de la URL
  const { obtenerPedidoPorId, actualizarPedido, eliminarPedido } = useContext(PedidoContext); // Obtener funciones del contexto
  const [pedido, setPedido] = useState(null); // Estado para almacenar la información del pedido
  const { crearPago } = useContext(PagoContext); // Obtener la función para crear un pago del contexto de pago
  const [error, setError] = useState(null); // Estado para manejar errores
  

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

  const handleIrAPaginaPrincipal = async () => {
    try {
      // Actualizar el pedido a cancelado
      const pedidoActualizado = { ...pedido, estado: 'cancelado' };
      await actualizarPedido(id, pedidoActualizado);
      // Redirigir al usuario a la página principal
      window.location.href = "/home";
    } catch (error) {
      console.error('Error al ir a la página principal:', error.response ? error.response.data : error.message);
    }
  };


  const handleIrAPagar = async () => {
    try {
      if (!pedido || !pedido.id) {
        setError('No se puede realizar el pago: pedido no encontrado.');
        return;
      }
  
      const nuevoPago = {
        usuarioId: "20dc388e-1e13-4c19-b57b-abee8a555190", 
        pedidoId: pedido.id,
        fecha: new Date().toISOString(),
        importeTotal: pedido.importe,
        metodoPago: "", // Aquí debes definir el método de pago
        estadoPago: "pendiente",
        numeroTransaccion: "",
        metodoEnvio: "", // Aquí debes definir el método de envío
        informacionContacto: "", // Aquí debes definir la información de contacto
        notasCliente: "" // Aquí debes definir las notas del cliente
      };
  
      await crearPago(nuevoPago);
      // Cambia la redirección a la página de pago usando la ID del pedido
      window.location.href = `/pagar/${pedido.id}`; // Redirige a la página de pago con la ID del pedido
    } catch (error) {
      setError(error.response ? error.response.data : error.message); // Establecer el error en el estado
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
          <Button variant="primary" onClick={handleIrAPagar}>Ir a Pagar</Button>{' '}
          {/* Agregar botón para ir a la página de pago */}
          <Button variant="danger" onClick={handleCancelarPedido}>Cancelar Pedido</Button>{' '}
          {/* Agregar botón para cancelar pedido */}
          <Link to="/home" className="btn btn-primary" onClick={handleIrAPaginaPrincipal}>Ir a la Página Principal</Link>
          {/* Agregar botón para ir a la página principal */}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </Container>
  );
};

export default PedidoScreen;
