import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { CarritoContext } from '../contexts/CarritoContext';
import { UsuarioContext } from '../contexts/UsuarioContext';
import { CarritoProductoContext } from '../contexts/CarritoProductoContext';

const ProductosScreen = () => {
  const [productos, setProductos] = useState([]);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState({});
  const { carritoId } = useContext(CarritoContext); // Obtener carritoId del contexto del carrito
  const { usuarioId } = useContext(UsuarioContext);
  const { agregarProductoAlCarrito } = useContext(CarritoProductoContext);
  const navigate = useNavigate(); // Reemplaza useHistory por useNavigate

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

  // const handleAgregarAlCarrito = async (producto) => {
  //   const cantidad = cantidadSeleccionada[producto.id] || 1;
  //   try {
  //     if (usuarioId) {
  //       // Agregar al carrito
  //       const productoRequest = {
  //         productoId: producto.id,
  //         cantidad: cantidad
  //       };
  
  //       const response = await axios.post(`http://localhost:8080/api/carritoProducto/${carritoId}/producto`, productoRequest, {
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       });
  
  //       if (response.status === 201) {
  //         // Si se agregó correctamente, mostrar un mensaje
  //         alert(`¡${cantidad} ${producto.nombre} agregado(s) al carrito!`);
  //       } else {
  //         console.error("Error al agregar producto al carrito:", response.data);
  //       }
  //     } else {
  //       console.error("Usuario no autenticado o usuarioId no disponible");
  //       // Redirigir al usuario a la página de inicio de sesión
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     console.error("Error al agregar producto al carrito:", error.response ? error.response.data : error.message);
  //   }
  // };
  
  const handleAgregarAlCarrito = async (producto) => {
    const cantidad = cantidadSeleccionada[producto.id] || 1;
    try {
      if (usuarioId) {
        const productoRequest = {
          productoId: producto.id,
          cantidad: cantidad
        };
  
        await agregarProductoAlCarrito(productoRequest); // Usar el método del contexto
  
        alert(`¡${cantidad} ${producto.nombre} agregado(s) al carrito!`);
      } else {
        console.error("Usuario no autenticado o usuarioId no disponible");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error.response ? error.response.data : error.message);
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
                <Card.Text>Precio: ${producto.precio}, Stock Disponible: {producto.cantidad}</Card.Text>
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
