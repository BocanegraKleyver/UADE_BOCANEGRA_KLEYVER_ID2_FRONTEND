import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";

const HomeScreen = () => {
  const [productos, setProductos] = useState([]);

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

  return (
    <Container>
      <div className="text-center mt-5">
        <h1>¡Descubre la comodidad perfecta con KleyStore!</h1>
        <p>Explora nuestra amplia selección de sillas diseñadas para ti</p>
        <Link to="/productos" className="btn btn-primary mt-3">
          Explorar Sillas
        </Link>
      </div>

      {/* Sección de Destacados */}
      <div className="mt-5">
        <h2 className="mb-4">Productos Destacados</h2>
        {/* Mostrar productos desde la base de datos */}
        <Row>
          {productos.map((producto) => (
            <Col md={4} key={producto.id} className="mb-3">
              <Card>
                <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>{producto.descripcion}</Card.Text>
                  <Card.Text>Precio: ${producto.precio}</Card.Text>
                  <Link to={`/producto/${producto.id}`} className="btn btn-primary">
                    Ver Producto
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default HomeScreen;
