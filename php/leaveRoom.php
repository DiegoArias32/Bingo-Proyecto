<?php
session_start();
header('Content-Type: application/json');

try {
    $connection = new PDO('mysql:host=localhost;dbname=bingo_db', 'root', 'tyago2006');
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $user_id = $_SESSION['user_id'] ?? null;
    $room_id = $_POST['room_id'] ?? null;

    if ($user_id && $room_id) {
        // Eliminar al jugador de la sala
        $stmt = $connection->prepare("DELETE FROM players WHERE room_id = ? AND player_name = (SELECT username FROM users WHERE id = ?)");
        $stmt->execute([$room_id, $user_id]);

        echo json_encode(['status' => 'success', 'message' => 'Has salido de la sala exitosamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'ID de sala o usuario no válidos']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
