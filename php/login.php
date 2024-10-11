<?php
error_reporting(0);
ob_end_clean();

// Conectar a la base de datos
$connection = new PDO('mysql:host=localhost;dbname=bingo_db', 'root', 'tyago2006');

// Verificar si el formulario se ha enviado
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Obtener los datos del formulario
  $email = $_POST['username'];
  $password = $_POST['password'];

  // Verificar si el correo electrónico y contraseña son válidos
  $query = $connection->prepare('SELECT * FROM users WHERE email = :email');
  $query->bindParam(':email', $email);
  $query->execute();

  if ($query->rowCount() > 0) {
    $user = $query->fetch();
    if (password_verify($password, $user['password'])) {
      // Iniciar sesión
      session_start();
      $_SESSION['user_id'] = $user['id'];
      $_SESSION['email'] = $email;
      echo 'Inicio de sesión exitoso!';
      exit;
    } else {
      echo 'Correo electrónico o contraseña incorrectos';
      exit;
    }
  } else {
    echo 'Correo electrónico o contraseña incorrectos';
    exit;
  }
} else {
  echo 'No se ha enviado el formulario';
}
?>