# Cloudflare Worker: GitHub OAuth CORS Proxy

This worker proxies GitHub OAuth Device Flow requests, adding CORS headers so the browser-based upload form can authenticate users.

## Setup Instructions

### 1. Create a Cloudflare Account

Go to [cloudflare.com](https://cloudflare.com) and sign up (free).

### 2. Create a Worker

1. Go to **Workers & Pages** in the Cloudflare dashboard
2. Click **Create application** → **Create Worker**
3. Give it a name (e.g., `github-oauth-proxy`)
4. Click **Deploy**

### 3. Add the Code

1. Click **Edit code**
2. Replace the default code with the contents of `worker.js`
3. Click **Save and deploy**

### 4. Update Allowed Origins (Optional)

In `worker.js`, update the `ALLOWED_ORIGINS` array if your GitHub Pages URL is different:

```javascript
const ALLOWED_ORIGINS = [
  'https://department-of-veterans-affairs.github.io',
  'https://your-custom-domain.com',
  // Add your testing URLs here
];
```

### 5. Get Your Worker URL

After deploying, your worker URL will be something like:
```
https://github-oauth-proxy.your-subdomain.workers.dev
```

### 6. Update the Upload Form

In `docs/index.html`, replace `YOUR_CLOUDFLARE_WORKER_URL` with your worker URL:

```javascript
const WORKER_URL = 'https://github-oauth-proxy.your-subdomain.workers.dev';
```

## Endpoints

| Endpoint | Purpose |
|----------|---------|
| `POST /device/code` | Initiates Device Flow, returns user code |
| `POST /access_token` | Exchanges device code for access token |

## Security Notes

- The worker only proxies to GitHub's OAuth endpoints
- CORS is restricted to allowed origins
- No secrets are stored in the worker
- The Client ID is public (safe to expose)

## Free Tier Limits

Cloudflare Workers free tier includes:
- 100,000 requests/day
- 10ms CPU time per request

This is more than sufficient for this use case.
