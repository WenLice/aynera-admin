# aynera-admin — developer guide (frontend)

Onboarding for the **admin panel** UI. This repository is also the **system of record for all Aynera documentation** under `docs/`.

| Doc | Use when |
|-----|----------|
| [../README.md](../README.md) | Docs index |
| [../structure.md](../structure.md) | Repo + docs tree |
| [frontend.md](./frontend.md) | Cross-client frontend overview |
| Product specs | [../product/](../product/) |
| Backend plans | [backend/](./backend/) |
| API contract | `aynera-api/docs/api-reference.md` |

---

## What this project is

| | |
|--|--|
| **Product** | Admin tools for Aynera (`admin.aynera.com`) |
| **Docs** | Product, engineering, operations, design, sensitive notes |
| **UI status** | Vite + React + TypeScript under `src/`: login, inboxes, cities catalog, members, admin management |

---

## Layout

```text
aynera-admin/
├── src/
│   ├── pages/           # Login, home, waitlist, cities, members, suggestions, feedback, admins
│   ├── components/      # Shell and auth gate
│   ├── api/             # Envelope client + endpoint wrappers
│   ├── auth/            # sessionStorage tokens + AuthProvider
│   ├── types/           # DTO mirrors from the API reference
│   └── styles/          # Admin design tokens / shell
├── docs/
├── package.json
└── README.md
```

---

## Local start

```bash
npm install
npm run dev
```

Typical local ports: **5173** (dev) / **5174** (preview). API CORS already allows these. See [../setup.md](../setup.md).

Tokens live in `sessionStorage` for this slice (cleared when the tab closes). Access tokens are refreshed via `POST /auth/refresh` on 401. Login supports password and OTP. Any admin can manage early-access cities and list/search members at `/members` (`search`, `isActive`, `isRestricted`). Super-admins can create, list, deactivate, and reactivate admins.

---

## Working with the API

- Base contract: **`aynera-api/docs/api-reference.md`**
- Admin login: `POST /auth/admin/otp/request`, `POST /auth/admin/otp/verify`, `POST /auth/admin/password`. After login: `GET /users/admins/me`. Cities: `GET/POST/PATCH/DELETE /early-access/cities`. Members: `GET /users`, `GET /users/{id}` (photos/video bytes on nested paths). Restricted members: `/restricted` (`isRestricted=true`). Super-admins restrict/unrestrict members and manage admins at `/admins`. Detail panes (not list pages) split **details | audit trail**: member detail loads `GET /audit/events?memberId=`; city edit loads `?subjectType=early_access_city&subjectId=`. With a subject, all actions for that subject are returned; without a subject, the API defaults to restrict/unrestrict. Refresh/logout stay on `/auth/refresh` and `/auth/logout`. Seed the first admin with `AYNERA_ADMIN_EMAIL` / `AYNERA_ADMIN_PASSWORD`; that account is the super-admin. Inboxes are paged (`page`, `pageSize` default 15, max 50): `GET /early-access/signups`, `GET /suggestions`, `GET /feedback`, `GET /users`. See [backend/auth/plan.md](./backend/auth/plan.md).
- Always unwrap `ApiResponse<T>`; surface `errorCode` / `errors` to admins where useful.
- Send `X-Correlation-Id` on mutating or support-sensitive calls.

---

## Documentation rules

1. Product and engineering plans live **only** under `aynera-admin/docs` (not duplicated as long prose in other repos).
2. Other repos keep short setup / structure / developer guides and link here.
3. Do not put secrets in docs or frontend env committed to git.
4. When an API changes, update `aynera-api/docs/api-reference.md` and any admin `src/api` wrappers together.

---

## Related repos

| Repo | Role |
|------|------|
| `aynera-api` | Backend |
| `aynera-web` | Marketing site |
| `aynera-app` | Member mobile |
