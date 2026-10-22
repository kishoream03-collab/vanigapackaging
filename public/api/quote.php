<?php
// Requires PHP 8.2+ with OpenSSL. Secrets live outside the document root.
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
function respond(int $status, string $message): never {
    http_response_code($status);
    echo json_encode(['ok' => $status === 200, 'message' => $message]);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, 'Please submit the quote form.');
}
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ['https://vanigapackaging.com', 'https://www.vanigapackaging.com'], true)) {
    respond(403, 'Please submit from the Vaniga website.');
}
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 20000) respond(413, 'Your request is too large.');
function field(string $key, int $limit): string {
    $value = $_POST[$key] ?? '';
    if (!is_string($value) || strlen($value) > $limit) respond(422, 'Please check your form details.');
    return trim($value);
}
if (field('_gotcha', 200) !== '') respond(200, 'Request received.');
$name = field('name', 200);
$phone = field('phone', 80);
$email = field('email', 254);
if ($name === '' || $phone === '' || preg_match('/[\r\n]/', $name . $phone . $email)) respond(422, 'Please enter your name and phone number.');
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) respond(422, 'Please enter a valid email address.');
$details = [
    'Name' => $name, 'Business' => field('business', 300), 'Phone' => $phone,
    'Email' => $email, 'Product' => field('product', 300),
    'Quantity' => field('quantity', 100), 'Print logo' => field('print_logo', 20),
    'Message' => field('message', 8000),
];
$configPath = dirname(__DIR__, 3) . '/vaniga-quote-config.php';
if (!is_file($configPath)) respond(503, 'Online quotes are temporarily unavailable. Please call +91-789-283-8275.');
try {
    $config = require $configPath;
    if (empty($config['username']) || empty($config['password'])) throw new RuntimeException('SMTP configuration missing');
    // One submission per IP per minute, with an atomic lock; never trust forwarded IP headers.
    $rateDir = dirname($configPath) . '/vaniga-quote-rate';
    if (!is_dir($rateDir) && !mkdir($rateDir, 0700, true) && !is_dir($rateDir)) throw new RuntimeException('Rate storage unavailable');
    $lock = fopen($rateDir . '/' . hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown'), 'c+');
    if (!$lock || !flock($lock, LOCK_EX)) throw new RuntimeException('Rate lock unavailable');
    $last = (int) stream_get_contents($lock);
    if (time() - $last < 60) {
        header('Retry-After: 60');
        respond(429, 'Please wait a minute before sending another request.');
    }
    ftruncate($lock, 0); rewind($lock); fwrite($lock, (string) time());
    flock($lock, LOCK_UN); fclose($lock);
    require __DIR__ . '/lib/PHPMailer/Exception.php';
    require __DIR__ . '/lib/PHPMailer/PHPMailer.php';
    require __DIR__ . '/lib/PHPMailer/SMTP.php';
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'mail.spacemail.com';
    $mail->Port = 465;
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
    $mail->SMTPAuth = true;
    $mail->Username = $config['username'];
    $mail->Password = $config['password'];
    $mail->Timeout = 15;
    $mail->CharSet = 'UTF-8';
    $mail->setFrom($config['username'], 'Vaniga Packaging Website');
    $mail->addAddress('info@vanigapackaging.com');
    if ($email !== '') $mail->addReplyTo($email, $name);
    $mail->Subject = 'New quote request - Vaniga Packaging';
    $mail->Body = implode("\n\n", array_map(static fn($key, $value) => $key . ': ' . ($value ?: 'Not specified'), array_keys($details), $details));
    $mail->send();
    respond(200, 'Thanks — your request has been sent. We will reply by phone or email.');
} catch (Throwable $error) {
    // Do not expose SMTP credentials, customer details or server errors in responses.
    error_log('Vaniga quote delivery failed: ' . get_class($error));
    respond(503, 'We could not send your request. Please try again later, or call +91-789-283-8275.');
}
