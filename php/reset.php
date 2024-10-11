<?php
require __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$connection = new PDO('mysql:host=localhost;dbname=bingo_db', 'root', 'tyago2006');

$message = ""; // Variable para almacenar el mensaje

if (isset($_GET['token'])) {
    $token = $_GET['token'];

    $query = $connection->prepare('SELECT * FROM users WHERE reset_token = :token AND token_expiration > NOW()');
    $query->bindParam(':token', $token);
    $query->execute();

    if ($query->rowCount() > 0) {
        $user = $query->fetch();
    } else {
        $message = "El token es inválido o ha expirado.";
    }
} else {
    $message = "Token no proporcionado.";
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $newPassword = $_POST['password'];

    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    $update = $connection->prepare('UPDATE users SET password = :password, reset_token = NULL, token_expiration = NULL WHERE id = :id');
    $update->bindParam(':password', $hashedPassword);
    $update->bindParam(':id', $user['id']);
    $update->execute();

    $message = "La contraseña ha sido actualizada correctamente.";
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="../fontawesome/css/all.css">
    <link rel="stylesheet" href="../css/style 3.css">
    <title>Restablecer Contraseña</title>
</head>
<body>

    <div class="resolucion">
        <div class="desktop">
            <div class="container">
                <div class="row">
                    <div class="col-4 bingo"></div>
                    <div class="Cuadro-contrasena">
                        <div class="titulo">
                            <h1><strong>Restablecer Contraseña</strong></h1>
                        </div>
                        <div class="subTitulo">
              Introduce la nueva contraseña
            </div>
                        <form method="POST" id="formulario-restablecer">
                            <input type="password" id="password" name="password" placeholder="Nueva contraseña" required>
                            <button type="submit">Restablecer Contraseña</button>
                        </form>
                        <div id="error-message" style="color: <?php echo (strpos($message, 'correctamente') !== false) ? 'green' : 'red'; ?>; font-size: 20px;">
                            <?php echo $message; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="js/restablecerContra.js"></script>

</body>
</html>
