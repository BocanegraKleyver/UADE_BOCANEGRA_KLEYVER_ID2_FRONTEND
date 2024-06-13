import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  item: {
    marginBottom: 5,
  },
});

const FacturaPDF = ({ factura }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Detalle de Factura</Text>
          <View style={styles.section}>
            <Text style={styles.subtitle}>Datos de la Factura:</Text>
            <Text style={styles.item}>Número de Factura: {factura.numeroFactura}</Text>
            <Text style={styles.item}>Fecha: {new Date(factura.fechaFactura).toLocaleString()}</Text>
            <Text style={styles.item}>Importe Total: ${factura.importeTotal}</Text>
            <Text style={styles.item}>Método de Pago: {factura.metodoPago}</Text>
            <Text style={styles.item}>Número de Transacción: {factura.numeroTransaccion}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subtitle}>Datos del Vendedor:</Text>
            <Text style={styles.item}>Nombre: {factura.nombreVendedor}</Text>
            <Text style={styles.item}>Dirección: {factura.direccionVendedor}</Text>
            <Text style={styles.item}>Identificación Fiscal: {factura.identificacionFiscalVendedor}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default FacturaPDF;
