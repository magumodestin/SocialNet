<?php
session_start();
include "config.php";  // $conn must be defined here

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect inputs safely
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $confirm_password = trim($_POST['confirm_password'] ?? '');

    // === Validation ===
    if (empty($username)) {
        $errors[] = "Username is required";
    }
    if (empty($email)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    if (empty($password)) {
        $errors[] = "Password is required";
    }
    if ($password !== $confirm_password) {
        $errors[] = "Passwords do not match";
    }

    // === Stop here if validation fails ===
    if (count($errors) === 0) {
        // Check existing username or email
        $stmt = $conn->prepare("SELECT username, email FROM users WHERE username = ? OR email = ?");
        if (!$stmt) {
            die("Prepare failed: " . $conn->error);
        }
        $stmt->bind_param("ss", $username, $email);
        $stmt->execute();
        $result = $stmt->get_result();

        while ($row = $result->fetch_assoc()) {
            if ($row['username'] === $username) {
                $errors[] = "Username already exists";
            }
            if ($row['email'] === $email) {
                $errors[] = "Email already exists";
            }
        }
        $stmt->close();
    }

    // === Insert if no errors ===
    if (count($errors) === 0) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        if (!$stmt) {
            die("Prepare failed: " . $conn->error);
        }
        $stmt->bind_param("sss", $username, $email, $hashedPassword);
        $stmt->execute();

        if ($stmt->affected_rows === 1) {
            $_SESSION['username'] = $username;
            header("Location: welcome.php");
            exit();
        } else {
            $errors[] = "Failed to register user, please try again.";
        }
        $stmt->close();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Register</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f8f9fa;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .form-container {
            background: #fff;
            border: 2px solid #1a2b5b;
            border-radius: 8px;
            width: 400px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .form-header {
            background: #1a2b5b;
            color: white;
            text-align: center;
            padding: 15px;
            font-size: 22px;
            font-weight: bold;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
        }
        .error-box {
            background: #f8d7da;
            color: #842029;
            border: 1px solid #f5c2c7;
            padding: 10px;
            margin: 10px;
            border-radius: 4px;
            font-size: 14px;
        }
        form { padding: 20px; }
        label { display: block; margin: 8px 0 5px; font-weight: bold; }
        input {
            width: 100%;
            padding: 8px;
            margin-bottom: 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .btn {
            width: 100%;
            background: #1a2b5b;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
        }
        .btn:hover { background: #2c3e70; }
        .signin {
            text-align: center;
            margin: 15px;
            font-size: 14px;
        }
        .signin a {
            color: #1a2b5b;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <div class="form-header">Register</div>

        <?php if (!empty($errors)): ?>
            <div class="error-box">
                <?php foreach ($errors as $error): ?>
                    <div><?php echo htmlspecialchars($error); ?></div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="">
            <label>Username</label>
            <input type="text" name="username"
                value="<?php echo isset($_POST['username']) ? htmlspecialchars($_POST['username']) : '' ?>" required>

            <label>Email</label>
            <input type="email" name="email"
                value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '' ?>" required>

            <label>Password</label>
            <input type="password" name="password" required>

            <label>Confirm password</label>
            <input type="password" name="confirm_password" required>

            <button type="submit" class="btn">Register</button>
        </form>

        <div class="signin">
            Already a member? <a href="login.php">Sign in</a>
        </div>
    </div>
</body>
</html>
