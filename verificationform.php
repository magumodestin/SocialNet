<?php
session_start();

// Check if user came from forgot password flow
if (!isset($_SESSION['reset_user_id'])) {
    header('Location: fogortpassword.php');
    exit();
}

// Check if verification code has expired
if (isset($_SESSION['code_expiry']) && time() > $_SESSION['code_expiry']) {
    unset($_SESSION['reset_user_id'], $_SESSION['reset_email'], $_SESSION['verification_code'], $_SESSION['code_expiry']);
    $_SESSION['error'] = "Verification code has expired. Please try again.";
    header('Location: fogortpassword.php');
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
  <title>Verification Code</title>
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
    
    .demo-code {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      text-align: center;
      border-left: 4px solid #667eea;
    }
    
    .demo-code strong {
      color: #0c1c47;
    }
    
    .verification-code-boxes {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin: 20px 0;
    }
    
    .verification-code-box {
      width: 50px;
      height: 50px;
      padding: 10px;
      text-align: center;
      border: 2px solid #e1e1e1;
      border-radius: 8px;
      font-size: 20px;
      font-weight: bold;
      -moz-appearance: textfield;
    }

    .verification-code-box::-webkit-outer-spin-button,
    .verification-code-box::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
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
      margin-top: 20px;
      transition: background 0.3s;
    }
    
    .submit-btn:hover {
      background: #1a3c7a;
    }
    
    .back-link {
      text-align: center;
      margin-top: 15px;
    }
    
    .back-link a {
      color: #667eea;
      text-decoration: none;
    }
    
    .back-link a:hover {
      text-decoration: underline;
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
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Verification Code</h2>
    </div>
    
    <div class="content">
      <?php if (isset($_SESSION['demo_code'])): ?>
        <div class="demo-code">
          <strong>Demo Code: <?php echo $_SESSION['demo_code']; ?></strong><br>
          <small>In a real application, this would be sent to your email</small>
        </div>
      <?php endif; ?>
      
      <?php if (isset($_SESSION['error'])): ?>
        <div class="message error">
          <?php echo $_SESSION['error']; unset($_SESSION['error']); ?>
        </div>
      <?php endif; ?>
      
      <p style="text-align: center; margin-bottom: 20px;">Enter the 6-digit verification code sent to your email:</p>
      
      <form id="verification-form" action="verifycode.php" method="post">
        <div class="verification-code-boxes">
          <input type="number" id="code1" name="code1" class="verification-code-box" maxlength="1" required 
                 oninput="moveToNext(this, 'code2')">
          <input type="number" id="code2" name="code2" class="verification-code-box" maxlength="1" required 
                 oninput="moveToNext(this, 'code3')">
          <input type="number" id="code3" name="code3" class="verification-code-box" maxlength="1" required 
                 oninput="moveToNext(this, 'code4')">
          <span style="margin: 0 5px; font-size: 20px; line-height: 50px;">-</span>
          <input type="number" id="code4" name="code4" class="verification-code-box" maxlength="1" required 
                 oninput="moveToNext(this, 'code5')">
          <input type="number" id="code5" name="code5" class="verification-code-box" maxlength="1" required 
                 oninput="moveToNext(this, 'code6')">
          <input type="number" id="code6" name="code6" class="verification-code-box" maxlength="1" required 
                 oninput="moveToNext(this, null)">
        </div>
        
        <button type="submit" class="submit-btn">Verify Code</button>
      </form>
      
      <div class="back-link">
        <a href="fogortpassword.php">← Back to Forgot Password</a>
      </div>
    </div>
  </div>

  <script>
    function moveToNext(current, nextId) {
      if (current.value.length === 1 && nextId) {
        document.getElementById(nextId).focus();
      }
    }

    // Handle paste event
    document.addEventListener('paste', function(event) {
      const paste = event.clipboardData.getData('text');
      const numbers = paste.replace(/[^0-9]/g, '');
      
      for (let i = 0; i < Math.min(numbers.length, 6); i++) {
        document.getElementById(`code${i + 1}`).value = numbers[i];
      }
      
      // Focus the next empty field or submit
      for (let i = 0; i < 6; i++) {
        if (!document.getElementById(`code${i + 1}`).value) {
          document.getElementById(`code${i + 1}`).focus();
          break;
        }
      }
    });
  </script>
</body>
</html>