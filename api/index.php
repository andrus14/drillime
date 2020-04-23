<?php

require_once 'connection.php';
require_once 'model/Drill.php';

if (!file_exists('config.php')) {
    exit(Drill::message('config file is missing'));
}

$requestUri = $_SERVER['REQUEST_URI'];

$p = end(explode("/", $requestUri));

switch ($p) {
    case 'save':
        exit(Drill::save());
        break;
    case 'results':
        exit(Drill::all());
        break;
    case 'upload':
        exit(Drill::upload());
        break;

    default:
        exit(Drill::message('404'));
}