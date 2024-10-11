<?php
session_start();
require_once 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $new_username = $_POST['new_username'];

    if (strlen($new_username) > 10) {
        echo "Error: El nombre de usuario no puede tener más de 10 caracteres.";
        exit;
    }

    // Actualizar el nombre del usuario en la base de datos
    $query = "UPDATE users SET username = '$new_username' WHERE id = '".$_SESSION['user_id']."'";
    $conn->query($query);

    header('Location: /Bingo1/inicio.html');
    exit;
}
?>