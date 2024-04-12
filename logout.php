<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
    $_SESSION['user'] = null;
}

header("Location: index.php");

?>