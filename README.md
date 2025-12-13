## Frontend Practice API (Express + TypeScript)

Backend API for the platform. Secured with helmet/cors/rate limits, JWT (cookies), zod validation, and i18n (en/ar).

### Run locally

```bash
pnpm install
pnpm dev
# http://localhost:4000/health
```

### Environment (.env)

```
PORT=4000
WEB_ORIGIN=http://localhost:3000

# Database
DATABASE_URL=postgres://user:password@host:port/db

# JWT (use RS256 keys in prod)
JWT_PRIVATE_KEY=change-me
JWT_PUBLIC_KEY=change-me

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# GitHub App
GITHUB_APP_ID=
GITHUB_WEBHOOK_SECRET=
GITHUB_PRIVATE_KEY_BASE64=

# S3
AWS_REGION=
S3_BUCKET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

### Postgres provider quick-start

- Neon (serverless Postgres): free tier, great DX.
  - Create a project → get the connection string (`postgres://...`).
  - Set `DATABASE_URL` in `.env`.
- Supabase (managed Postgres + extras):
  - Create a project → Database settings → Connection string.
  - Set `DATABASE_URL` in `.env`.

Either works. For MVP, Neon is a solid default for simplicity; Supabase is great if you want built-in auth/storage later.

### S3 (assets)

Private bucket with signed URLs. If AWS is delayed, you can develop locally by stubbing S3 calls and returning placeholder signed URLs; we’ll wire real S3 when ready.

### Security

- helmet, cors (allowlist), express-rate-limit, cookie-parser
- JWT in HttpOnly, Secure cookies (SameSite=Lax), `jose` (RS256 recommended)
- zod for request validation
- Verify Stripe & GitHub webhook signatures
- No arbitrary outbound fetch; GitHub artifacts via API only

### Tests

- Unit: Vitest
- Integration: Supertest (optionally Testcontainers for Postgres later)


