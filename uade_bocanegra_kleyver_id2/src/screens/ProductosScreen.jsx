import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap"; // Importa los componentes de Bootstrap
import sillaComedor1 from "../assets/img/SillaComedor/Silla_Comedor_1.jpg"; // Importa la imagen de la silla de comedor 1
import sillaComedor2 from "../assets/img/SillaComedor/Silla_Comedor_2.jpg"; // Importa la imagen de la silla de comedor 2
import sillaComedor3 from "../assets/img/SillaComedor/Silla_Comedor_3.jpg"; // Importa la imagen de la silla de comedor 3
import sillaComedor4 from "../assets/img/SillaComedor/Silla_Comedor_4.jpg"; // Importa la imagen de la silla de comedor 4
import sillaComedor5 from "../assets/img/SillaComedor/Silla_Comedor_5.jpg"; // Importa la imagen de la silla de comedor 5
import sillaGamer1 from "../assets/img/SillaGamer/Silla_Gamer_1.jpg"; // Importa la imagen de la silla gamer 1
import sillaGamer2 from "../assets/img/SillaGamer/Silla_Gamer_2.jpg"; // Importa la imagen de la silla gamer 2
import sillaGamer3 from "../assets/img/SillaGamer/Silla_Gamer_3.jpg"; // Importa la imagen de la silla gamer 3
import sillaGamer4 from "../assets/img/SillaGamer/Silla_Gamer_4.jpg"; // Importa la imagen de la silla gamer 4
import sillaGamer5 from "../assets/img/SillaGamer/Silla_Gamer_5.jpg"; // Importa la imagen de la silla gamer 5
import sillaJardin1 from "../assets/img/SillaJardin/Silla_Jardin_1.jpg"; // Importa la imagen de la silla de jardín 1
import sillaJardin2 from "../assets/img/SillaJardin/Silla_Jardin_2.jpg"; // Importa la imagen de la silla de jardín 2
import sillaJardin3 from "../assets/img/SillaJardin/Silla_Jardin_3.jpg"; // Importa la imagen de la silla de jardín 3
import sillaJardin4 from "../assets/img/SillaJardin/Silla_Jardin_4.jpg"; // Importa la imagen de la silla de jardín 4
import sillaJardin5 from "../assets/img/SillaJardin/Silla_Jardin_5.jpg"; // Importa la imagen de la silla de jardín 5

const ProductosScreen = () => {
  return (
    <Container>
      <h2 className="mt-5 mb-4">Nuestros Productos</h2>
      <Row>
        {/* Sillas de Comedor */}
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={sillaComedor1} alt="Silla de Comedor 1" />
            <Card.Body>
              <Card.Title>Silla de Comedor Elegante</Card.Title>
              <Card.Text>$4999</Card.Text>
              <Link to="/producto/1" className="btn btn-primary">
                Ver Producto
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={sillaComedor2} alt="Silla de Comedor 2" />
            <Card.Body>
              <Card.Title>Silla de Comedor Moderna</Card.Title>
              <Card.Text>$3999</Card.Text>
              <Link to="/producto/2" className="btn btn-primary">
                Ver Producto
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={sillaComedor3} alt="Silla de Comedor 3" />
            <Card.Body>
              <Card.Title>Silla de Comedor Clásica</Card.Title>
              <Card.Text>$4499</Card.Text>
              <Link to="/producto/3" className="btn btn-primary">
                Ver Producto
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={sillaComedor4} alt="Silla de Comedor 4" />
            <Card.Body>
              <Card.Title>Silla de Comedor Vintage</Card.Title>
              <Card.Text>$5599</Card.Text>
              <Link to="/producto/4" className="btn btn-primary">
                Ver Producto
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={sillaComedor5} alt="Silla de Comedor 5" />
            <Card.Body>
              <Card.Title>Silla de Comedor Moderna</Card.Title>
              <Card.Text>$4999</Card.Text>
              <Link to="/producto/5" className="btn btn-primary">
                Ver Producto
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Sillas Gamer */}
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={sillaGamer1} alt="Silla Gamer 1" />
            <Card.Body>
              <Card.Title>Silla Gamer Ergonómica</Card.Title>
              <Card.Text>$6999</Card.Text>
              <Link to="/producto/6" className="btn btn-primary">
                Ver Producto
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={sillaGamer2} alt="Silla Gamer 2" />
            <Card.Body>
              <Card.Title>Silla Gamer Pro</Card.Title>
              <Card.Text>$7999</Card.Text>
              <Link to="/producto/7" className="btn btn-primary">
                Ver Producto
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={sillaGamer3} alt="Silla Gamer 3" />
            <Card.Body>
              <Card.Title>Silla Gamer Retro</Card.Title>
              <Card.Text>$6499</Card.Text>
              <Link to="/producto/8" className="btn btn-primary">
                Ver Producto
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={sillaGamer4} alt="Silla Gamer 4" />
            <Card.Body>
              <Card.Title>Silla Gamer Profesional</Card.Title>
              <Card.Text>$8999</Card.Text>
              <Link to="/producto/9" className="btn btn-primary">
                Ver Producto
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={sillaGamer5} alt="Silla Gamer 5" />
            <Card.Body>
              <Card.Title>Silla Gamer de Lujo</Card.Title>
              <Card.Text>$9999</Card.Text>
              <Link to="/producto/10" className="btn btn-primary">
                Ver Producto
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Sillas de Jardín */}
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={sillaJardin1} alt="Silla de Jardín 1" />
            <Card.Body>
              <Card.Title>Silla de Jardín Plegable</Card.Title>
              <Card.Text>$3499</Card.Text>
              <Link to="/producto/11" className="btn btn-primary">
                Ver Producto
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={sillaJardin2} alt="Silla de Jardín 2" />
            <Card.Body>
              <Card.Title>Silla de Jardín Moderna</Card.Title>
              <Card.Text>$3999</Card.Text>
              <Link to="/producto/12" className="btn btn-primary">
                Ver Producto
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
          <Card.Img variant="top" src={sillaJardin3} alt="Silla de Jardín 3" />
            <Card.Body>
              <Card.Title>Silla de Jardín Vintage</Card.Title>
              <Card.Text>$4499</Card.Text>
              <Link to="/producto/13" className="btn btn-primary">
                Ver Producto
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={sillaJardin4} alt="Silla de Jardín 4" />
            <Card.Body>
              <Card.Title>Silla de Jardín Rústica</Card.Title>
              <Card.Text>$3999</Card.Text>
              <Link to="/producto/14" className="btn btn-primary">
                Ver Producto
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src={sillaJardin5} alt="Silla de Jardín 5" />
            <Card.Body>
              <Card.Title>Silla de Jardín Cómoda</Card.Title>
              <Card.Text>$4999</Card.Text>
              <Link to="/producto/15" className="btn btn-primary">
                Ver Producto
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductosScreen;
