<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
    $SESSION_['user'] = null;
}

header("Location: index.php");

?>