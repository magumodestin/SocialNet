<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
  <title>Forgot Password</title>
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
    
    #forgot-password-form {
      text-align: center;
      width: 400px;
      margin: 20px auto;
      padding: 30px;
      background-color: #fff;
      border-radius: 15px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    }

    #email-form {
      display: inline-block;
      text-align: left;
      width: 100%;
    }
 
    .button-submit {
      width: 100%;
      margin-top: 20px;
    }
    
    #email {
      width: 100%;
      padding: 12px;
      margin-bottom: 15px;
      border: 2px solid #e1e1e1;
      border-radius: 8px;
      font-size: 16px;
      box-sizing: border-box;
    }
    
    .button-submit button[type="submit"] {
      background: #0c1c47;
      color: white;
      padding: 12px;
      width: 100%;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      transition: background 0.3s;
    }
    
    .button-submit button[type="submit"]:hover {
      background: #1a3c7a;
    }
    
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
    
    .message {
      padding: 10px;
      margin-bottom: 15px;
      border-radius: 5px;
      text-align: center;
    }
    
    .error {
      background: #ffe6e6;
      color: #d63031;
      border-left: 4px solid #d63031;
    }
    
    .success {
      background: #e6ffed;
      color: #00b894;
      border-left: 4px solid #00b894;
    }
    
    .back-link {
      margin-top: 15px;
      text-align: center;
    }
    
    .back-link a {
      color: #667eea;
      text-decoration: none;
    }
    
    .back-link a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div id="forgot-password-form">
    <h2>Forgot Password</h2>
    
    <?php if (isset($_SESSION['error'])): ?>
      <div class="message error">
        <?php echo $_SESSION['error']; unset($_SESSION['error']); ?>
      </div>
    <?php endif; ?>
    
    <?php if (isset($_SESSION['success'])): ?>
      <div class="message success">
        <?php echo $_SESSION['success']; unset($_SESSION['success']); ?>
      </div>
    <?php endif; ?>
    
    <form id="email-form" action="send_verification.php" method="post">
      <label for="email">Enter Your Email:</label><br>
      <input type="email" id="email" name="email" required placeholder="your@email.com"><br>
      <div class="button-submit">
        <button type="submit">Send Verification Code</button>
      </div>
    </form>
    
    <div class="back-link">
      <a href="index.php">← Back to Login</a>
    </div>
  </div>
</body>
</html>