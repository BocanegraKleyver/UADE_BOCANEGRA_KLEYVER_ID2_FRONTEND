import React, { useContext, useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { PedidoContext } from '../contexts/PedidoContext'; // Ajusta la ruta según tu estructura de carpetas
import { Link, useParams, useHistory } from 'react-router-dom'; // Importa useHistory
import { PagoContext } from '../contexts/PagoContext'; // Importa el contexto de pago
import axios from 'axios';

const PedidoScreen = ({ history }) => { // Pasamos history como prop
  const { id } = useParams();
  const { obtenerPedidoPorId, actualizarPedido, eliminarPedido } = useContext(PedidoContext);
  const [pedido, setPedido] = useState(null);
  const { crearPago } = useContext(PagoContext);
  const [error, setError] = useState(null);
  

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

  // const handleIrAPagar = async () => {
  //   try {
  //     if (!pedido || !pedido.id) {
  //       setError('No se puede realizar el pago: pedido no encontrado.');
  //       return;
  //     }
  
  //     const nuevoPago = {
  //       usuarioId: pedido.usuarioId, 
  //       pedidoId: pedido.id,
  //       fecha: new Date().toISOString(),
  //       importeTotal: pedido.importe,
  //       metodoPago: "", 
  //       estadoPago: pedido.estado,
  //       numeroTransaccion: "",
  //       metodoEnvio: "", 
  //       informacionContacto: pedido.usuarioId.email, 
  //       notasCliente: "" 
  //     };
  
  //     // Creamos el pago y obtenemos el nuevo ID
  //     const response = await axios.post('http://localhost:8080/api/pago', nuevoPago);
  //     const nuevoPagoId = response.data.id;
  
  //     // Redireccionamos a la página de pago usando el nuevo ID del pago
  //     window.location.href = `/pago/${nuevoPagoId}`;
  //   } catch (error) {
  //     setError(error.response ? error.response.data : error.message); 
  //   }
  // };

  const handleIrAPagar = async () => {
    try {
      if (!pedido || !pedido.id) {
        setError('No se puede realizar el pago: pedido no encontrado.');
        return;
      }
  
      const nuevoPago = {
        usuarioId: pedido.usuarioId, 
        pedidoId: pedido.id,
        fecha: new Date().toISOString(),
        importeTotal: pedido.importe,
        metodoPago: "", 
        estadoPago: pedido.estado,
        numeroTransaccion: "",
        metodoEnvio: "", 
        informacionContacto: pedido.usuarioId.email, 
        notasCliente: "" 
      };
  
      const response = await axios.post('http://localhost:8080/api/pago/crear/', nuevoPago);
      const nuevoPagoId = response.data.id;
  
      // Redireccionamos a la página de pago usando Link
      // Utilizamos el nuevoPagoId como ID del pago para redirigir a la página de pago
      // Asegúrate de importar Link de react-router-dom
      // return <Link to={`/pago/${nuevoPagoId}`}>Ir a pagar</Link>;

      // Redirigir manualmente con window.location.href
      window.location.href = `/pago/${nuevoPagoId}`;
    } catch (error) {
      setError(error.response ? error.response.data : error.message); 
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

export default PedidoScreen; // Agregamos withRouter aquí para tener acceso a history
