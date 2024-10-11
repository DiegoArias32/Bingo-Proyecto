<?php
require __DIR__ . '/../vendor/autoload.php'; // Asegúrate de tener el autoload de Composer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

error_reporting(0);
ob_end_clean();

$connection = new PDO('mysql:host=localhost;dbname=bingo_db', 'root', 'tyago2006');

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? null; // Asegúrate de que haya un email

if ($email === null) {
  http_response_code(400);
  echo 'El correo electrónico es requerido.';
  exit;
}

// Verificar si el correo electrónico existe
$query = $connection->prepare('SELECT * FROM users WHERE email = :email');
$query->bindParam(':email', $email);
$query->execute();

if ($query->rowCount() > 0) {
  $user = $query->fetch();

  // Generar un token único y establecer la expiración
  $token = bin2hex(random_bytes(16));
  $expiration = date('Y-m-d H:i:s', strtotime('+1 hour'));

  // Actualizar la base de datos
  $update = $connection->prepare('UPDATE users SET reset_token = :token, token_expiration = :expiration WHERE email = :email');
  $update->bindParam(':token', $token);
  $update->bindParam(':expiration', $expiration);
  $update->bindParam(':email', $email);
  $update->execute();

  // Enviar el enlace de recuperación por correo electrónico usando PHPMailer
  $mail = new PHPMailer(true);
  try {
    // Configuración del servidor SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'ariasdiego570@gmail.com'; // Tu correo de Gmail
    $mail->Password = 'gvmg ncar ypgc pmxm'; // Tu contraseña de Gmail (o una contraseña de aplicación)
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Destinatarios
    $mail->setFrom('ariasdiego570@gmail.com', 'Bingo of the gods');
    $mail->addAddress($email);

    // Contenido del correo
    $mail->isHTML(true);
    $mail->Subject = 'Restablecimiento de clave';
    $mail->Body    = "Haz clic en el siguiente enlace para restablecer tu contraseña: <a href='http://localhost/Bingo1/php/reset.php?token=$token'>Restablecer Contraseña</a>";



    if ($mail->send()) {
        echo 'Correo electrónico enviado con éxito';
        exit;
      } else {
        echo 'No se pudo enviar el correo. Error: ' . $mail->ErrorInfo;
        exit;
      }
      } catch (Exception $e) {
        echo 'No se pudo enviar el correo. Error: ' . $e->getMessage();
        exit;
      }
      } else {
        echo 'Este correo electrónico no está registrado.';
        exit;
}
?>