// HomeScreen.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const HomeScreen = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Elimina el usuario del localStorage

    // Mostrar un mensaje de despedida
    Swal.fire({
      icon: 'success',
      title: '¡Hasta luego!',
      text: 'Has cerrado sesión exitosamente.',
      onClose: () => {
        // Redirecciona al login después de cerrar el mensaje
        navigate('/'); // Redirige a la página de inicio
      }
    });
  };

  return (
    <div>
      <h2>Bienvenido</h2>
      <p>¡Gracias por registrarte!</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default HomeScreen;
