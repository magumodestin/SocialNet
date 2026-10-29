<?php
session_start();

$errors = [
    'login' => $_SESSION['login_error'] ?? '',
    'register' => $_SESSION['register_error'] ?? ''
];
$activeForm = $_SESSION['active_form'] ?? 'login';
$success = $_SESSION['login_success'] ?? '';

// Clear messages after displaying
unset($_SESSION['login_error'], $_SESSION['register_error'], $_SESSION['active_form'], $_SESSION['login_success']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login/Register</title>
    <link rel="stylesheet" href="style.css">
   
    <?php if (!empty($success)): ?>
    <script>
        setTimeout(function() {
            window.location.href = "dashboard.php";
        }, 2000);
    </script>
    <?php endif; ?>
</head>
<body>
    <div class="container">

        <!-- Login Form -->
        <div class="form-box <?= $activeForm === 'login' ? 'active' : '' ?>" id="login-form">
            <form action="login_register.php" method="post">
                   <div class="header">
                  <h2>login</h2>
                   </div>
                <?= !empty($errors['login']) ? "<p class='error-message'>{$errors['login']}</p>" : '' ?>
                <?= !empty($success) ? "<p class='success-message'>{$success}</p>" : '' ?>

                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="email" name="email" placeholder="Enter your email" required>
                    <i class="input-icon fas fa-envelope"></i>
                </div>

                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" placeholder="Enter your password" required>
                    <i class="input-icon fas fa-lock"></i>
                </div>

                <div class="remember-forgot">

                    <a href="fogortpassword.php" class="forgot-password">Forgot Password?</a>
                </div>

                <button type="submit" name="login">Login</button>

                <p class="toggle-form">Don't have an account? <a href="#" onclick="showform('register-form')">Register</a></p>
            </form>
        </div>

        <!-- Register Form -->
        <div class="form-box <?= $activeForm === 'register' ? 'active' : '' ?>" id="register-form">
            <form action="login_register.php" method="post">
                <h2>Register</h2>
                <?= !empty($errors['register']) ? "<p class='error-message'>{$errors['register']}</p>" : '' ?>

                <div class="input-group">
                    <label for="name">Name</label>
                    <input type="text" name="name" placeholder="Enter your full name" required>
                    <i class="input-icon fas fa-user"></i>
                </div>

                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="email" name="email" placeholder="Enter your email" required>
                    <i class="input-icon fas fa-envelope"></i>
                </div>

                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Create a password" required oninput="validatePassword()">
                    <i class="input-icon fas fa-lock"></i>
                </div>

                <div class="input-group">
                    <label for="confirm-password">Confirm Password</label>
                    <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm your password" required oninput="validateConfirmPassword()">
                    <i class="input-icon fas fa-lock"></i>
                </div>

                <p id="password-rules">Password must include:
                    <ul>
                        <li id="rule-length">At least 8 characters <span id="length-valid" class="invalid">✗</span></li>
                        <li id="rule-number">At least 1 number <span id="number-valid" class="invalid">✗</span></li>
                        <li id="rule-capital">At least 1 capital letter <span id="capital-valid" class="invalid">✗</span></li>
                        <li id="rule-symbol">At least 1 symbol ($, !, etc.) <span id="symbol-valid" class="invalid">✗</span></li>
                    </ul>
                </p>

                <p id="password-match-error" style="display: none;">Passwords don't match <span>✗</span></p>
                <p id="password-match-success" style="display: none;">Passwords match <span>✓</span></p>

                <!-- Optional role field -->
                <input type="hidden" name="role" value="user">

                <button type="submit" name="register">Register</button>

                <p class="toggle-form">Already have an account? <a href="#" onclick="showform('login-form')">Login</a></p>
            </form>
        </div>

    </div>

    <!-- JavaScript -->
    <script src="script.js"></script>
</body>
</html>