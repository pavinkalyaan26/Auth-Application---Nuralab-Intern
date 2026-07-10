<?php
require 'config.php';

$token = $_COOKIE['session_token'] ?? '';
$userId = $token ? $redis->get("session:$token") : null;

if (!$userId) {
    respond(['success' => false, 'message' => 'Session expired. Please sign in again.'], 401);
}

$stmt = $pdo->prepare('SELECT username, email, created_at FROM users WHERE id = ?');
$stmt->execute([$userId]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    respond(['success' => false, 'message' => 'Account not found.'], 404);
}

$profile = $profiles->findOne(['user_id' => (int) $userId]);

respond([
    'success' => true,
    'user' => $user,
    'profile' => [
        'name' => $profile['name'] ?? '',
        'age' => $profile['age'] ?? null,
        'bio' => $profile['bio'] ?? '',
        'interests' => $profile['interests'] ?? []
    ]
]);
