import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap"; // Importa los componentes de Bootstrap

const HomeScreen = () => {
  return (
    <Container>
      <div className="text-center mt-5">
      <h1>¡Descubre la comodidad perfecta con KleyStore!</h1>
      <p>Explora nuestra amplia selección de sillas diseñadas para ti</p>
        <Link to="/productos" className="btn btn-primary mt-3">
          Explorar Sillas
        </Link>
      </div>

      {/* Sección de Destacados */}
      <div className="mt-5">
        <h2 className="mb-4">Productos Destacados</h2>
        {/* Aquí puedes agregar productos destacados */}
        <div className="row">
          {/* Ejemplo de producto destacado */}
          <div className="col-md-4 mb-3">
            <div className="card">
              <img
                src="https://via.placeholder.com/300"
                className="card-img-top"
                alt="Producto Destacado"
              />
              <div className="card-body">
                <h5 className="card-title">Silla Gamer X</h5>
                <p className="card-text">$9999</p>
                <Link to="/producto/1" className="btn btn-primary">
                  Ver Producto
                </Link>
              </div>
            </div>
          </div>
          {/* Puedes agregar más productos destacados aquí */}
        </div>
      </div>
    </Container>
  );
};

export default HomeScreen;
