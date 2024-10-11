<?php
  // Iniciar sesión
  session_start();

  // Verificar si la sesión está iniciada
  if (isset($_SESSION['user_id'])) {
    // Destruir la sesión
    session_destroy();
    // Redirigir a la página de inicio de sesión
    header('Location: Login.html');
    exit;
  } else {
    echo 'No ha iniciado sesión';
    exit;
  }
?>