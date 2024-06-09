import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CarritoContext } from '../screens/CarritoContext';
import { UsuarioContext } from '../screens/UsuarioContext';

const CarritoScreen = () => {
  const { carrito, obtenerCarrito, eliminarDelCarrito } = useContext(CarritoContext);
  const { usuarioId } = useContext(UsuarioContext);

  useEffect(() => {
    // Al cargar el componente, obtenemos el carrito del usuario si hay un usuario autenticado
    if (usuarioId) {
      obtenerCarrito(usuarioId);
    }
  }, [usuarioId, obtenerCarrito]);

  const handleEliminarDelCarrito = (productoId) => {
    eliminarDelCarrito(productoId, usuarioId); // Pasamos el usuarioId al eliminar del carrito
  };

  return (
    <Container>
      <h1>Carrito</h1>
      {carrito && carrito.carritoProducto && carrito.carritoProducto.length > 0 ? (
        <div>
          <p>Estos son los productos en tu carrito:</p>
          <Row>
            {carrito.carritoProducto.map((carritoProducto) => (
              <Col md={4} key={carritoProducto.id} className="mb-3">
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
        <p>{usuarioId ? 'No hay productos en tu carrito.' : 'Por favor inicia sesión para ver tu carrito.'}</p>
      )}
    </Container>
  );
};

export default CarritoScreen;
