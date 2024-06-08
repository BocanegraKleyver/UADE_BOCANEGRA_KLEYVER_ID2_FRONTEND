import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const ProductoDetalleScreen = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [comentarios, setComentarios] = useState([]);  // Inicializar como un arreglo vacío
  const [nuevoComentario, setNuevoComentario] = useState("");

  useEffect(() => {
    obtenerProducto();
  }, [id]);

  const obtenerProducto = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/producto/${id}`);
      setProducto(response.data);
      setComentarios(response.data.comentarios || []);  // Asegúrate de que comentarios sea un arreglo
    } catch (error) {
      console.error("Error al obtener el producto:", error.response ? error.response.data : error.message);
    }
  };

  const manejarComentario = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/producto/${id}/comentario`, {
        comentario: nuevoComentario,
      });
      setComentarios([...comentarios, response.data]);
      setNuevoComentario("");
    } catch (error) {
      console.error("Error al agregar comentario:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
            <Card.Body>
              <Card.Title>{producto.nombre}</Card.Title>
              <Card.Text>{producto.descripcion}</Card.Text>
              <Card.Text>Precio: ${producto.precio}</Card.Text>
              <Card.Text>Cantidad: {producto.cantidad}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <h3>Comentarios</h3>
          {comentarios.length === 0 ? (
            <p>No hay comentarios aún. Sé el primero en comentar!</p>
          ) : (
            <ul>
              {comentarios.map((comentario, index) => (
                <li key={index}>{comentario}</li>
              ))}
            </ul>
          )}
          <Form onSubmit={manejarComentario}>
            <Form.Group controlId="nuevoComentario">
              <Form.Label>Dejar un comentario:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2">
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductoDetalleScreen;
