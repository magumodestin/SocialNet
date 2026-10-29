<?php
session_start();

// Check if user came from forgot password flow
if (!isset($_SESSION['reset_user_id']) || !isset($_SESSION['verification_code'])) {
    header('Location: fogortpassword.php');
    exit();
}

// Check if verification code has expired
if (time() > $_SESSION['code_expiry']) {
    unset($_SESSION['reset_user_id'], $_SESSION['reset_email'], $_SESSION['verification_code'], $_SESSION['code_expiry']);
    $_SESSION['error'] = "Verification code has expired. Please try again.";
    header('Location: fogortpassword.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $entered_code = $_POST['code1'] . $_POST['code2'] . $_POST['code3'] . 
                   $_POST['code4'] . $_POST['code5'] . $_POST['code6'];
    
    // For demo purposes, accept any 6-digit code
    // In real application, you would verify against the sent code
    if (strlen($entered_code) === 6 && is_numeric($entered_code)) {
        // Code is valid (in demo, we accept any 6-digit code)
        $_SESSION['code_verified'] = true;
        header('Location: newpassword.php');
        exit();
    } else {
        $_SESSION['error'] = "Please enter a valid 6-digit code.";
        header('Location: verificationform.php');
        exit();
    }
}
?>