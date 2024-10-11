<?php
session_start();
require_once 'db.php';

// Verificar si el usuario está conectado
if (isset($_SESSION['user_id'])) {
  $user_id = $_SESSION['user_id'];

  // Consultar el nombre del usuario
  $query = "SELECT username FROM users WHERE id = '$user_id'";
  $result = $conn->query($query);

  // Mostrar el nombre del usuario
  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $username = $row['username'];
    echo $username;
  } else {
    echo "Error al obtener el nombre del usuario";
  }
} else {
  echo "Debes iniciar sesión para ver tu nombre";
}
?>