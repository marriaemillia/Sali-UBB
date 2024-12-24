<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nume = $_POST['nume'];
    $email = $_POST['email'];
    $mesaj = $_POST['mesaj'];

    // Exemplu: Trimite mesajul prin email
    $to = "admin@site.com";
    $subject = "Mesaj de la $nume";
    $body = "Email: $email\nMesaj:\n$mesaj";

    if (mail($to, $subject, $body)) {
        echo "Mesaj trimis cu succes!";
    } else {
        echo "Eroare la trimiterea mesajului.";
    }
}
?>

