<?php



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $message = $_POST['message'];

    $sql = "INSERT INTO messages (user, MESSAGE_TEXT, timestamp) VALUES ('$email', '$message', NOW())"
    $statement['user'] = $email;
    $statement['MESSAGE_TEXT'] = $message;
    $statement['timestamp'] = NOW();

    $query = $pdo->prepare($sql);
    $query->execute($statement);

    header("Location: ../contact.php?status=200");
    exit();
}

?>