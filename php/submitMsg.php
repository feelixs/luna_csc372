<?php

require 'php/connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $message = $_POST['message'];

    $statement = $pdo->prepare("INSERT INTO messages (user, MESSAGE_TEXT, timestamp) VALUES ('$email', '$message', NOW())");
    header("Location: contact.php?status=200");
    exit();
}

header("Location: contact.php?status=500"); // no post request was made

?>