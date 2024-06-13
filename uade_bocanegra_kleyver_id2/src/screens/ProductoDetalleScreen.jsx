import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { CarritoContext } from '../contexts/CarritoContext';
import { UsuarioContext } from '../contexts/UsuarioContext';
import { Link, useNavigate,useParams } from "react-router-dom";

const ProductoDetalleScreen = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState(null); // Nuevo estado para el mensaje
  const { agregarProductoAlCarrito } = useContext(CarritoContext);
  const { usuarioId } = useContext(UsuarioContext);

  useEffect(() => {
    obtenerProducto();
  }, [id]);

  const obtenerProducto = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/producto/${id}`);
      setProducto(response.data);
      setComentarios(response.data.comentarios || []);
    } catch (error) {
      console.error("Error al obtener el producto:", error.response ? error.response.data : error.message);
    }
  };

  const manejarComentario = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/producto/${id}/comentario`, {
        comentario: nuevoComentario,
      });
      setComentarios([...comentarios, response.data.comentario]);
      setNuevoComentario("");
    } catch (error) {
      console.error("Error al agregar comentario:", error.response ? error.response.data : error.message);
    }
  };

  const manejarAgregarAlCarrito = () => {
    if (usuarioId) {
      const productoRequest = {
        productoId: id,
        cantidad,
      };
      agregarProductoAlCarrito(productoRequest);
      setMensaje("Producto agregado al carrito correctamente"); // Actualiza el mensaje
    }
  };

  if (!producto) {
    return <Container><p>Cargando...</p></Container>;
  }

  return (
    <Container>
      {mensaje && <Alert variant="success">{mensaje}</Alert>} {/* Mostrar el mensaje si está presente */}
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
            <Card.Body>
              <Card.Title>{producto.nombre}</Card.Title>
              <Card.Text>{producto.descripcion}</Card.Text>
              <Card.Text>Precio: ${producto.precio}</Card.Text>
              <Card.Text>Cantidad disponible: {producto.cantidad}</Card.Text>
              <Form>
                <Form.Group controlId="cantidad">
                  <Form.Label>Cantidad:</Form.Label>
                  <Form.Control
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    min="1"
                    max={producto.cantidad}
                  />
                </Form.Group>
                <Button variant="primary" onClick={manejarAgregarAlCarrito}>
                  Agregar al carrito
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Link to="/productos" className="btn btn-secondary mt-3">
            Regresar a productos
          </Link>
        </Col>
        <Col md={6}>
          <h3>Comentarios</h3>
          {comentarios.length === 0 ? (
            <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
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
