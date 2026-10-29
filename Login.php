<?php
session_start();
include "config.php";

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    if (empty($username) || empty($password)) {
        $errors[] = "All fields are required";
    } else {
        $stmt = $conn->prepare("SELECT * FROM users WHERE username=?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                $_SESSION['username'] = $user['username'];
                header("Location: welcome.php");
                exit();
            } else {
                $errors[] = "Invalid password";
            }
        } else {
            $errors[] = "No account found with that username";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <style>
        body {font-family: Arial, sans-serif; background: #f8f9fa; display: flex; justify-content: center; align-items: center; height: 100vh;}
        .form-container {background: #fff; border: 2px solid #1a2b5b; border-radius: 8px; width: 400px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);}
        .form-header {background: #1a2b5b; color: white; text-align: center; padding: 15px; font-size: 22px; font-weight: bold;}
        .error-box {background: #f8d7da; color: #842029; border: 1px solid #f5c2c7; padding: 10px; margin: 10px; border-radius: 4px; font-size: 14px;}
        form {padding: 20px;}
        label {display: block; margin: 8px 0 5px; font-weight: bold;}
        input {width: 100%; padding: 8px; margin-bottom: 12px; border: 1px solid #ccc; border-radius: 4px;}
        .btn {width: 100%; background: #1a2b5b; color: white; border: none; padding: 10px; border-radius: 4px; font-size: 16px; cursor: pointer;}
        .btn:hover {background: #2c3e70;}
        .signin {text-align: center; margin: 15px; font-size: 14px;}
        .signin a {color: #1a2b5b; text-decoration: none;}
    </style>
</head>
<body>
    <div class="form-container">
        <div class="form-header">Login</div>

        <?php if (!empty($errors)): ?>
            <div class="error-box">
                <?php foreach ($errors as $error): ?>
                    <div><?php echo $error; ?></div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <form method="POST">
            <label>Username</label>
            <input type="text" name="username">

            <label>Password</label>
            <input type="password" name="password">

            <button type="submit" class="btn">Login</button>
        </form>

        <div class="signin">
            New here? <a href="register.php">Register</a>
        </div>
    </div>
</body>
</html>
