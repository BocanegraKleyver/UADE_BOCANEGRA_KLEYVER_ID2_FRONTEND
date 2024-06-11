import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { CarritoContext } from '../contexts/CarritoContext'; // Ajusta la ruta según tu estructura de carpetas

const CarritoScreen = () => {
  const { carrito } = useContext(CarritoContext); // Obtener el carrito del contexto
  const [carritoProductos, setCarritoProductos] = useState([]);
  const [editando, setEditando] = useState(null); // Estado para rastrear el producto que está siendo editado
  const [tempCantidad, setTempCantidad] = useState({}); // Estado temporal para almacenar la cantidad editada

  useEffect(() => {
    const obtenerProductosEnCarrito = async () => {
      try {
        if (carrito && carrito.id) {
          console.log('Obteniendo productos en el carrito para el carritoId:', carrito.id);
          const response = await axios.get(`http://localhost:8080/api/carritoProducto/carrito/${carrito.id}`);
          console.log('Respuesta del servidor:', response.data);
          setCarritoProductos(response.data);
        }
      } catch (error) {
        console.error('Error al obtener productos en el carrito:', error.response ? error.response.data : error.message);
      }
    };

    obtenerProductosEnCarrito();
  }, [carrito]); // Se ejecutará cada vez que cambie el carrito


  const handleEliminarDelCarrito = async (carritoProductoId) => {
    try {
      if (carrito && carrito.id) {
        await axios.delete(`http://localhost:8080/api/carritoProducto/delete/${carritoProductoId}`);
        setCarritoProductos(carritoProductos.filter((producto) => producto.id !== carritoProductoId));
      }
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error.response ? error.response.data : error.message);
    }
  };

  const handleModificarCantidad = (productoId, nuevaCantidad) => {
    setTempCantidad((prevCantidad) => ({
      ...prevCantidad,
      [productoId]: nuevaCantidad,
    }));
  };

  const handleEdit = (productoId) => {
    setEditando(productoId);
    const producto = carritoProductos.find((prod) => prod.id === productoId);
    setTempCantidad({ [productoId]: producto.cantidad });
  };


  const handleConfirmar = async (productoId) => {
    try {
      const nuevaCantidad = tempCantidad[productoId];
      await axios.put(`http://localhost:8080/api/carritoProducto/${productoId}`, {
        cantidad: nuevaCantidad,
      });
      setCarritoProductos(carritoProductos.map((prod) =>
        prod.id === productoId ? { ...prod, cantidad: nuevaCantidad } : prod
      ));
      setEditando(null);
    } catch (error) {
      console.error('Error al confirmar la cantidad del producto en el carrito:', error.response ? error.response.data : error.message);
    }
  };


  const handleCancelar = (productoId) => {
    setEditando(null);
    setTempCantidad((prev) => {
      const newTempCantidad = { ...prev };
      delete newTempCantidad[productoId];
      return newTempCantidad;
    });
  };

  return (
    <Container>
      <h1>Carrito</h1>
      {carritoProductos.length > 0 ? (
        <div>
          <p>Estos son los productos en tu carrito:</p>
          <Row>
            {carritoProductos.map((carritoProducto) => (
              <Col md={4} key={carritoProducto.id} className="mb-3">
                <div className="card">
                  {carritoProducto.producto && <img src={carritoProducto.producto} className="card-img-top" alt="Producto" />}
                  <div className="card-body">
                    <h5 className="card-title">Producto</h5>
                    <p className="card-text">Cantidad: {carritoProducto.cantidad}</p>
                    <p className="card-text">Precio: ${carritoProducto.precioCarritoDelProducto}</p>
                    <Button variant="danger" onClick={() => handleEliminarDelCarrito(carritoProducto.id)}>Eliminar</Button>
                    {editando === carritoProducto.id ? (
                      <div className="mt-2">
                        <Button variant="secondary" onClick={() => handleModificarCantidad(carritoProducto.id, tempCantidad[carritoProducto.id] - 1)} disabled={tempCantidad[carritoProducto.id] <= 1}>-</Button>
                        <span className="mx-2">{tempCantidad[carritoProducto.id]}</span>
                        <Button variant="secondary" onClick={() => handleModificarCantidad(carritoProducto.id, tempCantidad[carritoProducto.id] + 1)}>+</Button>
                        <Button variant="success" className="ml-2" onClick={() => handleConfirmar(carritoProducto.id)}>Confirmar</Button>
                        <Button variant="warning" className="ml-2" onClick={() => handleCancelar(carritoProducto.id)}>Cancelar</Button>
                      </div>
                    ) : (
                      <Button variant="primary" onClick={() => handleEdit(carritoProducto.id)}>Modificar</Button>
                    )}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <p>No hay productos en tu carrito.</p>
      )}
    </Container>
  );
};

export default CarritoScreen;
