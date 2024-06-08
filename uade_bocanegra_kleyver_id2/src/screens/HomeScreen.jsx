// HomeScreen.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const HomeScreen = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar el almacenamiento local
    localStorage.removeItem('user');
    // Mostrar mensaje de despedida
    Swal.fire({
      icon: 'info',
      title: '¡Hasta luego!',
      text: 'Gracias por estar con nosotros. ¡Te esperamos pronto!',
    }).then(() => {
      // Redirigir a la página de inicio de sesión
      navigate('/');
    });
  };

  return (
    <div>
      <h2>Bienvenido al HomeScreen</h2>
      {/* Botón de Cerrar Sesión */}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default HomeScreen;
