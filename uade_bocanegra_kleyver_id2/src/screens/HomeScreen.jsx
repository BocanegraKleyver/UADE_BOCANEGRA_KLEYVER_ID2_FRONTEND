import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import axios from "axios";
import { UsuarioContext } from '../contexts/UsuarioContext';
import { CarritoContext } from '../contexts/CarritoContext';

const HomeScreen = () => {
  const { usuarioId } = useContext(UsuarioContext);
  const { obtenerCarrito } = useContext(CarritoContext);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductosAleatorios();
  }, []);

  useEffect(() => {
    if (usuarioId) {
      obtenerCarrito(usuarioId); // Obtener el carrito del usuario
    } else {
      // Si no hay usuarioId (por ejemplo, después del registro), intenta obtenerlo del localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        obtenerCarrito(userData.id); // Obtener el carrito del usuario del localStorage
      }
    }
  }, [usuarioId]); // Actualizar el carrito cuando el usuarioId cambie

  const obtenerProductosAleatorios = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/producto");
      const productosAleatorios = response.data.sort(() => Math.random() - 0.5).slice(0, 3); // Obtener 3 productos aleatorios
      setProductos(productosAleatorios);
    } catch (error) {
      console.error("Error al obtener productos:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container>
      <Carousel>
        {/* Agregar imágenes promocionales */}
        <Carousel.Item>
  <img
    className="d-block w-100"
    style={{ maxWidth: "50%", margin: "auto" }}
    src="https://timelinecovers.pro/facebook-cover/download/anime-dragon-ball-z-shenron-facebook-cover.jpg"
    alt="First slide"
  />
</Carousel.Item>
<Carousel.Item>
  <img
    className="d-block w-100"
    style={{ maxWidth: "50%", margin: "auto" }}
    src="https://fontmeme.com/temporary/8b8f424ba330ed0bdf173e1d0379545f.png"
    alt="First slide"
  />
</Carousel.Item>
      </Carousel>

      <div className="text-center mt-5">
        <h1>¡Descubre la comodidad perfecta con KleyStore!</h1>
        <p>Explora nuestra amplia selección de sillas diseñadas para ti</p>
        <Link to="/productos" className="btn btn-primary mt-3">
          Explorar Sillas
        </Link>
      </div>

      <div className="mt-5">
        <h2 className="mb-4">Productos Destacados</h2>
        <Row>
          {productos.map((producto) => (
            <Col md={4} key={producto.id} className="mb-3"> {/* Cambiado a 'id' si es la propiedad correcta */}
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

      {/* Agregar más secciones, como categorías, testimonios, etc. */}

    </Container>
  );
};

export default HomeScreen;
