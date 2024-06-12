import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import { PagoContext } from '../contexts/PagoContext';
import { Link, useParams } from 'react-router-dom';

const PagoScreen = () => {
  const { id } = useParams();
  const [pago, setPago] = useState(null);
  const [loading, setLoading] = useState(true); // Inicializa loading en true
  const [email, setEmail] = useState(""); // Estado para la información de contacto
  const [alias, setAlias] = useState(""); // Estado para el alias en Transferencia
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [nombreTarjeta, setNombreTarjeta] = useState("");
  const [mesVencimiento, setMesVencimiento] = useState("");
  const [anioVencimiento, setAnioVencimiento] = useState("");
  const [cvc, setCvc] = useState("");

  // Función para obtener el pago por ID
  const obtenerPagoPorId = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/pago/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Función para actualizar el método de pago
  const actualizarMetodoPago = async (id, nuevoMetodoPago) => {
    try {
      await axios.put(`http://localhost:8080/api/pago/${id}/metodo-pago`, { metodoPago: nuevoMetodoPago });
      // Actualizar el estado del pago localmente
      setPago({ ...pago, metodoPago: nuevoMetodoPago });
      if (nuevoMetodoPago === 'Efectivo') {
        handleMetodoEnvioChange('Retiro en sucursal');
      }
    } catch (error) {
      console.error('Error al actualizar el método de pago:', error.response ? error.response.data : error.message);
    }
  };

  // Función para actualizar el método de envío
  const actualizarMetodoEnvio = async (id, nuevoMetodoEnvio) => {
    try {
      await axios.put(`http://localhost:8080/api/pago/${id}/metodo-envio`, { metodoEnvio: nuevoMetodoEnvio });
      // Actualizar el estado del pago localmente
      setPago({ ...pago, metodoEnvio: nuevoMetodoEnvio });
    } catch (error) {
      console.error('Error al actualizar el método de envío:', error.response ? error.response.data : error.message);
    }
  };

  // Función para actualizar las notas del cliente
  const actualizarNotasCliente = async (id, nuevasNotasCliente) => {
    try {
      await axios.put(`http://localhost:8080/api/pago/${id}/notas-cliente`, { notasCliente: nuevasNotasCliente });
      // Actualizar el estado del pago localmente
      setPago({ ...pago, notasCliente: nuevasNotasCliente });
    } catch (error) {
      console.error('Error al actualizar las notas del cliente:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const fetchPago = async () => {
      try {
        const pagoObtenido = await obtenerPagoPorId(id);
        setPago(pagoObtenido);
        setEmail(pagoObtenido.informacionContacto || ""); // Establece el email inicial si está disponible
        setLoading(false); // Termina la carga
      } catch (error) {
        console.error('Error al obtener el Pago:', error.response ? error.response.data : error.message);
        setLoading(false); // Termina la carga incluso si hay error
      }
    };
    fetchPago();
  }, [id]);

  // Funciones manejadoras de eventos
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
    if (pago.metodoPago === 'Tarjeta de crédito') {
      // Lógica para verificar la tarjeta de crédito
      // Por ahora, simplemente mostramos un mensaje
      alert('Verificando tarjeta de crédito...');
    } else if (pago.metodoPago === 'Transferencia') {
      // Lógica para transferencia
      alert('Cuando verifiquemos la transferencia se activará el pedido para retirar o por envío.');
    } else {
      // Lógica para efectivo
      alert('Pedido activado para retirar o por envío.');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }
  
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          {pago ? (
            <div>
              <h2>Detalles del Pago</h2>
              <p>ID del Pago: {pago.id}</p>
              <p>Fecha: {pago.fecha}</p>
              <p>Importe Total: ${pago.importeTotal}</p>
              <Form>
                <Form.Group controlId="metodoPago">
                  <Form.Label>Método de Pago</Form.Label>
                  <Form.Control
                    as="select"
                    value={pago.metodoPago}
                    onChange={(e) => handleMetodoPagoChange(e.target.value)}
                  >
                    <option value="">Selecciona un método de pago</option>
                    <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="Efectivo">Efectivo</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="metodoEnvio">
                  <Form.Label>Método de Envío</Form.Label>
                  <Form.Control
                    as="select"
                    value={pago.metodoEnvio}
                    onChange={(e) => handleMetodoEnvioChange(e.target.value)}
                    disabled={pago.metodoPago === 'Efectivo'}
                  >
                    <option value="">Selecciona un método de envío</option>
                    <option value="Envío flex">Envío flex</option>
                    <option value="Envío normal de 3 a 5 días">Envío normal de 3 a 5 días</option>
                    <option value="Retiro en sucursal">Retiro en sucursal</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="informacionContacto">
                  <Form.Label>Información de Contacto</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Introduce tu email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </Form.Group>
                <Form.Group controlId="notasCliente">
                  <Form.Label>Notas del Cliente</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={pago.notasCliente}
                    onChange={(e) => handleNotasClienteChange(e.target.value)}
                  />
                </Form.Group>
              </Form>
              <Button 
                onClick={handleRealizarCompra} 
                disabled={!pago.metodoPago || !pago.metodoEnvio || !email}
              >
                Realizar Compra
              </Button>
            </div>
          ) : (
            <Alert variant="danger">Error al cargar los detalles del pago.</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PagoScreen;