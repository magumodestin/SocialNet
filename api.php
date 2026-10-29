<?php
// api.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once 'config.php';

$input = json_decode(file_get_contents('php://input'), true);
$action = $_GET['action'] ?? $input['action'] ?? '';

function sendResponse($data) {
    echo json_encode($data);
    exit;
}

function getUserId($username) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    return $user ? $user['id'] : null;
}

try {
    switch($action) {
        case 'login':
            $username = $input['username'] ?? '';
            $password = $input['password'] ?? '';
            
            // For demo purposes, we're using simple authentication
            // In production, use proper password hashing
            $stmt = $pdo->prepare("SELECT id, username, status, avatar_url FROM users WHERE username = ? AND password = ?");
            $stmt->execute([$username, $password]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user) {
                // Update user status to online
                $stmt = $pdo->prepare("UPDATE users SET status = 'online', last_seen = NOW() WHERE id = ?");
                $stmt->execute([$user['id']]);
                
                sendResponse(['success' => true, 'user' => $user]);
            } else {
                sendResponse(['success' => false, 'error' => 'Invalid username or password']);
            }
            break;
            
        case 'getMessages':
            $currentUser = $_GET['currentUser'] ?? '';
            $chatUser = $_GET['chatUser'] ?? '';
            
            if(empty($currentUser) || empty($chatUser)) {
                sendResponse(['error' => 'Both users are required']);
            }
            
            $currentUserId = getUserId($currentUser);
            $chatUserId = getUserId($chatUser);
            
            if(!$currentUserId || !$chatUserId) {
                sendResponse(['error' => 'User not found']);
            }
            
            $stmt = $pdo->prepare("
                SELECT m.*, u.username as sender_name 
                FROM messages m 
                JOIN users u ON m.sender_id = u.id 
                WHERE (m.sender_id = ? AND m.receiver_id = ?) OR (m.sender_id = ? AND m.receiver_id = ?) 
                ORDER BY m.timestamp ASC
            ");
            $stmt->execute([$currentUserId, $chatUserId, $chatUserId, $currentUserId]);
            $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            sendResponse(['success' => true, 'messages' => $messages]);
            break;
            
        case 'sendMessage':
            $sender = $input['sender'] ?? '';
            $receiver = $input['receiver'] ?? '';
            $message = $input['message'] ?? '';
            
            if(empty($sender) || empty($receiver) || empty($message)) {
                sendResponse(['error' => 'All fields are required']);
            }
            
            $senderId = getUserId($sender);
            $receiverId = getUserId($receiver);
            
            if(!$senderId || !$receiverId) {
                sendResponse(['error' => 'User not found']);
            }
            
            $stmt = $pdo->prepare("INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)");
            $stmt->execute([$senderId, $receiverId, $message]);
            
            // Update sender's last seen time
            $stmt = $pdo->prepare("UPDATE users SET last_seen = NOW() WHERE id = ?");
            $stmt->execute([$senderId]);
            
            sendResponse(['success' => true, 'id' => $pdo->lastInsertId()]);
            break;
            
        case 'getUsers':
            $stmt = $pdo->prepare("SELECT username, status, last_seen, avatar_url FROM users WHERE username != ? ORDER BY status = 'online' DESC, username ASC");
            $stmt->execute([$input['currentUser'] ?? '']);
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            sendResponse(['success' => true, 'users' => $users]);
            break;
            
        case 'updateStatus':
            $username = $input['username'] ?? '';
            $status = $input['status'] ?? 'online';
            
            if(empty($username)) {
                sendResponse(['error' => 'Username is required']);
            }
            
            $stmt = $pdo->prepare("UPDATE users SET status = ?, last_seen = NOW() WHERE username = ?");
            $stmt->execute([$status, $username]);
            
            sendResponse(['success' => true]);
            break;
            
        case 'logout':
            $username = $input['username'] ?? '';
            
            if(empty($username)) {
                sendResponse(['error' => 'Username is required']);
            }
            
            $stmt = $pdo->prepare("UPDATE users SET status = 'offline', last_seen = NOW() WHERE username = ?");
            $stmt->execute([$username]);
            
            sendResponse(['success' => true]);
            break;
            
        default:
            sendResponse(['error' => 'Invalid action']);
    }
} catch(PDOException $e) {
    sendResponse(['error' => 'Database error: ' . $e->getMessage()]);
}
?>