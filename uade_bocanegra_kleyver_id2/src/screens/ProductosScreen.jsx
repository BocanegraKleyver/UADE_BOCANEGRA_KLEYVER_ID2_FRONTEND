import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { CarritoContext } from '../screens/CarritoContext';
import { UsuarioContext } from '../screens/UsuarioContext'; // Importa el contexto del usuario

const ProductosScreen = () => {
  const [productos, setProductos] = useState([]);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState({});
  const { agregarAlCarrito, carrito } = useContext(CarritoContext);
  const { usuarioId } = useContext(UsuarioContext); // Obtiene el usuarioId del contexto

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/producto");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error.response ? error.response.data : error.message);
    }
  };

  const incrementarCantidad = (id) => {
    setCantidadSeleccionada((prevState) => ({
      ...prevState,
      [id]: (prevState[id] || 0) + 1,
    }));
  };

  const decrementarCantidad = (id) => {
    setCantidadSeleccionada((prevState) => ({
      ...prevState,
      [id]: prevState[id] > 0 ? prevState[id] - 1 : 0,
    }));
  };

  const handleAgregarAlCarrito = (producto) => {
    const cantidad = cantidadSeleccionada[producto.id] || 1;
    // Verificar si el usuario está autenticado y tiene un usuarioId disponible
    if (usuarioId) {
      agregarAlCarrito(producto.id, cantidad, usuarioId);
    } else {
      console.error("Usuario no autenticado o usuarioId no disponible");
      // Manejar el caso de que el usuario no esté autenticado
    }
  };

  return (
    <Container>
      <h2 className="mt-5 mb-4">Nuestros Productos</h2>
      <Row>
        {productos.map((producto) => (
          <Col md={4} key={producto.id} className="mb-3">
            <Card>
              <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Card.Text>Precio: ${producto.precio}, Cantidad: {producto.cantidad}</Card.Text>
                <div className="d-flex align-items-center mb-2">
                  <Button variant="secondary" onClick={() => decrementarCantidad(producto.id)}>
                    -
                  </Button>
                  <span className="mx-2">{cantidadSeleccionada[producto.id] || 0}</span>
                  <Button variant="secondary" onClick={() => incrementarCantidad(producto.id)}>
                    +
                  </Button>
                </div>
                <Button onClick={() => handleAgregarAlCarrito(producto)} variant="primary">
                  Agregar al carrito
                </Button>
                <Link to={`/producto/${producto.id}`} className="btn btn-secondary ml-2">
                  Ver Producto
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductosScreen;
