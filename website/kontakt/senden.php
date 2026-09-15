<?php
// Kontaktformular Praxis Dr. Hoffmann – einfacher, sicherer Mailversand ohne Datenbank.
declare(strict_types=1);
mb_internal_encoding('UTF-8');
$empfaenger = 'janine.hoffmann@gyn-rangsdorf.de';
$absenderDomain = 'gyn-rangsdorf.de';

function zurueck(string $status): void { header('Location: /kontakt/?status=' . $status . '#formular'); exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { zurueck('fehler'); }
if (!empty($_POST['website'])) { zurueck('danke'); } // Honeypot: Bots füllen dieses Feld aus
if (empty($_POST['datenschutz'])) { zurueck('datenschutz'); }

$clean = static function (string $key, int $max): string {
    $v = isset($_POST[$key]) ? trim((string)$_POST[$key]) : '';
    $v = str_replace(["\r", "\0"], '', $v);
    return mb_substr($v, 0, $max);
};
$name = $clean('name', 120);
$email = $clean('email', 160);
$telefon = $clean('telefon', 60);
$anliegen = $clean('anliegen', 80);
$nachricht = $clean('nachricht', 4000);

if ($name === '' || $nachricht === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) { zurueck('fehler'); }

$betreff = 'Kontaktformular gyn-rangsdorf.de: ' . ($anliegen !== '' ? $anliegen : 'Anfrage');
$text = "Neue Nachricht über das Kontaktformular\n\n"
      . "Name: $name\nE-Mail: $email\nTelefon: " . ($telefon !== '' ? $telefon : '–') . "\nAnliegen: " . ($anliegen !== '' ? $anliegen : '–') . "\n\n"
      . "Nachricht:\n$nachricht\n\n"
      . "Gesendet am " . date('d.m.Y H:i') . " Uhr\n";

$header = "From: Webseite Praxis Dr. Hoffmann <noreply@$absenderDomain>\r\n"
        . "Reply-To: " . mb_encode_mimeheader($name) . " <$email>\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "X-Mailer: PHP/" . phpversion();

$ok = @mail($empfaenger, mb_encode_mimeheader($betreff), $text, $header);
zurueck($ok ? 'danke' : 'fehler');
