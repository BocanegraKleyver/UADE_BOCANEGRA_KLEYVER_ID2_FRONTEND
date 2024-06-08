// Importa useState y useEffect
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap"; 
import axios from "axios";

const ProductosScreen = () => {
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
      <h2 className="mt-5 mb-4">Nuestros Productos</h2>
      <Row>
        {productos.map((producto) => (
          <Col md={4} key={producto.id} className="mb-3">
            <Card>
              {/* Asegúrate de que el campo nombre, descripcion y precio existan en tu objeto producto */}
              <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Card.Text>Precio: ${producto.precio}, Cantidad: {producto.cantidad}</Card.Text>
                {/* Agregamos un enlace para ver más detalles del producto */}
                <Link to={`/producto/${producto.id}`} className="btn btn-primary">
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
