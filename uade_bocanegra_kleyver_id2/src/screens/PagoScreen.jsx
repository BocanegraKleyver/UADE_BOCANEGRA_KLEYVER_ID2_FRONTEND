import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Importa Link
import FacturaScreen from './FacturaScreen'; // Importa el componente FacturaScreen
import { PedidoContext } from '../contexts/PedidoContext';
import FacturaForm from '../components/FacturaForm'; // Importa el componente FacturaForm
import { generarNumeroAlfanumerico, generarNumero } from '../utils'; // Importa tus funciones de utilidad


const PagoScreen = () => {
  const { id } = useParams();
  const [pago, setPago] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Añadido el estado error
  const [datosTarjeta, setDatosTarjeta] = useState({
    tipo: '',
    numero: '',
    nombre: '',
    mes: '',
    año: '',
    cvc: '',
  });
  const [aliasTransferencia, setAliasTransferencia] = useState('');
  const [email, setEmail] = useState('');

////
useEffect(() => {
  const fetchPago = async () => {
    try {
      const pagoObtenido = await obtenerPagoPorId(id);
      setPago(pagoObtenido);
      setEmail(pagoObtenido.informacionContacto || "");
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener el Pago:', error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };
  fetchPago();
}, [id]);


  const obtenerPagoPorId = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/pago/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleRealizarCompra = async () => {
    try {
      if (!pago || !pago.id) {
        setError('No se puede realizar el pago: pago no encontrado.');
        return;
      }
  
      const nuevaFactura = {
        usuarioId: pago.usuarioId,
        pagoId: pago.id,
        pedidoId: pago.pedidoId,
        fechaFactura: new Date().toISOString(),
        importeTotal: pago.importeTotal,
        metodoPago: pago.metodoPago,
        numeroTransaccion: generarNumeroAlfanumerico(16),
        metodoEnvio: pago.metodoEnvio,
        informacionContacto: pago.informacionContacto,
        notasCliente: "", // Esto puede llenarse con cualquier nota relevante del cliente
        costoEnvio: 0,
        impuestos: 0,
        descuentos: 0,
        nombreUsuario: pago.nombreUsuario,
        apellidoUsuario: pago.apellidoUsuario,
        direccionUsuario: pago.direccionUsuario,
        documentoIdentidadUsuario: pago.documentoIdentidadUsuario,
        emailUsuario: pago.emailUsuario,
        numeroFactura: generarNumero(7), 
        serieFactura: generarNumero(4), 
        estadoFactura: "Completada",
        nombreVendedor: "KleyStore",
        direccionVendedor: "UADE - Lima 789",
        identificacionFiscalVendedor: "KleyStore 27/04", // Agrega la identificación fiscal del vendedor si es necesario
        condicionesPago: pago.metodoPago,
        notasAdicionales: "", // Agrega cualquier nota adicional relevante
      };
  
      const response = await axios.post('http://localhost:8080/api/factura', nuevaFactura);
      const nuevaFacturaId = response.data.id;
      window.location.href = `/factura/${nuevaFacturaId}`;
    } catch (error) {
      setError(error.response ? error.response.data : error.message); 
    }
  };

  // Eliminar factura
  const eliminarFactura = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/factura/delete/${id}`);
      console.log('Factura eliminada:', id);
    } catch (error) {
      console.error("Error al eliminar la factura:", error.response ? error.response.data : error.message);
    }
  };



// Función para generar un número alfanumérico de longitud dada
const generarNumeroAlfanumerico = (longitud) => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let resultado = '';
  for (let i = 0; i < longitud; i++) {
    resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return resultado;
};

const generarNumero = (longitud) => {
  let resultado = '';
  for (let i = 0; i < longitud; i++) {
    resultado += Math.floor(Math.random() * 10).toString();
  }
  return resultado;
};

  // Manejador para cancelar la compra
  const handleCancelarCompra = async () => {
    if (pago) {
      // Eliminar factura asociada al pago
      await eliminarFactura(pago.id);

      // Implementa cualquier otra lógica necesaria al cancelar la compra
      alert('Compra cancelada.');
    }
  };


  // Actualizar método de pago
  const actualizarMetodoPago = async (id, nuevoMetodoPago) => {
    try {
      // Realizar la actualización en la base de datos
      await axios.put(`http://localhost:8080/api/pago/${id}/metodo-pago`, { metodoPago: nuevoMetodoPago });
      
      // Actualizar el estado localmente
      setPago({ ...pago, metodoPago: nuevoMetodoPago });

      // Si se elige efectivo, reiniciar los campos de tarjeta
      if (nuevoMetodoPago === 'Efectivo') {
        setDatosTarjeta({ tipo: '', numero: '', nombre: '', mes: '', año: '', cvc: '' });
      }
    } catch (error) {
      console.error('Error al actualizar el método de pago:', error.response ? error.response.data : error.message);
    }
  };

  // Actualizar método de envío
  const actualizarMetodoEnvio = async (id, nuevoMetodoEnvio) => {
    try {
      await axios.put(`http://localhost:8080/api/pago/${id}/metodo-envio`, { metodoEnvio: nuevoMetodoEnvio });
      setPago({ ...pago, metodoEnvio: nuevoMetodoEnvio });
    } catch (error) {
      console.error('Error al actualizar el método de envío:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const fetchPago = async () => {
      try {
        const pagoObtenido = await obtenerPagoPorId(id);
        setPago(pagoObtenido);
        setEmail(pagoObtenido.informacionContacto || "");
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el Pago:', error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };
    fetchPago();
  }, [id]);

  const handleMetodoPagoChange = (nuevoMetodoPago) => {
    if (pago) {
      if (nuevoMetodoPago === 'Efectivo') {
        // Reiniciar valores de los campos al elegir efectivo
        setDatosTarjeta({ tipo: '', numero: '', nombre: '', mes: '', año: '', cvc: '' });
        setAliasTransferencia('');
        // Actualizar automáticamente el método de envío cuando se elige efectivo
        actualizarMetodoEnvio(pago.id, 'Retiro en sucursal');
      }
      actualizarMetodoPago(pago.id, nuevoMetodoPago);
    }
  };



        
  const handleMetodoEnvioChange = (nuevoMetodoEnvio) => {
    if (pago) {
      actualizarMetodoEnvio(pago.id, nuevoMetodoEnvio);
    }
  };



  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

 const handleNotasClienteChange = () => {};
  
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

              <Form.Group controlId="metodoEnvio">
  <Form.Label>Método de Envío</Form.Label>
  <Form.Control
    as="select"
    value={pago.metodoEnvio}
    onChange={(e) => handleMetodoEnvioChange(e.target.value)}
    disabled={pago.metodoPago === 'Efectivo'}
  >
    <option value="">Selecciona un método de envío</option>
    <option value="Envío flex" disabled={pago.metodoPago === 'Efectivo'}>Envío flex</option>
    <option value="Envío normal de 3 a 5 días" disabled={pago.metodoPago === 'Efectivo'}>Envío normal de 3 a 5 días</option>
    <option value="Retiro en sucursal">Retiro en sucursal</option>
  </Form.Control>
</Form.Group>


              <Form.Group controlId="metodoPago">
  <Form.Label>Método de Pago</Form.Label>
  <Form.Control
    as="select"
    value={pago.metodoPago}
    onChange={(e) => handleMetodoPagoChange(e.target.value)}
  >
    <option value="">Selecciona un método de pago</option>
    <option value="Tarjeta de crédito">Tarjeta de crédito</option>
    <option value="Efectivo">Efectivo</option>
    <option value="Transferencia">Transferencia</option>
  </Form.Control>
</Form.Group>
{pago.metodoPago === 'Transferencia' && (
  <p>Nuestro alias es: <strong>KleyStore.Transferencias</strong>. Cuando realice la compra, por favor deje en comentarios el ID del pago para agilizar el trámite.</p>
)}
{pago.metodoPago === 'Tarjeta de crédito' && (
  <>
    <Form.Group controlId="numeroTarjeta">
      <Form.Label>Número de Tarjeta</Form.Label>
      <Form.Control
        type="text"
        placeholder="Ingrese los 16 números de la tarjeta"
        value={datosTarjeta.numero}
        onChange={(e) => setDatosTarjeta({ ...datosTarjeta, numero: e.target.value })}
      />
    </Form.Group>

    <Form.Group controlId="nombreTarjeta">
      <Form.Label>Nombre y Apellido en la Tarjeta</Form.Label>
      <Form.Control
        type="text"
        placeholder="Nombre y Apellido"
        value={datosTarjeta.nombre}
        onChange={(e) => setDatosTarjeta({ ...datosTarjeta, nombre: e.target.value })}
      />
    </Form.Group>
    
    <Form.Group controlId="mesVencimiento">
      <Form.Label>Mes de Vencimiento</Form.Label>
      <Form.Control
        type="text"
        placeholder="MM"
        value={datosTarjeta.mes}
        onChange={(e) => setDatosTarjeta({ ...datosTarjeta, mes: e.target.value })}
      />
    </Form.Group>
    
    <Form.Group controlId="anioVencimiento">
      <Form.Label>Año de Vencimiento</Form.Label>
      <Form.Control
        type="text"
        placeholder="AAAA"
        value={datosTarjeta.año}
        onChange={(e) => setDatosTarjeta({ ...datosTarjeta, año: e.target.value })}
      />
    </Form.Group>

    <Form.Group controlId="cvcTarjeta">
      <Form.Label>CVC</Form.Label>
      <Form.Control
        type="password"
        placeholder="CVC"
        value={datosTarjeta.cvc}
        onChange={(e) => setDatosTarjeta({ ...datosTarjeta, cvc: e.target.value })}
      />
    </Form.Group>
  </>
)}




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
  <Form.Label>Comentarios</Form.Label>
  <Form.Control
    as="textarea"
    rows={3} // Define la cantidad de filas para el textarea
    placeholder="Ingrese aquí cualquier comentario adicional..."
    onChange={handleNotasClienteChange}
  />
</Form.Group>
                <Button variant="primary" onClick={handleRealizarCompra}>Realizar Compra</Button>{' '}
          

                <Link to="/home">
                  <Button variant="danger" onClick={handleCancelarCompra}>
                    Cancelar Compra
                  </Button>
                </Link>

              </Form>
            </div>
          ) : (
            <Alert variant="danger">Error al cargar los detalles del pago.</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PagoScreen; // Asegúrate de tener esta línea para exportar PagoScreen