<?php
session_start();

// Check if user is verified
if (!isset($_SESSION['code_verified']) || !$_SESSION['code_verified']) {
    header('Location: fogortpassword.php');
    exit();
}

// Check if user ID is set
if (!isset($_SESSION['reset_user_id'])) {
    header('Location: fogortpassword.php');
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Password</title>
  <style>
body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    scroll-behavior: smooth;
    background: linear-gradient(to right, #e2e2e2, #c9d6ff);
    color: #333;
    transition: background 0.3s, color 0.3s;
    background-image: url('keliking beach.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
}
    
    .container {
      width: 450px;
      background: white;
      border-radius: 15px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
      overflow: hidden;
    }
    
    .header {
      background: #0c1c47;
      color: white;
      padding: 20px;
      text-align: center;
    }
    
    .header h2 {
      margin: 0;
      font-size: 24px;
    }
    
    .content {
      padding: 30px;
    }
    
    .input-group {
      margin-bottom: 20px;
    }
    
    .input-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #555;
    }
    
    .input-group input {
      width: 100%;
      padding: 12px;
      border: 2px solid #e1e1e1;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
      transition: border-color 0.3s;
    }
    
    .input-group input:focus {
      border-color: #667eea;
      outline: none;
    }
    
    #password-rules {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 4px solid #667eea;
    }
    
    #password-rules ul {
      margin: 10px 0 0 20px;
      padding: 0;
    }
    
    #password-rules li {
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .valid { color: #00b894; }
    .invalid { color: #d63031; }
    
    #password-match-error, #password-match-success {
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 15px;
      display: none;
    }
    
    #password-match-error {
      background: #ffe6e6;
      color: #d63031;
      border-left: 4px solid #d63031;
    }
    
    #password-match-success {
      background: #e6ffed;
      color: #00b894;
      border-left: 4px solid #00b894;
    }
    
    .submit-btn {
      width: 100%;
      padding: 12px;
      background: #0c1c47;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      transition: background 0.3s;
    }
    
    .submit-btn:hover:not(:disabled) {
      background: #1a3c7a;
    }
    
    .submit-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    
    .message {
      padding: 10px;
      margin-bottom: 15px;
      border-radius: 5px;
      text-align: center;
      display: none;
    }
    
    .success {
      background: #e6ffed;
      color: #00b894;
      border-left: 4px solid #00b894;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Create New Password</h2>
    </div>
    
    <div class="content">
      <form id="new-password-form" action="update_password.php" method="post">
        <div class="input-group">
          <label for="new-password">New Password:</label>
          <input type="password" id="new-password" name="new-password" autocomplete="new-password" 
                 oninput="validatePassword()" required>
        </div>
        
        <div class="input-group">
          <label for="confirm-new-password">Confirm New Password:</label>
          <input type="password" id="confirm-new-password" name="confirm-new-password" 
                 autocomplete="new-password" oninput="validateConfirmPassword()" required>
        </div>
        
        <div id="password-rules">
          <strong>Password must include:</strong>
          <ul>
            <li id="rule-length">At least 8 characters <span id="length-valid" class="invalid">✗</span></li>
            <li id="rule-number">At least 1 number <span id="number-valid" class="invalid">✗</span></li>
            <li id="rule-capital">At least 1 capital letter <span id="capital-valid" class="invalid">✗</span></li>
            <li id="rule-symbol">At least 1 symbol ($, !, etc.) <span id="symbol-valid" class="invalid">✗</span></li>
          </ul>
        </div>
        
        <div id="password-match-error">
          Passwords don't match
        </div>
        
        <div id="password-match-success">
          Passwords match
        </div>
        
        <div id="success-message" class="message success" style="display: none;">
          New password created! Redirecting to login...
        </div>
        
        <button type="submit" id="submit-btn" class="submit-btn" disabled>Reset Password</button>
      </form>
    </div>
  </div>

  <script>
    function validatePassword() {
      let password = document.getElementById('new-password').value;
      let lengthValid = document.getElementById('length-valid');
      let numberValid = document.getElementById('number-valid');
      let capitalValid = document.getElementById('capital-valid');
      let symbolValid = document.getElementById('symbol-valid');

      // Validate length
      if (password.length >= 8) {
        lengthValid.className = 'valid';
        lengthValid.innerHTML = '✓';
      } else {
        lengthValid.className = 'invalid';
        lengthValid.innerHTML = '✗';
      }

      // Validate number
      if (/\d/.test(password)) {
        numberValid.className = 'valid';
        numberValid.innerHTML = '✓';
      } else {
        numberValid.className = 'invalid';
        numberValid.innerHTML = '✗';
      }

      // Validate capital letter
      if (/[A-Z]/.test(password)) {
        capitalValid.className = 'valid';
        capitalValid.innerHTML = '✓';
      } else {
        capitalValid.className = 'invalid';
        capitalValid.innerHTML = '✗';
      }

      // Validate symbol
      if (/[^a-zA-Z0-9]/.test(password)) {
        symbolValid.className = 'valid';
        symbolValid.innerHTML = '✓';
      } else {
        symbolValid.className = 'invalid';
        symbolValid.innerHTML = '✗';
      }

      validateForm();
      validateConfirmPassword();
    }

    function validateConfirmPassword() {
      let password = document.getElementById('new-password').value;
      let confirmPassword = document.getElementById('confirm-new-password').value;
      let errorMsg = document.getElementById('password-match-error');
      let successMsg = document.getElementById('password-match-success');

      if (password === confirmPassword && password !== '') {
        errorMsg.style.display = 'none';
        successMsg.style.display = 'block';
      } else {
        errorMsg.style.display = 'block';
        successMsg.style.display = 'none';
      }

      validateForm();
    }

    function validateForm() {
      let lengthValid = document.getElementById('length-valid').classList.contains('valid');
      let numberValid = document.getElementById('number-valid').classList.contains('valid');
      let capitalValid = document.getElementById('capital-valid').classList.contains('valid');
      let symbolValid = document.getElementById('symbol-valid').classList.contains('valid');
      let passwordMatchSuccess = document.getElementById('password-match-success').style.display === 'block';

      if (lengthValid && numberValid && capitalValid && symbolValid && passwordMatchSuccess) {
        document.getElementById('submit-btn').disabled = false;
      } else {
        document.getElementById('submit-btn').disabled = true;
      }
    }

    document.getElementById('new-password-form').addEventListener('submit', function(event) {
      event.preventDefault();
      
      let lengthValid = document.getElementById('length-valid').classList.contains('valid');
      let numberValid = document.getElementById('number-valid').classList.contains('valid');
      let capitalValid = document.getElementById('capital-valid').classList.contains('valid');
      let symbolValid = document.getElementById('symbol-valid').classList.contains('valid');
      let passwordMatchSuccess = document.getElementById('password-match-success').style.display === 'block';

      if (lengthValid && numberValid && capitalValid && symbolValid && passwordMatchSuccess) {
        // Show success message
        document.getElementById('success-message').style.display = 'block';
        document.getElementById('submit-btn').disabled = true;
        
        // Submit the form after a brief delay
        setTimeout(function() {
          document.getElementById('new-password-form').submit();
        }, 1000);
      }
    });
  </script>
</body>
</html>