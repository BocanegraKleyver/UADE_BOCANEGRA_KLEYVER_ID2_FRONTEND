import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { CarritoContext } from '../contexts/CarritoContext';
import { UsuarioContext } from '../contexts/UsuarioContext';
import { CarritoProductoContext } from '../contexts/CarritoProductoContext';

const ProductosScreen = () => {
  const [productos, setProductos] = useState([]);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState({});
  const [busqueda, setBusqueda] = useState("");
  const { carritoId } = useContext(CarritoContext);
  const { usuario } = useContext(UsuarioContext);
  const { agregarProductoAlCarrito } = useContext(CarritoProductoContext);
  const navigate = useNavigate();

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

  const handleAgregarAlCarrito = async (producto) => {
    const cantidad = cantidadSeleccionada[producto.id] || 1;
    try {
      if (usuario && (usuario.usuario.role === 'admin' || usuario.usuario.role === 'user')) {
        const productoRequest = {
          productoId: producto.id,
          cantidad: cantidad
        };
  
        await agregarProductoAlCarrito(productoRequest);
  
        alert(`¡${cantidad} ${producto.nombre} agregado(s) al carrito!`);
      } else {
        console.error("Usuario no autenticado o no autorizado para agregar productos al carrito");
        navigate("/login"); // Redirigir al usuario a la página de inicio de sesión si no está autenticado
      }
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error.response ? error.response.data : error.message);
    }
  }

  const filtrarProductos = (producto) => {
    return (
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    );
  };

  const volverAPantallaPrincipal = () => {
    navigate("/home"); // Redirigir al usuario a la pantalla principal
  };

  const deleteProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/producto/${id}`);
      setProductos(prevProductos => prevProductos.filter((producto) => producto.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error.response ? error.response.data : error.message);
      throw new Error("Hubo un error al eliminar el producto.");
    }
  };

  return (
    <Container>
      {/* <h2 className="mt-5 mb-4">Nuestros Productos</h2> */}
      <Row className="justify-content-between mb-3">
        <Col md={8}>
          <h2 className="mt-5 mb-4">Nuestros Productos</h2>
        </Col>
        <Col md={4} className="text-md-right">
          <Button onClick={volverAPantallaPrincipal} variant="secondary">Volver a pantalla principal</Button>
        </Col>
      </Row>

      <Form.Group controlId="formBusqueda">
        <Form.Control
          type="text"
          placeholder="Buscar productos"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </Form.Group>
      <Row>
        {productos.filter(filtrarProductos).map((producto) => (
          <Col md={4} key={producto.id} className="mb-3">
            <Card>
              <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Card.Text>Precio: ${producto.precio}</Card.Text>
                {producto.descuento && <Card.Text>Descuento: {producto.descuento}%</Card.Text>}
                <Card.Text>Stock Disponible: {producto.cantidad}</Card.Text>
                <div className="d-flex align-items-center mb-2">
                  <Button variant="secondary" onClick={() => decrementarCantidad(producto.id)} disabled={cantidadSeleccionada[producto.id] <= 0}>
                    -
                  </Button>
                  <span className="mx-2">{cantidadSeleccionada[producto.id] || 0}</span>
                  <Button variant="secondary" onClick={() => incrementarCantidad(producto.id)} disabled={cantidadSeleccionada[producto.id] >= producto.cantidad}>
                    +
                  </Button>
                </div>
                <Button onClick={() => handleAgregarAlCarrito(producto)} variant="primary" disabled={cantidadSeleccionada[producto.id] <= 0 || cantidadSeleccionada[producto.id] > producto.cantidad}>
                  Agregar al carrito
                </Button>
              {usuario && usuario.usuario.role === 'admin' && (
                <Button variant="danger" className="ml-2" onClick={() => deleteProducto(producto.id)}>Eliminar</Button>
              )}
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