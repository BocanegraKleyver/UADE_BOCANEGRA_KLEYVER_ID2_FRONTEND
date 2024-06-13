import React, { useContext, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { FacturaContext } from "../contexts/FacturaContext";
import CrearFacturaForm from "../components/CrearFacturaForm"; // Cambia el import al nuevo componente

const FacturaScreen = () => {
  const { facturas, obtenerTodasLasFacturas, loading } = useContext(FacturaContext);

  useEffect(() => {
    // Llama a la función para obtener las facturas cuando el componente se monta
    obtenerTodasLasFacturas();
  }, []); // Asegúrate de pasar un arreglo vacío como segundo parámetro para que se ejecute solo una vez

  return (
    <Container>
      <h2>Facturas</h2>
      <p>Tienes {facturas.length} factura(s).</p>
      {/* Renderizamos el componente CrearFacturaForm */}
      <CrearFacturaForm /> {/* No es necesario pasar ninguna función aquí */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {facturas.map((factura) => (
            <li key={factura.id}>
              ID: {factura.id} - Importe Total: ${factura.importeTotal} - Fecha: {factura.fechaFactura}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default FacturaScreen;
