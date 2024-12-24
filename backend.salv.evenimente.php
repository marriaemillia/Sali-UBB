<?php
// save_event.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $date = $_POST['date'];
    $time = $_POST['time'];
    $description = $_POST['description'];

    // Conexiune la baza de date
    $conn = new mysqli('localhost', 'root', '', 'calendar');
    if ($conn->connect_error) {
        die("Conexiune eșuată: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO events (date, time, description) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $date, $time, $description);
    if ($stmt->execute()) {
        echo "Eveniment adăugat cu succes!";
    } else {
        echo "Eroare: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>
