// import React, { useContext, useState } from 'react';
// import { ProductoContext } from '../contexts/ProductoContext';

// const PagoScreen = () => {
//   const { productos, saveProducto } = useContext(ProductoContext);
//   const [nombre, setNombre] = useState('');
//   const [precio, setPrecio] = useState(0);
//   const [descuento, setDescuento] = useState(0);

//   const handleGuardarProducto = async () => {
//     try {
//       // Aquí puedes validar los campos antes de enviar la solicitud
//       const nuevoProducto = {
//         nombre: nombre,
//         precio: precio,
//         descuento: descuento
//       };

//       await saveProducto(nuevoProducto);
//       // Si llegamos aquí, el producto se ha guardado correctamente
//       // Puedes mostrar un mensaje de éxito o redirigir a otra pantalla
//       console.log('Producto guardado correctamente:', nuevoProducto);
//     } catch (error) {
//       // Manejo de errores si falla la carga del producto
//       console.error('Error al guardar el producto:', error.message);
//       // Puedes mostrar un mensaje de error al usuario
//     }
//   };

//   return (
//     <div>
//       <h2>Carga de Productos</h2>
//       <form>
//         <div>
//           <label>Nombre:</label>
//           <input
//             type="text"
//             value={nombre}
//             onChange={(e) => setNombre(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Precio:</label>
//           <input
//             type="number"
//             value={precio}
//             onChange={(e) => setPrecio(Number(e.target.value))}
//           />
//         </div>
//         <div>
//           <label>Descuento:</label>
//           <input
//             type="number"
//             value={descuento}
//             onChange={(e) => setDescuento(Number(e.target.value))}
//           />
//         </div>
//         <button type="button" onClick={handleGuardarProducto}>
//           Guardar Producto
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PagoScreen;


import React, { useContext, useState } from 'react';
import { ProductoContext } from '../contexts/ProductoContext';

const CargarProducto = () => {
  const { saveProducto } = useContext(ProductoContext);
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    precioAnterior: 0,
    cantidad: 0,
    imagen: '',
    video: '',
    comentarios: [],
    descuento: 0,
    fechaCarga: new Date(),
    fechaModificacion: new Date()
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleGuardarProducto = async () => {
    try {
      await saveProducto(producto);
      // Producto guardado correctamente
      console.log('Producto guardado correctamente:', producto);
    } catch (error) {
      // Manejo de errores si falla la carga del producto
      console.error('Error al guardar el producto:', error.message);
    }
  };

  return (
    <div>
      <h2>Cargar Producto</h2>
      <form>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            value={producto.cantidad}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="text"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Video:</label>
          <input
            type="text"
            name="video"
            value={producto.video}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Comentarios:</label>
          <input
            type="text"
            name="video"
            value={producto.video}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Descuento:</label>
          <input
            type="number"
            name="descuento"
            value={producto.descuento}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleGuardarProducto}>
          Cargar Producto
        </button>
      </form>
    </div>
  );
};

export default CargarProducto;
