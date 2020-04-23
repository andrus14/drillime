<?php


class Drill {

    public $name;
    public $correct;
    public $incorrect;
    public $type;
    public $added;

    public static function save () {
        global $pdo;

        $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
        $correct = filter_input(INPUT_POST, 'correct', FILTER_VALIDATE_INT);
        $incorrect = filter_input(INPUT_POST, 'incorrect', FILTER_VALIDATE_INT);
        $type = filter_input(INPUT_POST, 'type', FILTER_SANITIZE_STRING);
        $added = date("Y-m-d H:i:s");

        if (empty($name)) {
            return static::message('name empty');
        } elseif (empty($type)) {
            return static::message('type is missing');
        } elseif (empty($correct) && empty($incorrect)) {
            return static::message('values empty');
        }

        $sql = "INSERT INTO results (`name`, `correct`, `incorrect`, `type`, `added`) VALUES (?, ?, ?, ?, ?)";

        //$pdo->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );

        try {
            $statement = $pdo->prepare($sql);
            $statement->execute([$name, $correct, $incorrect, $type, $added]);
        } catch (Exception $e) {
            return static::message($e->getMessage());
        }

        return static::message('saved', true);
    }

    public static function all () {
        global $pdo;

        $statement = $pdo->prepare('SELECT * FROM results');
        $statement->execute();
        return json_encode($statement->fetchAll(PDO::FETCH_CLASS, 'Drill'));
    }

    public static function message ($msg, $result = false) {
        return json_encode([
            'is_success' => $result,
            'msg' => $msg
        ]);
    }
}