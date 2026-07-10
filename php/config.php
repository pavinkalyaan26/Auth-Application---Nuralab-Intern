<?php

require __DIR__ . '/../vendor/autoload.php';

// #dotenv
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->safeLoad();

// #mysql
$mysqlHost = $_ENV['DB_HOST'] ?? '127.0.0.1';
$mysqlPort = $_ENV['DB_PORT'] ?? 3306;
$mysqlName = $_ENV['DB_NAME'] ?? 'auth_app';
$mysqlUser = $_ENV['DB_USER'] ?? 'root';
$mysqlPass = $_ENV['DB_PASS'] ?? '';;

$pdo = new PDO(
    "mysql:host=$mysqlHost;port=$mysqlPort;dbname=$mysqlName;charset=utf8mb4",
    $mysqlUser,
    $mysqlPass,
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]
);

// #mongodb
$mongoUri = $_ENV['MONGO_URI'] ?? 'mongodb://127.0.0.1:27017';
$mongoClient = new MongoDB\Client($mongoUri);
$profiles = $mongoClient->selectDatabase('auth_app')->selectCollection('profiles');

// #redis
$redisUrl = $_ENV['REDIS_URL'] ?? 'tcp://127.0.0.1:6379';
$redis = new Predis\Client($redisUrl);

// #helper
function jsonInput()
{
    return json_decode(file_get_contents('php://input'), true) ?: [];
}

function respond($data, $code = 200)
{
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}