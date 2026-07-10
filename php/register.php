<?php
require 'config.php';

$data = jsonInput();
$username = trim($data['username'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$name = trim($data['name'] ?? '');
$age = $data['age'] ?? null;
$bio = trim($data['bio'] ?? '');
$interests = $data['interests'] ?? [];

if (!$username || !$email || !$password) {
    respond(['success' => false, 'message' => 'Username, email and password are required.'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(['success' => false, 'message' => 'Enter a valid email address.'], 400);
}

if (strlen($password) < 6) {
    respond(['success' => false, 'message' => 'Password should be at least 6 characters.'], 400);
}

$check = $pdo->prepare('SELECT id FROM users WHERE username = ? OR email = ?');
$check->execute([$username, $email]);
if ($check->fetch()) {
    respond(['success' => false, 'message' => 'That username or email is already taken.'], 409);
}

$hashed = password_hash($password, PASSWORD_DEFAULT);
$insert = $pdo->prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
$insert->execute([$username, $email, $hashed]);
$userId = (int) $pdo->lastInsertId();

$profiles->insertOne([
    'user_id' => $userId,
    'name' => $name,
    'age' => $age !== null && $age !== '' ? (int) $age : null,
    'bio' => $bio,
    'interests' => is_array($interests)
    ? array_values($interests)
    : array_filter(array_map('trim', explode(',', $interests))),
]);

respond(['success' => true, 'message' => 'Account created. You can sign in now.']);
