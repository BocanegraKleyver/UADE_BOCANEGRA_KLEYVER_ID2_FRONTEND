import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap'; // Agregado Alert
import axios from 'axios';
import { CarritoContext } from '../contexts/CarritoContext';
import { Link } from 'react-router-dom'; // Importamos Link desde react-router-dom
import { PedidoContext } from '../contexts/PedidoContext'; // Importamos PedidoContext
import { CarritoProductoContext } from '../contexts/CarritoProductoContext'; // Importamos CarritoProductoContext


const CarritoScreen = () => {
  const { carrito } = useContext(CarritoContext);
  const { crearPedido } = useContext(PedidoContext); // Importamos crearPedido
  const { carritoProducto } = useContext(CarritoProductoContext); 
  const [carritoProductos, setCarritoProductos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [tempCantidad, setTempCantidad] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerProductosEnCarrito = async () => {
      try {
        if (carrito && carrito.id) {
          console.log('Obteniendo productos en el carrito para el carritoId:', carrito.id);
          const response = await axios.get(`http://localhost:8080/api/carritoProducto/carrito/${carrito.id}`);
          console.log('Respuesta del servidor:', response.data);
          setCarritoProductos(response.data);
        }
      } catch (error) {
        console.error('Error al obtener productos en el carrito:', error.response ? error.response.data : error.message);
      }
    };

    obtenerProductosEnCarrito();
  }, [carrito]); // Se ejecutará cada vez que cambie el carrito


  const handleEliminarDelCarrito = async (carritoProductoId) => {
    try {
      if (carrito && carrito.id) {
        await axios.delete(`http://localhost:8080/api/carritoProducto/delete/${carritoProductoId}`);
        setCarritoProductos(carritoProductos.filter((producto) => producto.id !== carritoProductoId));
      }
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error.response ? error.response.data : error.message);
    }
  };

  const handleModificarCantidad = (productoId, nuevaCantidad) => {
    setTempCantidad((prevCantidad) => ({
      ...prevCantidad,
      [productoId]: nuevaCantidad,
    }));
  };

  const handleEdit = (productoId) => {
    setEditando(productoId);
    const producto = carritoProductos.find((prod) => prod.id === productoId);
    setTempCantidad({ [productoId]: producto.cantidad });
  };

  
  const handleConfirmar = async (productoId) => {
    try {
      const nuevaCantidad = tempCantidad[productoId];
      const producto = carritoProductos.find((prod) => prod.id === productoId);

      // Validar la cantidad con el stock disponible
      if (nuevaCantidad > producto.stock) {
        setError(`No hay suficiente stock para el producto. Stock disponible: ${producto.stock}`);
        return;
      }

      const response = await axios.put(`http://localhost:8080/api/carritoProducto/${productoId}`, {
        cantidad: nuevaCantidad,
      });
      const productoActualizado = response.data;

      setCarritoProductos(carritoProductos.map((prod) =>
        prod.id === productoId ? { ...prod, cantidad: productoActualizado.cantidad, precioCarritoDelProducto: productoActualizado.precioCarritoDelProducto } : prod
      ));
      setEditando(null);
      setError(''); // Limpiar cualquier error previo
    } catch (error) {
      console.error('Error al confirmar la cantidad del producto en el carrito:', error.response ? error.response.data : error.message);
    }
  }; 

  const handleCancelar = (productoId) => {
    setEditando(null);
    setTempCantidad((prev) => {
      const newTempCantidad = { ...prev };
      delete newTempCantidad[productoId];
      return newTempCantidad;
    });
  };


  const handleRealizarPedido = async () => {
    try {
      if (!carrito || !carrito.id) {
        setError('No se puede realizar el pedido: carrito no encontrado.');
        return;
      }

      const nuevoPedido = await crearPedido(carrito.id);
      // Redirigir a la página de pedido
      window.location.href = `/pedido/${nuevoPedido.id}`;
    } catch (error) {
      console.error('Error al realizar el pedido:', error.response ? error.response.data : error.message);
    }
  };

//   return (
//     <Container>
//       <h1>Carrito</h1>
//       {error && <Alert variant="danger">{error}</Alert>}
//       {carritoProductos.length > 0 ? (
//         <div>
//           <p>Estos son los productos en tu carrito:</p>
//           <Row>
//             {carritoProductos.map((carritoProducto) => (
//               <Col md={4} key={carritoProducto.id} className="mb-3">
//                 <div className="card">
//                   {carritoProducto.producto && <img src={carritoProducto.producto} className="card-img-top" alt="Producto" />}
//                   <div className="card-body">
//                     <h5 className="card-title">Producto</h5>
//                     <p className="card-text">Cantidad: {carritoProducto.cantidad}</p>
//                     <p className="card-text">Precio: ${carritoProducto.precioCarritoDelProducto}</p>
//                     <p className="card-text">Stock: {carritoProducto.stock}</p>
//                     <Button variant="danger" onClick={() => handleEliminarDelCarrito(carritoProducto.id)}>Eliminar</Button>
//                     {editando === carritoProducto.id ? (
//                       <div className="mt-2">
//                         <Button variant="secondary" onClick={() => handleModificarCantidad(carritoProducto.id, tempCantidad[carritoProducto.id] - 1)} disabled={tempCantidad[carritoProducto.id] <= 1}>-</Button>
//                         <span className="mx-2">{tempCantidad[carritoProducto.id]}</span>
//                         <Button variant="secondary" onClick={() => handleModificarCantidad(carritoProducto.id, tempCantidad[carritoProducto.id] + 1)}>+</Button>
//                         <Button variant="success" className="ml-2" onClick={() => handleConfirmar(carritoProducto.id)}>Confirmar</Button>
//                         <Button variant="warning" className="ml-2" onClick={() => handleCancelar(carritoProducto.id)}>Cancelar</Button>
//                       </div>
//                     ) : (
//                       <Button variant="primary" onClick={() => handleEdit(carritoProducto.id)}>Modificar</Button>
//                     )}
//                   </div>
//                 </div>
//               </Col>
//             ))}
//           </Row>
//           {/* Utilizamos Link para redirigir a la pantalla de realizar pedido */}
//           <Link to="/realizar-pedido">
//           <Button variant="primary" onClick={handleRealizarPedido}>Realizar Pedido</Button>
//           </Link>
//         </div>
//       ) : (
//         <p>No hay productos en tu carrito.</p>
//       )}
//     </Container>
//   );
// };

// export default CarritoScreen;
return (
  <Container>
    <h1>Carrito</h1>
    {error && <Alert variant="danger">{error}</Alert>}
    {carritoProductos.length > 0 ? (
      <div>
        <p>Estos son los productos en tu carrito:</p>
        <Row>
          {carritoProductos.map((carritoProducto) => (
            <Col md={4} key={carritoProducto.id} className="mb-3">
              <div className="card">
                {carritoProducto.producto && carritoProducto.producto.imagen && (
                  <img src={carritoProducto.producto.imagen} className="card-img-top" alt={carritoProducto.producto.nombre} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{carritoProducto.producto && carritoProducto.producto.imagen}</h5>
                  <p className="card-text">Cantidad: {carritoProducto.cantidad}</p>
                  <p className="card-text">Precio: ${carritoProducto.precioCarritoDelProducto}</p>
                  {carritoProducto.producto && (
                    <p className="card-text">Stock: {carritoProducto.producto.stock}</p>
                  )}
                  <Button variant="danger" onClick={() => handleEliminarDelCarrito(carritoProducto.id)}>Eliminar</Button>
                  {editando === carritoProducto.id ? (
                    <div className="mt-2">
                      <Button variant="secondary" onClick={() => handleModificarCantidad(carritoProducto.id, tempCantidad[carritoProducto.id] - 1)} disabled={tempCantidad[carritoProducto.id] <= 1}>-</Button>
                      <span className="mx-2">{tempCantidad[carritoProducto.id]}</span>
                      <Button variant="secondary" onClick={() => handleModificarCantidad(carritoProducto.id, tempCantidad[carritoProducto.id] + 1)}>+</Button>
                      <Button variant="success" className="ml-2" onClick={() => handleConfirmar(carritoProducto.id)}>Confirmar</Button>
                      <Button variant="warning" className="ml-2" onClick={() => handleCancelar(carritoProducto.id)}>Cancelar</Button>
                    </div>
                  ) : (
                    <Button variant="primary" onClick={() => handleEdit(carritoProducto.id)}>Modificar</Button>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className="mt-3">
          <Link to="/home">
            <Button variant="secondary">Volver a Principal</Button>
          </Link>
          <Link to="/realizar-pedido">
            <Button variant="primary" onClick={handleRealizarPedido}>Realizar Pedido</Button>
          </Link>
        </div>
      </div>
    ) : (
      <p>No hay productos en tu carrito.</p>
    )}
  </Container>
);
};

export default CarritoScreen;