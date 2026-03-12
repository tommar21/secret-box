# 🔐 SecretBox

Secure environment variables management with end-to-end encryption. Your secrets never leave your browser unencrypted.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/tommar21/secret-box)

**[Live Demo →](https://mysecretbox.vercel.app)**

## Why SecretBox?

Sharing `.env` files over Slack, email, or plaintext docs is a security nightmare. SecretBox fixes this:

- **🔒 End-to-end encrypted** — Secrets are encrypted in your browser before hitting the server. We literally can't read them.
- **👥 Team sharing** — Invite team members, manage roles, share environments securely.
- **📁 Project-based** — Organize variables by project and environment (dev, staging, prod).
- **🌍 Global variables** — Share common vars across all projects.
- **🔑 Two-password system** — Account password for login, master password for encryption. Even if the database leaks, your secrets are safe.
- **🛡️ 2FA support** — TOTP-based two-factor authentication with backup codes.

## Features

- **Projects & Environments** — Create projects, add dev/staging/prod environments, manage variables per environment.
- **Global Variables** — Define variables shared across all projects.
- **Teams** — Create teams, invite members via email, assign roles (admin/member).
- **API Tokens** — Generate tokens for CI/CD integration.
- **Activity Log** — Track who changed what and when.
- **Rate Limiting** — Upstash Redis-powered rate limiting on all endpoints.
- **Dark Mode** — Because we're not savages.

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| Database | Neon (PostgreSQL serverless) |
| ORM | Prisma 6 |
| Auth | NextAuth v5 (credentials + GitHub OAuth) |
| Encryption | Web Crypto API (AES-256-GCM, PBKDF2) |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| Animations | Framer Motion |
| Rate Limiting | Upstash Redis |

## How Encryption Works

```
Master Password
      ↓
   PBKDF2 (100k iterations, SHA-256)
      ↓
  Derived Key (AES-256)
      ↓
  AES-256-GCM encrypt/decrypt
      ↓
  Encrypted blob → stored in DB
```

1. You set a **master password** (separate from your login password)
2. The master password derives a cryptographic key using **PBKDF2** with 100,000 iterations
3. All secrets are encrypted with **AES-256-GCM** in your browser
4. Only the encrypted blob is sent to the server
5. The master password is **never stored** anywhere — not even hashed

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) database (free tier works)
- (Optional) [Upstash Redis](https://upstash.com) for rate limiting

### Setup

```bash
# Clone
git clone https://github.com/tommar21/secret-box.git
cd secret-box

# Install
npm install

# Configure
cp .env.example .env
# Edit .env with your database URL and auth secret

# Setup database
npx prisma db push

# Run
npm run dev
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | Neon PostgreSQL connection string |
| `AUTH_SECRET` | ✅ | NextAuth secret (`openssl rand -base64 32`) |
| `AUTH_URL` | ✅ | App URL (`http://localhost:3000` for dev) |
| `GITHUB_CLIENT_ID` | ❌ | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | ❌ | GitHub OAuth app client secret |
| `UPSTASH_REDIS_REST_URL` | ❌ | Upstash Redis URL (for rate limiting) |
| `UPSTASH_REDIS_REST_TOKEN` | ❌ | Upstash Redis token |

## Deployment

One-click deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/tommar21/secret-box)

Or manually:

```bash
npm run build
npm start
```

## Security

- All encryption happens client-side using the Web Crypto API
- Master passwords are never transmitted or stored
- PBKDF2 with 100,000 iterations for key derivation
- AES-256-GCM for authenticated encryption
- Rate limiting on all API endpoints
- CSRF protection via NextAuth
- Input validation and sanitization

If you find a security vulnerability, please email [tomimartinez6666@gmail.com](mailto:tomimartinez6666@gmail.com) instead of opening a public issue.

## License

MIT — see [LICENSE](LICENSE) for details.

## Author

Built by [@cogotemartinez](https://x.com/cogotemartinez)
