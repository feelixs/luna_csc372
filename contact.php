<?php

$language = $_COOKIE['language'] ?? 'en';

$msg = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    setcookie("language", $_POST["language"], time() + (24 * 60 * 60 * 30), "/"); // 30 days
    $msg = "Language changed to " . $_POST["language"];
}

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
                <form action="https://formspree.io/f/mnqevjdk" method="POST">
                    <label>
                        <span class="flex-container-start margin-left-small" id="contact-email-header">Your email:</span>
                        <span class="flex-container">
                            <input type="email" name="email">
                        </span>
                    </label>
                    <span class="blank-space"></span>
                    <label>
                        <span class="flex-container-start margin-left-small" id="contact-msg-header">Your message:</span>
                        <span class="flex-container">
                            <textarea name="message"></textarea>
                        </span>
                    </label><br>
                    <div class="flex-container">
                        <button id="submit-btn" class="half-rounded submit" type="submit">Send</button>
                    </div>
                </form>
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