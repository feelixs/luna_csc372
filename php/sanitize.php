<?php

function check_input(string $email) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // https://www.php.net/manual/en/function.filter-var.php
        // verifies that the email is valid (true) = valid, (false) = not valid
        return false;
    }
    // check the length of the email
    if (strlen($email) > 100 || strlen($email) < 5) {
        // emails less than 5 characters are probably invalid (minimum could maybe be d@r.c)
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