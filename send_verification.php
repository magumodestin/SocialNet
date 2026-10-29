<?php
session_start();

$host = 'localhost';
$db   = 'usersdata';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

// Create connection
try {
    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    $conn->set_charset($charset);
} catch (Exception $e) {
    $_SESSION['error'] = "Database connection failed. Please try again.";
    header('Location: fogortpassword.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    
    // Check if email exists
    $stmt = $conn->prepare("SELECT id, name FROM users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows === 1) {
        $stmt->bind_result($user_id, $user_name);
        $stmt->fetch();
        
        // Generate 6-digit verification code
        $verification_code = sprintf("%06d", mt_rand(1, 999999));
        
        // Store verification code in session (for demo purposes)
        // In real application, you would send this via email
        $_SESSION['reset_user_id'] = $user_id;
        $_SESSION['reset_email'] = $email;
        $_SESSION['verification_code'] = $verification_code;
        $_SESSION['code_expiry'] = time() + 600; // 10 minutes expiry
        
        // For demo purposes, we'll show the code on screen
        // In production, you would send this via email
        $_SESSION['demo_code'] = $verification_code;
        
        $_SESSION['success'] = "Verification code sent to your email!";
        header('Location: verificationform.php');
        exit();
    } else {
        $_SESSION['error'] = "Email not found in our system.";
        header('Location: fogortpassword.php');
        exit();
    }
    
    $stmt->close();
}

$conn->close();
?>