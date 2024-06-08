import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CargarProductoScreen = () => {
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    comentario: '', // Cambiado de comentarios a comentario
    video: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    for (const key in producto) {
      if (producto[key] === '' && key !== 'video' && key !== 'comentario') {
        alert(`El campo ${key} es requerido`);
        return;
      }
    }

    // Validar la URL de la imagen
    if (!validateURL(producto.imagen)) {
      alert('La URL de la imagen no es válida');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/producto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      });

      if (!response.ok) {
        throw new Error('Error al cargar el producto');
      }

      // Limpiar el formulario después de enviar los datos
      setProducto({
        nombre: '',
        descripcion: '',
        precio: 0,
        imagen: '',
        comentario: '', // Cambiado de comentarios a comentario
        video: ''
      });

      Swal.fire({
        icon: 'success',
        title: '¡Producto cargado exitosamente!',
      });
    } catch (error) {
      console.error('Error:', error.message);
      alert('Hubo un error al cargar el producto');
    }
  };

  // Función para validar la URL de la imagen
  const validateURL = (url) => {
    // Regex para validar una URL
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cargar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre del producto:</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción:</label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="precio" className="form-label">Precio:</label>
            <input
              type="number"
              className="form-control"
              id="precio"
              name="precio"
              value={producto.precio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="video" className="form-label">URL del video (opcional):</label>
            <input
              type="text"
              className="form-control"
              id="video"
              name="video"
              value={producto.video}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="comentario" className="form-label">Comentario:</label>
          <textarea
            className="form-control"
            id="comentario"
            name="comentario"
            value={producto.comentario}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">URL de la imagen:</label>
          <input
            type="text"
            className="form-control"
            id="imagen"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Cargar Producto</button>
      </form>
    </div>
  );
};

export default CargarProductoScreen;
