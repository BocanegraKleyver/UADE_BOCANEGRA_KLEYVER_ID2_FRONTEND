import React, { useContext, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { FacturaContext } from '../contexts/FacturaContext';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FacturaPDF from '../components/FacturaPDF';

const FacturaScreen = () => {
  const { facturas, obtenerTodasLasFacturas, loading } = useContext(FacturaContext);

  useEffect(() => {
    obtenerTodasLasFacturas();
  }, [obtenerTodasLasFacturas]);

  return (
    <Container>
      <h2>Facturas</h2>
      <p>Tienes {facturas.length} factura(s).</p>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {facturas.map((factura) => (
            <li key={factura.id}>
              ID: {factura.id} - Importe Total: ${factura.importeTotal} - Fecha: {factura.fechaFactura}  - Pago ID: {factura.pagoId}
              <PDFDownloadLink
                document={<FacturaPDF factura={factura} />} // Pasamos la factura completa al componente FacturaPDF
                fileName={`factura_${factura.id}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Cargando...' : <Button variant="primary">Descargar PDF</Button>
                }
              </PDFDownloadLink>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default FacturaScreen;
