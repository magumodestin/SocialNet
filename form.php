
<?php session_start(); 
$errors =[ 
    'login' => $_SESSION['login_error'] ?? '', 
    'register' => $_SESSION['register_error'] ?? '' 
];
$activeForm = $_SESSION['active_form'] ?? 'login'; 
session_unset();

function showError($error){
    return !empty($error) ?"<p class='error-message'>$error</p>" : ''; 
}

function isActiveForm($formName, $activeForm){
    return $formName === $activeForm ? 'active' : '' ; 
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.8">
    <title>Login</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .valid {
            color: green;
        }
        .invalid {
            color: red;
        }
		


    </style>
</head>
<body>
    <div class="container">
        <div class="form-box <?= isActiveForm('login', $activeForm); ?>" id="login-form">
            <form action="login_register.php" method="post">
                <h2>Login</h2>
                <?= showError($errors['login']); ?>
                <label for="email">Email</label>
                <input type="email" name="email" placeholder="Email" required>
                <label for="password">Password</label>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit" name="login">Login</button>
               
<p>Don't have an account?<a href="#"onclick="showform('register-form')">Register</a></p> 
<p>fogort<a href="fogortpassword.php.php"onclick="showform('register-form')">forgot password</a></p>                                                       
            </form>
        </div>
       <div class="form-box <?= isActiveForm('register', $activeForm); ?>" id="register-form">
    <form action="login_register.php" method="post">
        <h2>Register</h2>
        <?= showError($errors['register']); ?>
        <label for="name">Name</label>
        <input type="text" name="name" required>
        <label for="email">Email</label>
        <input type="email" name="email" required>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required oninput="validatePassword()">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" name="confirm-password" id="confirm-password" required oninput="validateConfirmPassword()">
        <p id="password-rules">Password must include:
            <ul>
                <li id="rule-length">At least 8 characters <span id="length-valid" class="invalid">&#10060;</span></li>
                <li id="rule-number">At least 1 number <span id="number-valid" class="invalid">&#10060;</span></li>
                <li id="rule-capital">At least 1 capital letter <span id="capital-valid" class="invalid">&#10060;</span></li>
                <li id="rule-symbol">At least 1 symbol ($, !, etc.) <span id="symbol-valid" class="invalid">&#10060;</span></li>
            </ul>
        </p>
        <p id="password-match-error" style="display: none;">Passwords don't match <span style="color: red">&#10060;</span></p>
        <p id="password-match-success" style="display: none;">Passwords match <span style="color: green">&#10004;</span></p>
        <select name="role" required>
            <option value="">--Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
        <button type="submit" name="register">Register</button>
         <p>Already  have an account?<a href="#"onclick="showform('login-form')" >Login</a></p>                                           
    </form>
</div>
</div>
<script src="script.js"></script>

    <script>

function validatePassword() {
    let password = document.getElementById('password').value;
    let lengthValid = document.getElementById('length-valid');
    let numberValid = document.getElementById('number-valid');
    let capitalValid = document.getElementById('capital-valid');
    let symbolValid = document.getElementById('symbol-valid');

    if (password.length >= 8) {
        lengthValid.classList.remove('invalid');
        lengthValid.classList.add('valid');
        lengthValid.innerHTML = '&#10004;';
    } else {
        lengthValid.classList.remove('valid');
        lengthValid.classList.add('invalid');
        lengthValid.innerHTML = '&#10060;';
    }

    if (/\d/.test(password)) {
        numberValid.classList.remove('invalid');
        numberValid.classList.add('valid');
        numberValid.innerHTML = '&#10004;';
    } else {
        numberValid.classList.remove('valid');
        numberValid.classList.add('invalid');
        numberValid.innerHTML = '&#10060;';
    }

    if (/[A-Z]/.test(password)) {
        capitalValid.classList.remove('invalid');
        capitalValid.classList.add('valid');
        capitalValid.innerHTML = '&#10004;';
    } else {
        capitalValid.classList.remove('valid');
        capitalValid.classList.add('invalid');
        capitalValid.innerHTML = '&#10060;';
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
        symbolValid.classList.remove('invalid');
        symbolValid.classList.add('valid');
        symbolValid.innerHTML = '&#10004;';
    } else {
        symbolValid.classList.remove('valid');
        symbolValid.classList.add('invalid');
        symbolValid.innerHTML = '&#10060;';
    }

    validateConfirmPassword();
}

function validateConfirmPassword() {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;
    let passwordMatchError = document.getElementById('password-match-error');
    let passwordMatchSuccess = document.getElementById('password-match-success');

    if (password === confirmPassword && password !== '') {
        passwordMatchError.style.display = 'none';
        passwordMatchSuccess.style.display = 'block';
        passwordMatchSuccess.innerHTML = 'Passwords match <span style="color: green">&#10004;</span>';
    } else {
        passwordMatchError.style.display = 'block';
        passwordMatchSuccess.style.display = 'none';
        passwordMatchError.innerHTML = 'Passwords don\'t match <span style="color: red">&#10060;</span>';
    }
}

</script>