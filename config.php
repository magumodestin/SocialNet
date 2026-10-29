<?php
// config.php
$host = 'localhost';
$dbname = 'destine_chat';
$username = 'root'; // Change to your MySQL username
$password = ''; // Change to your MySQL password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    // Log error but don't expose details to client
    error_log("Database connection failed: " . $e->getMessage());
    die(json_encode(['error' => 'Database connection failed']));
}
?>