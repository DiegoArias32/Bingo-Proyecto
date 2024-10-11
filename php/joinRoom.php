<?php
session_start();
header('Content-Type: application/json');

try {
    $connection = new PDO('mysql:host=localhost;dbname=bingo_db', 'root', 'tyago2006');
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $room_id = $_POST['room_id'] ?? null;
    $user_id = $_SESSION['user_id'] ?? null;

    if ($room_id && $user_id) {
        // Obtener el nombre de usuario del jugador
        $stmt = $connection->prepare("SELECT username FROM users WHERE id = ?");
        $stmt->execute([$user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            $player_name = $user['username'];
            $cards_bought = 0; // Inicializar número de cartones comprados

            // Insertar jugador en la tabla players
            $stmt = $connection->prepare("INSERT INTO players (player_name, room_id, cards_bought, joined_at) VALUES (?, ?, ?, NOW())");
            $stmt->execute([$player_name, $room_id, $cards_bought]);

            echo json_encode(['status' => 'success', 'message' => 'Te has unido a la sala exitosamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al obtener el nombre del jugador']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'ID de sala o usuario no válidos']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
