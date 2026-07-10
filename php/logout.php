<?php
require 'config.php';

$token = $_COOKIE['session_token'] ?? '';
if ($token) {
    $redis->del(["session:$token"]);
}
setcookie('session_token', '', time() - 3600, '/');

respond(['success' => true]);
