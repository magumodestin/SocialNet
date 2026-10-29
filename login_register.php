<?php
session_start();

$host = 'localhost';  // your MySQL host
$db   = 'usersdata';  // database name
$user = 'root';       // your MySQL username
$pass = '';           // your MySQL password

// Create connection
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function redirectWithError($form, $errorMsg) {
    $_SESSION['active_form'] = $form;
    if ($form === 'login') {
        $_SESSION['login_error'] = "<span class='shaky-error'>$errorMsg</span>";
    } else {
        $_SESSION['register_error'] = "<span class='shaky-error'>$errorMsg</span>";
    }
    header('Location: index.php');
    exit();
}

if (isset($_POST['register'])) {
    // Registration logic
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm-password'];
    $role = $_POST['role'] ?? 'user';

    if ($password !== $confirm_password) {
        redirectWithError('register', "Passwords do not match.");
    }

    // Check if email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        $stmt->close();
        redirectWithError('register', "Email already registered.");
    }
    $stmt->close();

    // Hash password
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    // Insert user
    $stmt = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
    $stmt->bind_param('ssss', $name, $email, $passwordHash, $role);
    if ($stmt->execute()) {
        $_SESSION['active_form'] = 'login';
        $_SESSION['login_success'] = "<span class='shaky-success'>Registration successful. Please login.</span>";
        header('Location: index.php');
        exit();
    } else {
        redirectWithError('register', "Error registering user.");
    }
    $stmt->close();

} elseif (isset($_POST['login'])) {
    // Login logic
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        $stmt->bind_result($id, $hashedPassword);
        $stmt->fetch();

        if (password_verify($password, $hashedPassword)) {
            // Successful login
            $_SESSION['user_id'] = $id;
            $_SESSION['email'] = $email;
            $_SESSION['login_success'] = "<span class='shaky-success'>Login successful. Redirecting...</span>";
            $_SESSION['active_form'] = 'login';
            header('Location: index.php'); // Redirect to show success first
            exit();
        } else {
            // Invalid password
            redirectWithError('login', "Username and password is incorrect");
        }
    } else {
        // No such user
        redirectWithError('login', "Username and password is incorrect");
    }

    $stmt->close();
}

$conn->close();
?>
