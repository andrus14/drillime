<?php

$aData = [];
$directory = './upload/';

if ( file_exists($directory) ) {
    $aFiles = array_diff(scandir($directory), array('..', '.'));

    foreach ( $aFiles as $file ) {
        $content = json_decode(file_get_contents($directory . $file));
        $aData[] = [
            'filename' => $file,
            'title' => $content->metaData->title,
        ];
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Drillime</title>
</head>
<body>

    <div id="container">
        <div id="sidebar">
            <input type="file" id="file-upload">
            <div id="file-list">
                <ul>
                    <?php
                    foreach ( $aData as $test ) {
                    ?>
                        <li><a href="?file=<?php echo $test['filename']; ?>"><?php echo $test['title']; ?></a></li>
                    <?php
                    }
                    ?>
                </ul>
            </div>
        </div>

        <div id="main-content">
            <h1 id="title"></h1>
            <div id="question"></div>
            <input id="answer-box" type="text">
            <div id="timer"></div>
            <div id="feedback">
                <div id="correct">Õige: <span id="correct-counter">0</span></div>
                <div id="incorrect">Vale: <span id="incorrect-counter">0</span></div>
            <div>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>