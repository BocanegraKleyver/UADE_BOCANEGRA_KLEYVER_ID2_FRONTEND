import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FacturaContext } from "../contexts/FacturaContext"; // Asegúrate de que la ruta sea correcta

const FacturaScreen = () => {
  const { facturas, obtenerTodasLasFacturas } = useContext(FacturaContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerTodasLasFacturas();
    setLoading(false);
  }, [obtenerTodasLasFacturas]); // Agrega obtenerTodasLasFacturas como dependencia

  return (
    <div>
      <h1>Facturas</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {facturas.map((factura) => (
            <li key={factura.id}>{factura.nombre}</li> // Aquí muestra los datos de la factura según tu estructura
          ))}
        </ul>
      )}
    </div>
  );
};

export default FacturaScreen;
