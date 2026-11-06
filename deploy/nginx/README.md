# nginx config for deepsocal.com

Production nginx config for the EC2 server (`deepsocal-web`, 3.143.107.20). The source of truth is this folder. The server copy lives under `/etc/nginx/`:

| Repo file | Server path |
|---|---|
| `sites-available/deepsocal` | `/etc/nginx/sites-available/deepsocal` (symlinked into `sites-enabled/`) |
| `conf.d/deepsocal.conf` | `/etc/nginx/conf.d/deepsocal.conf` |
| `snippets/deepsocal-*.conf` | `/etc/nginx/snippets/` |

To apply a change:

1. Copy the files to the server.
2. Run `sudo nginx -t`.
3. Run `sudo systemctl reload nginx`.
4. Check the response headers with `curl -sI https://deepsocal.com/`.

What it does:
- `/api/` is rate-limited to 5 requests/min per IP, with a 32 KB body limit.
- Security headers go on every response.
- `/images/*` and `/videos/*` are cached by browsers for 7 days; only 2xx/304 responses, so errors aren't cached.
- `/studio` can be framed by `*.sanity.io`.
- HTTP, `www` and the bare IP all redirect to `https://deepsocal.com`.
- The ACME webroot (`/var/www/certbot`) is used for certificate renewals.
