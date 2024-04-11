function setLanguageCooke(string $language) {
    setcookie("language", $language, time() + (24 * 60 * 60 * 30), "/"); // 30 days
}

function getLanguageCookie() {
    return $_COOKIE["language"];
}