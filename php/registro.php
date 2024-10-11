<?php
error_reporting(0);
ob_end_clean();

// Conectar a la base de datos
$connection = new PDO('mysql:host=localhost;dbname=bingo_db', 'root', 'tyago2006');

// Verificar si el formulario se ha enviado
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Obtener los datos del formulario
  $username = $_POST['username'];
  $email = $_POST['email'];
  $password = $_POST['password'];

  // Verificar si el correo electrónico ya está registrado
  $query = $connection->prepare('SELECT * FROM users WHERE email = :email');
  $query->bindParam(':email', $email);
  $query->execute();

  if ($query->rowCount() > 0) {
    echo 'El correo electrónico ya está registrado';
    exit;
  }

  // Registrar el usuario
  $query = $connection->prepare('INSERT INTO users (username, email, password) VALUES (:username, :email, :password)');
  $query->bindParam(':username', $username);
  $query->bindParam(':email', $email);
  $query->bindParam(':password', password_hash($password, PASSWORD_DEFAULT));
  $query->execute();

  if ($query->rowCount() > 0) {
    echo 'Registro exitoso!';
    exit;
  } else {
    echo 'Error al registrar el usuario';
    exit;
  }
} else {
  echo 'No se ha enviado el formulario';
}
?>