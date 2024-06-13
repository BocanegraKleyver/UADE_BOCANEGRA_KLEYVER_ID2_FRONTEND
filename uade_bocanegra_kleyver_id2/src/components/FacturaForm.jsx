import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { generarNumeroAlfanumerico, generarNumero } from '../utils'; // Importa tus funciones de generación de números

const FacturaForm = ({ pago }) => {
  const [datosFactura, setDatosFactura] = useState({
    usuarioId: pago?.usuarioId || '',
    pagoId: pago?.id || '',
    pedidoId: pago?.pedidoId || '',
    fechaFactura: new Date().toISOString(),
    importeTotal: pago?.importeTotal || 0,
    metodoPago: pago?.metodoPago || '',
    numeroTransaccion: generarNumeroAlfanumerico(16),
    metodoEnvio: pago?.metodoEnvio || '',
    informacionContacto: pago?.informacionContacto || '',
    notasCliente: '',
    costoEnvio: 0,
    impuestos: 0,
    descuentos: 0,
    nombreUsuario: pago?.nombreUsuario || '',
    apellidoUsuario: pago?.apellidoUsuario || '',
    direccionUsuario: pago?.direccionUsuario || '',
    documentoIdentidadUsuario: pago?.documentoIdentidadUsuario || '',
    emailUsuario: pago?.emailUsuario || '',
    numeroFactura: generarNumero(7),
    serieFactura: generarNumero(4),
    estadoFactura: 'Completada',
    nombreVendedor: 'KleyStore',
    direccionVendedor: 'UADE - Lima 789',
    identificacionFiscalVendedor: 'KleyStore 27/04',
    condicionesPago: pago?.metodoPago || '',
    notasAdicionales: '',
  });

  // Función para manejar cambios en el formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDatosFactura({ ...datosFactura, [name]: value });
  };

  // Función para enviar el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Aquí puedes enviar los datos al backend o realizar alguna acción con ellos
      console.log('Datos de la factura:', datosFactura);
      // Luego puedes redirigir al usuario a la página de facturas o mostrar un mensaje de éxito
      alert('Factura creada exitosamente');
    } catch (error) {
      console.error('Error al crear la factura:', error);
    }
  };

  return (
    <div>
      <h2>Crear Factura</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nombreUsuario">
          <Form.Label>Nombre del Cliente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre del cliente"
            name="nombreUsuario"
            value={datosFactura.nombreUsuario}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="apellidoUsuario">
          <Form.Label>Apellido del Cliente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el apellido del cliente"
            name="apellidoUsuario"
            value={datosFactura.apellidoUsuario}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="direccionUsuario">
          <Form.Label>Dirección del Cliente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la dirección del cliente"
            name="direccionUsuario"
            value={datosFactura.direccionUsuario}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="documentoIdentidadUsuario">
          <Form.Label>Documento de Identidad del Cliente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el documento de identidad del cliente"
            name="documentoIdentidadUsuario"
            value={datosFactura.documentoIdentidadUsuario}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="emailUsuario">
          <Form.Label>Email del Cliente</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese el email del cliente"
            name="emailUsuario"
            value={datosFactura.emailUsuario}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* Agrega aquí otros campos del formulario según lo necesites */}

        <Button variant="primary" type="submit">
          Crear Factura
        </Button>
      </Form>
    </div>
  );
};

export default FacturaForm;