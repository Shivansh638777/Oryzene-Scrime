# Oryzene Esports — Full Stack Site

This repository is a minimal full-stack site built with static HTML/CSS/JS and Vercel Serverless Functions for basic backend features. It's designed to match the provided scrim page theme.

Structure:

- `public/` — all frontend pages and assets
- `api/` — serverless functions (Node.js)
- `data/` — JSON storage (upgrade to DB for production)
- `vercel.json`, `.env.example`, `package.json`

Local development:

1. Copy `.env.example` to `.env` and set real secrets.
2. Install Vercel CLI (`npm i -g vercel`) and run:

```bash
vercel dev
```

Admin credentials are provided as env placeholders in `.env.example`. The admin login currently returns a simple token placeholder — replace with JWT/session logic before production.
