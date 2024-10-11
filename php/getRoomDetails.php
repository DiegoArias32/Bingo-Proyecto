<?php
session_start();
header('Content-Type: application/json');

try {
    $connection = new PDO('mysql:host=localhost;dbname=bingo_db', 'root', 'tyago2006');
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $room_id = $_GET['room_id'] ?? null;

    if ($room_id) {
        // Obtener detalles de la sala
        $stmt = $connection->prepare("SELECT room_name, room_code, room_host FROM rooms WHERE room_id = ?");
        $stmt->execute([$room_id]);
        $room = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($room) {
            // Obtener jugadores conectados
            $stmt = $connection->prepare("SELECT player_name FROM players WHERE room_id = ?");
            $stmt->execute([$room_id]);
            $connected_users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Retornar los datos en formato JSON
            echo json_encode(['status' => 'success', 'room' => $room, 'connected_users' => $connected_users]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Sala no encontrada']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'ID de sala no válido']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
