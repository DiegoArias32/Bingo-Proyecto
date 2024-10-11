<?php
session_start();
header('Content-Type: application/json');

try {
    $connection = new PDO('mysql:host=localhost;dbname=bingo_db', 'root', 'tyago2006');
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener datos del formulario
    $room_name = $_POST['room_name'] ?? null;
    $players_number = $_POST['players_number'] ?? null;
    $price_per_card = $_POST['price_per_card'] ?? null;
    $room_visibility = $_POST['room_visibility'] ?? null;
    $room_host_id = $_SESSION['user_id'] ?? null;

    if ($room_name && $players_number && $price_per_card && $room_visibility && $room_host_id) {
        $stmt = $connection->prepare("SELECT username FROM users WHERE id = ?");
        $stmt->execute([$room_host_id]);
        $host_result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($host_result) {
            $room_host = $host_result['username'];

            // Generar código de sala
            $room_code = strtoupper(substr(md5(uniqid()), 0, 10));

            // Inserción de la sala
            $stmt = $connection->prepare("INSERT INTO rooms (room_name, room_code, room_host, players_number, price_per_card, room_visibility, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())");
            $stmt->execute([$room_name, $room_code, $room_host, $players_number, $price_per_card, $room_visibility]);

            // Obtener el ID de la sala creada
            $room_id = $connection->lastInsertId();

            echo json_encode(['status' => 'success', 'message' => 'Sala creada exitosamente', 'room_id' => $room_id]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al obtener el nombre del anfitrión']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión a la base de datos']);
}
?>
