# Spacemail quote delivery

Requires PHP 8.2+ and OpenSSL. SMTP uses mail.spacemail.com:465 with certificate verification enabled. PHPMailer 7.1.1 is bundled under public/api/lib/PHPMailer with its license.

1. Build with `npm run build` and upload the contents of dist/ to the website document root. This includes api/quote.php and api/lib/PHPMailer/.
2. Copy deployment/vaniga-quote-config.example.php to a file named vaniga-quote-config.php ONE directory above the document root. For public_html/api/quote.php, this is alongside public_html, outside it.
3. Privately enter the full Spacemail mailbox username and mailbox password in that file. Restrict file access to the hosting account (0600). Do not upload the configuration inside the public document root.
4. Confirm SMTP access is enabled for the mailbox. If outbound port 465 is blocked, review Spaceship Outgoing port management with support.
5. Submit a clearly labelled test quote on https://vanigapackaging.com. Check that the form reports success and the email arrives at info@vanigapackaging.com (including Spam). Test Reply to confirm it addresses the visitor when an email is supplied.
6. Test missing required fields, invalid email and repeated submissions. The handler limits each IP to one request per minute. Rate-limit timestamps are stored outside the document root in vaniga-quote-rate; old files may be periodically deleted by the hosting account.

The Astro development/preview server does not execute PHP. Test email delivery on PHP hosting. Before SMTP configuration is supplied the handler returns a clear unavailable response. SMTP acceptance does not guarantee inbox delivery; always confirm receipt.

No customer quote contents or SMTP credentials are written to application logs. SMTP failures log only the exception class; use server-side diagnostics privately if troubleshooting is necessary.
