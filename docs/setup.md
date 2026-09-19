# Local setup (admin UI)

## Prerequisites

- Node.js 22+
- Running `aynera-api` on `http://localhost:5057` (Postgres + Redis for the API)

## Configure

Copy `.env.example` to `.env` if you need a non-default API host:

```bash
VITE_AYNERA_API_BASE_URL=http://localhost:5057
```

Seed an admin with `AYNERA_ADMIN_EMAIL` / `AYNERA_ADMIN_PASSWORD` on the API. That first seeded account is the super-admin.

## Run

```bash
npm install
npm run dev
```

The app listens on **http://localhost:5173**. API CORS already allows `5173` / `5174`.

After login: Home, Waitlist, Members (`GET /users`), Cities, Suggestions, Feedback. Super-admins also see Admins.

Sign in with `POST /auth/admin/password` (email or phone + password). The session is kept in `sessionStorage` and restored via `GET /users/admins/me`. Refresh/logout use `/auth/refresh` and `/auth/logout`.
