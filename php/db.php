<?php
$servername = "localhost";
$username = "root";
$password = "tyago2006";
$dbname = "bingo_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>