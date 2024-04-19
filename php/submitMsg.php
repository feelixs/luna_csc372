<?php



if ($_SERVER["REQUEST_METHOD"] == "POST") {

    header("Location: ../contact.php?status=200");
    exit();
}

?>