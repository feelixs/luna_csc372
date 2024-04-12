<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $SESSION_['user'] = null;
}

header("Location: index.php");

?>