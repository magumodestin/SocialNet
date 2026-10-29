<?php
session_start();
require 'db.php';

$email = $_SESSION['reset_email'] ?? null;
$password = $_POST['password'] ?? '';
$confirm = $_POST['confirm_password'] ?? '';

if (!$email || empty($password) || $password !== $confirm) {
    echo "<p style='color:red;'>Passwords do not match or session expired.</p>";
    exit;
}

// Hash and update
$hashed = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare("UPDATE users SET password = ?, reset_token = NULL WHERE email = ?");
$stmt->execute([$hashed, $email]);

// Clear session
unset($_SESSION['reset_email']);
unset($_SESSION['code_verified']);

echo "<p class='success-message' style='text-align:center;'>Password successfully changed</p>";
echo "<p style='text-align:center;'><a href='index.php'>Back to Login</a></p>";
?>
