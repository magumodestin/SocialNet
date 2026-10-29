<?php
session_start();

// Check if user is verified and user ID is set
if (!isset($_SESSION['code_verified']) || !$_SESSION['code_verified'] || !isset($_SESSION['reset_user_id'])) {
    header('Location: fogortpassword.php');
    exit();
}

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
    $new_password = $_POST['new-password'];
    $confirm_password = $_POST['confirm-new-password'];
    $user_id = $_SESSION['reset_user_id'];
    
    // Validate passwords match
    if ($new_password !== $confirm_password) {
        $_SESSION['error'] = "Passwords do not match.";
        header('Location: newpassword.php');
        exit();
    }
    
    // Validate password strength
    if (strlen($new_password) < 8) {
        $_SESSION['error'] = "Password must be at least 8 characters long.";
        header('Location: newpassword.php');
        exit();
    }
    if (!preg_match('/[A-Z]/', $new_password)) {
        $_SESSION['error'] = "Password must contain at least one capital letter.";
        header('Location: newpassword.php');
        exit();
    }
    if (!preg_match('/[0-9]/', $new_password)) {
        $_SESSION['error'] = "Password must contain at least one number.";
        header('Location: newpassword.php');
        exit();
    }
    if (!preg_match('/[^A-Za-z0-9]/', $new_password)) {
        $_SESSION['error'] = "Password must contain at least one symbol.";
        header('Location: newpassword.php');
        exit();
    }
    
    // Hash the new password
    $password_hash = password_hash($new_password, PASSWORD_DEFAULT);
    
    // Update password in database
    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
    $stmt->bind_param('si', $password_hash, $user_id);
    
    if ($stmt->execute()) {
        // Password updated successfully
        $stmt->close();
        
        // Clear reset session variables
        unset($_SESSION['reset_user_id'], $_SESSION['reset_email'], $_SESSION['verification_code'], 
              $_SESSION['code_expiry'], $_SESSION['code_verified'], $_SESSION['demo_code']);
        
        $_SESSION['success'] = "Password updated successfully! You can now login with your new password.";
        header('Location: index.php');
        exit();
    } else {
        $_SESSION['error'] = "Error updating password. Please try again.";
        header('Location: newpassword.php');
        exit();
    }
}

$conn->close();
?>