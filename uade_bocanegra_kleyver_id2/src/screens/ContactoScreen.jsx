import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ContactoScreen = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el formulario a tu correo
    // Puedes implementar la lógica para enviar el correo con los datos del formulario
    console.log('Formulario enviado:', formData);
    // Lógica para enviar el formulario a tu correo
    Swal.fire({
      icon: 'success',
      title: 'Mensaje enviado',
      text: 'Tu mensaje ha sido enviado correctamente. ¡Nos pondremos en contacto contigo pronto!'
    });
    // Limpiar el formulario después de enviar
    setFormData({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: ''
    });
  };

  return (
    <div>
      <h1>¿Quieres comunicarte con KleyStore?</h1>
      <p>Por favor, llena el siguiente formulario y te responderemos a la brevedad. ¡Muchas gracias!</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Correo Electrónico:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="asunto">
          <Form.Label>Asunto:</Form.Label>
          <Form.Control
            type="text"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="mensaje">
          <Form.Label>Mensaje:</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar Mensaje
        </Button>
      </Form>
    </div>
  );
};

export default ContactoScreen;
