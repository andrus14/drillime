<?php

$config = require_once 'config.php';

try {
    $pdo = new PDO(
        $config['dsn'], $config['username'], $config['password']
    );

} catch (PDOException $e) {
    die($e->getMessage());
}