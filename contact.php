<?php

include 'php/sanitize.php';
require 'php/connection.php';

session_start();
$language = $_COOKIE['language'] ?? 'en';
$msg = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($_POST["req"] == "LANG") { // the request is to change the language
        $language = $_POST["language"];
        setcookie("language", $language, time() + (24 * 60 * 60 * 30), "/"); // 30 days
        $msg = "Language changed to " . $_POST["language"];
    }
    else if ($_POST["req"] == "LOGIN") {
        $parse_email = $_POST["email"];
        $response_expected = $_POST["response-expected"];
        // verify the user input
        if (!check_input($parse_email)) {
            // invalid input: redirect back to login with error message
            header("Location: login.php?error=Invalid%20Input");
            exit();
        }
        if (!check_len($parse_email, 5, 75)) { // email should be between 5 and 75 length
            header("Location: login.php?error=Bad%20Input%20Length");
            exit();
        }
        if (!check_option($response_expected)) {
            header("Location: login.php?error=Unknown%20Option");
            exit();
        }

        // all checks passed
        $_SESSION['user'] = $parse_email;
        $_SESSION['response-expected'] = $_POST["response-expected"];
    }
}

$user_login = $_SESSION['user'] ?? false;
if (!$user_login) {  // user should only be able to access this page after logging in
    header("Location: login.php?error=Please%20Enter%20An%20Email");  // redirect to login page
    exit();
}

// even tho we're limiting by 5 in the actual php/html, let's retrieve 6 entries to check if we need to display "..."
$sql = "SELECT * FROM messages WHERE user = :user_login ORDER BY timestamp DESC LIMIT 6";
$user_messages = pdo($pdo, $sql, ['user_login' => $user_login])->fetchAll();

?>

<!doctype html>
<html lang=<?= $language ?>>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="images/logos/luna-logo.webp">
    <link rel="stylesheet" type="text/css" href="css/nav.css">
    <link rel="stylesheet" type="text/css" href="css/flex-boxes.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/contact.css">
    <title>Luna | Contact</title>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <!-- if we fail to load from the CDN, use our local download of jquery -->
    <script>window.jQuery || document.write('<script src="https://trioluna.com/static/js/jquery-3-7-1.js"><\/script>')</script>
</head>
<body>
<nav class="navbar" id="navbar">
    <div class="nav-content">
        <div class="logo">
            <a href="/"><img alt="Trio Luna Logo" class="img-logo trans-17" src="images/logos/luna-logo.webp"></a>
        </div>
        <ul class="nav-links">
            <li><a id="home-nav" class="only-desktop" href="/">Home</a></li>
            <li><a id="bios-nav" href="bios.php">About</a></li>
            <li><a id="media-nav" href="gallery.php">Media</a></li>
            <li><a id="patreon-nav" href="#">Contact</a></li>
            <li class="lang-chg trans-17">
                <form id="language-form" action="contact.php" method="POST">
                    <input type="hidden" name="language" id="language-input">
                    <input type="hidden" name="req" value="LANG">
                    <button type="submit"><img id="change-language-img" alt="Button that changes the page's language" src="images/buttons/globe-white-es.webp"></button>
                </form>
            </li>
        </ul>
    </div>
</nav>
<main>
    <div class="trans-contained-box page-title-white grey-bg">
        <div class="main-title-text">
            <h1 id="page-title">Contact Us</h1>
        </div>
        <div class="trans-contained-box black-bg rounded inner-div padding-20" id="form-div">
            <div class="flex-container">
                <p id="contact-desc">Got a question or just want to say hi? We'd love to hear from you!</p>
            </div>
            <div class="flex-container">
                <span id="sending-info">Sending message as:</span>&ensp;&ensp;&ensp;&ensp;<span class="orange"><?= htmlspecialchars($user_login) ?></span>&ensp;&ensp;&ensp;&ensp;
                <form action="logout.php" method="POST">
                    <button type="submit" class="text-btn"><span id="not-you">Not You?</span></button>
                </form>
            </div>
            <span class="blank-space"></span>
            <form action="php/connection.php" method="POST" id="contact-form">
                <input type="hidden" name="req" value="SUBMIT_MESSAGE">
                <input type="hidden" name="email" value=<?= $user_login ?>>
                <label>
                    <span class="flex-container-start margin-left-small" id="contact-msg-header">Your message:</span>
                    <span class="flex-container">
                        <textarea id="submit-txtarea" name="message"></textarea>
                    </span>
                </label><br>
                <div class="flex-container">
                    <button id="submit-btn" class="half-rounded submit" type="submit">Send</button>
                </div>
            </form>
        </div>
        <div class="trans-contained-box padding-20 inner-div">
            <h2>Previous Messages</h2>
            <?php
            if ($user_messages) {
                $i = 0;
                foreach ($user_messages as $message) {
                    if ($i > 5) {
                        // only show the past 5 messages sent by the user
                        echo "<div style='justify-content:left' class='flex-container'>";
                        echo "&ensp;&ensp;&ensp;&ensp;<span>...</span>";
                        echo "</div>";
                        break;
                    }
                    // trim the message length to 100 so it doesnt take up too much space
                    $trimmed_message_text = mb_substr($message['MESSAGE_TEXT'], 0, 100, "UTF-8");
                    if (mb_strlen($message['MESSAGE_TEXT'], "UTF-8") > 100) {
                        $trimmed_message_text .= '...';
                    }

                    echo "<div style='justify-content:left' class='flex-container'>";
                    echo "<span class='orange'>" . $message['timestamp'] . "</span>";
                    echo "<span style='margin-left: 100px'>" . htmlspecialchars($trimmed_message_text) . "</span>";
                    echo "</div>";
                    $i++;
                }
            } else {
                echo "<p>No messages found</p>";
            }
            ?>
        </div>
    <p><?= $msg ?></p>
    </div>
</main>

<footer>
    <div class="flex-container">
        <div class="trans-contained-box" id="copyright">
            Copyright &copy; 2024, All Rights Reserved Trio Luna and <a target="_blank" href="https://felixcreations.com"><img
                alt="Felixcreations Logo" class="img-logo trans-30" src="images/logos/felix-logo-white.webp"></a>
        </div>
    </div>
    <div class="flex-container" style="padding-bottom: 20px" id="footer-text">
        If you have any questions or concerns, please contact Michael Felix through <a class="email-link"
                                                                                       target="_blank"
                                                                                       href="mailto:mikemh@uri.edu">mikemh@uri.edu</a>
    </div>
</footer>

<script src="js/change-language.js"></script>
<script src="js/contact.js"></script>
</body>
</html>