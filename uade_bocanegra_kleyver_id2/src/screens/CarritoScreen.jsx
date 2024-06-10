import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CarritoContext } from '../screens/CarritoContext'; // Ajusta la ruta según tu estructura de carpetas
import { UsuarioContext } from '../screens/UsuarioContext'; // Ajusta la ruta según tu estructura de carpetas

const CarritoScreen = () => {
  const { carrito, obtenerCarrito, eliminarDelCarrito } = useContext(CarritoContext);
  const { usuarioId } = useContext(UsuarioContext); // Obtener el usuarioId del contexto

  useEffect(() => {
    if (usuarioId) {
      obtenerCarrito(usuarioId); // Al cargar el componente, obtenemos el carrito del usuario
    }
  }, [usuarioId]); // Agregar usuarioId como dependencia

  const handleEliminarDelCarrito = (productoId) => {
    if (usuarioId) {
      eliminarDelCarrito(usuarioId, productoId); // Solo necesitamos enviar el ID del producto y el usuarioId
    }
  };

  return (
    <Container>
      <h1>Carrito</h1>
      {carrito && carrito.carritoProducto && carrito.carritoProducto.length > 0 ? (
        <div>
          <p>Estos son los productos en tu carrito:</p>
          <Row>
            {carrito.carritoProducto.map((carritoProducto) => (
              <Col md={4} key={carritoProducto.producto.id} className="mb-3">
                <div className="card">
                  <img src={carritoProducto.producto.imagen} className="card-img-top" alt={carritoProducto.producto.nombre} />
                  <div className="card-body">
                    <h5 className="card-title">{carritoProducto.producto.nombre}</h5>
                    <p className="card-text">Cantidad: {carritoProducto.cantidad}</p>
                    <p className="card-text">Precio: ${carritoProducto.producto.precio}</p>
                    <Button variant="danger" onClick={() => handleEliminarDelCarrito(carritoProducto.producto.id)}>Eliminar</Button>
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
