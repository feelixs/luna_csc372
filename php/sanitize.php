<?php

function check_input(string $email) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // https://www.php.net/manual/en/function.filter-var.php
        // verifies that the email is valid (true) = valid, (false) = not valid
        return false;
    }
    return true;
}

function check_len(string $input, int $min, int $max) {
    if (strlen($input) < $min || strlen($input) > $max) {
        return false;
    }
    return true;
}


function check_option(string $option) {
    // 0 = no, 1 = yes
    $options = array("0", "1");
    if (in_array($option, $options)) {
        return true;
    } else {
        return false;
    }
}

?>