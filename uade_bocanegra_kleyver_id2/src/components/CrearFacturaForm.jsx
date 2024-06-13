import React, { useState, useContext } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { FacturaContext } from '../contexts/FacturaContext';

const CrearFacturaForm = () => {
  const [datosFactura, setDatosFactura] = useState({
    usuarioId: '',
    pagoId: '',
    pedidoId: '',
    fechaFactura: '',
    importeTotal: 0,
    metodoPago: '',
    numeroTransaccion: '',
    metodoEnvio: '',
    informacionContacto: '',
    notasCliente: '',
    costoEnvio: 0,
    impuestos: 0,
    descuentos: 0,
    nombreUsuario: '',
    apellidoUsuario: '',
    direccionUsuario: '',
    documentoIdentidadUsuario: '',
    emailUsuario: '',
    numeroFactura: '',
    serieFactura: '',
    estadoFactura: '',
    nombreVendedor: '',
    direccionVendedor: '',
    identificacionFiscalVendedor: '',
    condicionesPago: '',
    notasAdicionales: '',
  });

  const { crearFactura } = useContext(FacturaContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDatosFactura({ ...datosFactura, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await crearFactura(datosFactura);
      alert('Factura creada exitosamente');
    } catch (error) {
      console.error('Error al crear la factura:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container>
      <h2>Crear Factura</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="nombreUsuario">
              <Form.Label>Nombre del Usuario</Form.Label>
              <Form.Control
                type="text"
                name="nombreUsuario"
                value={datosFactura.nombreUsuario}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="apellidoUsuario">
              <Form.Label>Apellido del Usuario</Form.Label>
              <Form.Control
                type="text"
                name="apellidoUsuario"
                value={datosFactura.apellidoUsuario}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="direccionUsuario">
              <Form.Label>Dirección del Usuario</Form.Label>
              <Form.Control
                type="text"
                name="direccionUsuario"
                value={datosFactura.direccionUsuario}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="documentoIdentidadUsuario">
              <Form.Label>Documento de Identidad del Usuario</Form.Label>
              <Form.Control
                type="text"
                name="documentoIdentidadUsuario"
                value={datosFactura.documentoIdentidadUsuario}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="emailUsuario">
              <Form.Label>Email del Usuario</Form.Label>
              <Form.Control
                type="email"
                name="emailUsuario"
                value={datosFactura.emailUsuario}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fechaFactura">
              <Form.Label>Fecha de la Factura</Form.Label>
              <Form.Control
                type="date"
                name="fechaFactura"
                value={datosFactura.fechaFactura}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        {/* Agrega los demás campos aquí */}
        <Button variant="primary" type="submit">
          Crear Factura
        </Button>
      </Form>
    </Container>
  );
};

export default CrearFacturaForm;