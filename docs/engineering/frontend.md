# Frontend overview (Aynera clients)

Guide for developers working on **any Aynera frontend**. Product specs stay under [`../product/`](../product/). Design under [`../design/`](../design/). Backend contracts: `aynera-api/docs/api-reference.md`.

---

## Client map

| Repo | Audience | Stack (intended) | Status |
|------|----------|------------------|--------|
| **`aynera-web`** | Public visitors | Next.js App Router, React, TypeScript, static export | Active marketing site |
| **`aynera-admin`** | Admins | React + TypeScript (Vite) | Login, inboxes, cities catalog, members, admin management |
| **`aynera-app`** | Members (mobile) | Expo / React Native | Scaffold pending |

Each repo keeps **repo-local** docs (`docs/setup.md`, `docs/structure.md`, developer guide). This file is the **cross-client** overview.

| Client | Local developer guide |
|--------|------------------------|
| Web | `aynera-web/docs/developer-guide.md` |
| Admin | [admin-developer-guide.md](./admin-developer-guide.md) |
| App | `aynera-app/docs/developer-guide.md` |

---

## Shared rules for all clients

1. **API is the contract** — use `aynera-api/docs/api-reference.md`. Do not invent field names or auth flows.
2. **Envelope** — JSON APIs return `ApiResponse<T>` (`success`, `data`, `statusCode`, `errorCode`, `errors`, `correlationId`).
3. **Auth (members)** — phone or email with OTP or password → access JWT (1 hour, `aud=member`) + refresh token (90 days); refresh rotation; `Authorization: Bearer {accessToken}` on protected routes.
4. **Auth (admin)** — `POST /auth/admin/password` or `/auth/admin/otp/request` + `/auth/admin/otp/verify` → access JWT (1 hour, `aud=admin`) + refresh token (24 hours). Refresh/logout on `/auth/refresh` and `/auth/logout`.
5. **Correlation** — send `X-Correlation-Id` when calling the API so logs can align.
6. **CORS** — local origins commonly `3000` (web), `5173` / `5174` (Vite admin). Configure production origins in API `Aynera:Cors:Origins`.
7. **Secrets** — never commit API signing keys, production DB strings, or SMS credentials in frontend repos.
8. **Docs** — product/ops/design changes go in `aynera-admin/docs`; implementation notes stay in each app’s `docs/`.

---

## Suggested frontend layering (admin & app)

When building interactive apps (admin / mobile), prefer:

```text
UI screens / components
  → feature hooks or services
    → API client (typed fetch/axios wrapper)
      → aynera-api
```

| Layer | Owns |
|-------|------|
| **Screens / pages** | Layout, forms, navigation |
| **Feature modules** | Domain UX for one area (auth, members, …) |
| **API client** | Base URL, auth header, envelope unwrap, error mapping |
| **Types** | Mirror API DTOs (or generate later); keep in sync with API reference |

Keep tokens in secure storage appropriate to the platform (httpOnly cookie or memory + refresh for web apps once product decides; secure store on mobile).

---

## Auth UX (member clients)

```text
Enter phone → request OTP → enter code → verify → store tokens → call /auth/me
```

- Dev OTP appears in the **API console** until a real SMS provider is wired.
- On `401` from refresh reuse/expiry, clear session and return to login.
- Web member product is the **app**, not `aynera-web`. Marketing stays public.

Admin auth: `POST /auth/admin/password` or `/auth/admin/otp/request` + `/auth/admin/otp/verify` → access JWT (1 hour, `aud=admin`) + refresh token (24 hours). Current admin: `GET /users/admins/me`. Refresh/logout on `/auth/refresh` and `/auth/logout`.

---

## Where to read next

| Need | Doc |
|------|-----|
| Architecture | [architecture.md](./architecture.md) |
| Auth backend plan | [backend/auth/plan.md](./backend/auth/plan.md) |
| Middleware / headers | [backend/middleware.md](./backend/middleware.md) |
| Web MVP screens | [../product/WEB-MVP-SCREEN-MAP.md](../product/WEB-MVP-SCREEN-MAP.md) |
| Website design | [../design/WEBSITE-OVERVIEW.md](../design/WEBSITE-OVERVIEW.md) |
| API endpoints | `aynera-api/docs/api-reference.md` |
| Backend onboarding | `aynera-api/docs/developer-guide.md` |
