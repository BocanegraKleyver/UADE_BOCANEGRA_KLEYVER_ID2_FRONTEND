import React, { useContext, useState } from 'react';
import { ProductoContext } from '../contexts/ProductoContext';
import { Button, Form, Input, TextArea } from 'semantic-ui-react';
import { Link } from 'react-router-dom'; // Importamos Link para la navegación
import Swal from 'sweetalert2'; // Importamos SweetAlert para los mensajes

const CargarProducto = () => {
  const { saveProducto } = useContext(ProductoContext);
  const [errors, setErrors] = useState({});
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    precioAnterior: 0,
    cantidad: 0,
    imagen: '',
    video: '',
    comentarios: [],
    descuento: 0,
    fechaCarga: new Date(),
    fechaModificacion: new Date()
  });

  const handleChange = (e, { name, value }) => {
    setProducto({ ...producto, [name]: value });
  };

  const handleGuardarProducto = async () => {
    // Validaciones
    const errors = {};
    if (!producto.nombre.trim()) {
      errors.nombre = 'El nombre es requerido';
    } else if (producto.nombre.length > 30) {
      errors.nombre = 'El nombre no puede tener más de 30 caracteres';
    }

    if (producto.descripcion.length > 100) {
      errors.descripcion = 'La descripción no puede tener más de 100 caracteres';
    }

    if (isNaN(producto.precio) || parseFloat(producto.precio) <= 0) {
      errors.precio = 'El precio debe ser un número positivo y mayor a 0';
    }

    if (isNaN(producto.cantidad) || parseInt(producto.cantidad) <= 0) {
      errors.cantidad = 'La cantidad debe ser un número mayor a 0';
    }

    if (parseFloat(producto.descuento) < 0 || parseFloat(producto.descuento) > 99) {
      errors.descuento = 'El descuento debe ser entre 0 y 99';
    }

    if (producto.imagen.trim() && !validateUrl(producto.imagen)) {
      errors.imagen = 'La URL de la imagen no es válida';
    }

    setErrors(errors);

    // Si no hay errores, procedemos con la carga del producto
    if (Object.keys(errors).length === 0) {
      try {
        await saveProducto(producto);
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Producto cargado satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        });
        // Limpiar campos después de cargar el producto
        setProducto({
          nombre: '',
          descripcion: '',
          precio: 0,
          precioAnterior: 0,
          cantidad: 0,
          imagen: '',
          video: '',
          comentarios: [],
          descuento: 0,
          fechaCarga: new Date(),
          fechaModificacion: new Date()
        });
        // Redirigir a /productos después de cargar el producto
        window.location.href = '/productos'; // Otra opción: <Link to="/productos">
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      }
    }
  };

  const validateUrl = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cargar Producto</h2>
      <Form>
        <Form.Field>
          <label>Nombre</label>
          <Input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            placeholder="Nombre del producto"
            error={!!errors.nombre}
          />
          {errors.nombre && <div className="text-danger">{errors.nombre}</div>}
        </Form.Field>
        <Form.Field>
          <label>Descripción</label>
          <TextArea
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            placeholder="Descripción del producto"
            error={!!errors.descripcion}
          />
          {errors.descripcion && <div className="text-danger">{errors.descripcion}</div>}
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Precio</label>
            <Input
              type="number"
              name="precio"
              value={producto.precio}
              onChange={handleChange}
              placeholder="Precio del producto"
              error={!!errors.precio}
            />
            {errors.precio && <div className="text-danger">{errors.precio}</div>}
          </Form.Field>
          <Form.Field>
            <label>Cantidad</label>
            <Input
              type="number"
              name="cantidad"
              value={producto.cantidad}
              onChange={handleChange}
              placeholder="Cantidad disponible"
              error={!!errors.cantidad}
            />
            {errors.cantidad && <div className="text-danger">{errors.cantidad}</div>}
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>Imagen (opcional)</label>
          <Input
            type="text"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
            placeholder="URL de la imagen del producto"
            error={!!errors.imagen}
          />
          {errors.imagen && <div className="text-danger">{errors.imagen}</div>}
        </Form.Field>
        <Form.Field>
          <label>Video (opcional)</label>
          <Input
            type="text"
            name="video"
            value={producto.video}
            onChange={handleChange}
            placeholder="URL del video del producto"
          />
        </Form.Field>
        <Form.Field>
          <label>Descuento (opcional)</label>
          <Input
            type="number"
            name="descuento"
            value={producto.descuento}
            onChange={handleChange}
            placeholder="Descuento (%)"
            error={!!errors.descuento}
          />
          {errors.descuento && <div className="text-danger">{errors.descuento}</div>}
        </Form.Field>
        <Button color="blue" onClick={handleGuardarProducto}>
          Cargar Producto
        </Button>
        <Link to="/home">
          <Button color="red">Cancelar</Button>
        </Link>
      </Form>
    </div>
  );
};

export default CargarProducto;
