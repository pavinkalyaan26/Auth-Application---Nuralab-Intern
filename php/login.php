<?php
require 'config.php';

$data = jsonInput();
$identifier = trim($data['identifier'] ?? '');
$password = $data['password'] ?? '';

if (!$identifier || !$password) {
    respond(['success' => false, 'message' => 'Enter your username or email and password.'], 400);
}

$stmt = $pdo->prepare('SELECT id, username, password FROM users WHERE username = ? OR email = ?');
$stmt->execute([$identifier, $identifier]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($password, $user['password'])) {
    respond(['success' => false, 'message' => 'Incorrect username or password.'], 401);
}

$token = bin2hex(random_bytes(32));
$redis->setex("session:$token", 3600, $user['id']);

setcookie('session_token', $token, [
    'expires' => time() + 3600,
    'path' => '/',
    'httponly' => true,
    'samesite' => 'Lax'
]);

respond(['success' => true, 'message' => 'Welcome back, ' . $user['username'] . '.']);
