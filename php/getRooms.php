<?php
session_start();
header('Content-Type: application/json');

try {
    $connection = new PDO('mysql:host=localhost;dbname=bingo_db', 'root', 'tyago2006');
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $connection->query("SELECT room_id, room_name, room_code, players_number, price_per_card FROM rooms WHERE room_visibility = 'public'");
    $rooms = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['rooms' => $rooms]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    exit;
}
?>
