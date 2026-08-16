# Authentication plan

ADR: [002-auth-identity-hybrid](../../adr/002-auth-identity-hybrid.md). Models: [models.md](./models.md). Product: FR-01 in [WEB-MVP-PRODUCT-SPEC](../../../product/WEB-MVP-PRODUCT-SPEC.md).

## Approach

**ASP.NET Core Identity as the user/security store, not as the login product.**

| Approach | Fit |
|----------|-----|
| **Identity + custom Auth + JWT + Redis OTP** (chosen) | Phone OTP members, admin password later, one Identity store, two audiences |
| Fully custom Account entity | Reimplements lockout, stamp, MFA, email confirmation, roles |
| External IdP | Premature for +91 OTP-first UX and Together step-up |

Do **not** use `MapIdentityApi` or Identity UI. Use `AddIdentityCore` + EF stores + custom `/auth/*` endpoints that mint signed JWTs.

## Layering

House style: **Controller → Service → Repository → Database** (see [architecture.md](../../architecture.md)).

| Layer | Owns |
|-------|------|
| **Domain** | Account id / lifecycle concepts — no `IdentityUser` / `UserManager` |
| **Application/Features/Auth** | `AuthService` + repository interfaces; uses Domain DTOs |
| **Persistence** | `AppUser`, `RefreshSession`, `ElarisDbContext`, migrations |
| **Infrastructure** | Repository implementations, Redis OTP, JWT signer, SMS adapter |
| **Api** | `AuthController` → `AuthService`; JWT Bearer; policies |

```text
Clients
  → AuthController
  → AuthService
  → Repositories
  → Persistence (Postgres / Identity) + Redis (OTP)
```

## Locked decisions

- **Platforms:** Members use the app only (`elaris-app`). Admins use the admin site only (`elaris-admin`). Marketing (`elaris-web`) is public. One person who wants both products registers two accounts.
- **Members (app door):** +91 phone as primary id (`UserName` = E.164). Login identifier is **phone or email**. Proof is **OTP or password**. OTP in **Redis** (hashed, TTL, attempt limits; keys `otp:phone:{e164}` and `otp:email:{normalized}`). JWT `aud=member`, role `member`. Admin accounts are rejected as `user_not_found`.
- **Admins (admin door):** `AdminController` at `/admin/*`. Role `admin`, JWT `aud=admin`. Login: `POST /admin/otp/request`, `POST /admin/otp/verify`, `POST /admin/password`. Current admin: `GET /admin/me` (live `IsSuperAdmin` from the database). Members: `GET /admin/members` (any admin, paged, newest first), `GET /admin/members/{id}` (profile + media metadata; bytes on nested photo/video paths), and `POST /admin/members/{id}/restrict|unrestrict` (super-admin only; independent of member self-deactivate). First admin is seeded from `ELARIS_ADMIN_EMAIL` / `ELARIS_ADMIN_PASSWORD` (optional phone) and is the super-admin. `IsSuperAdmin` is a bool on `AppUser` (not a role). Additional admins created via `POST /admin/admins` are never super-admins. Super-admins list, create, deactivate, and reactivate admins (`GET/POST /admin/admins`, `POST /admin/admins/{id}/deactivate|activate`). Authorization for those writes uses the database flag (the JWT `is_super_admin` claim is informational and can be stale).
- **Email:** Identity email confirmation link (REG-06).
- **Tokens:** access JWT **1 hour** (both products). Member refresh **90 days**. Admin refresh **24 hours**. Opaque refresh hashed in Postgres, rotated, audience-bound. Claims: `sub`, `aud`, `role`, `amr`, `auth_time`, `sid`, `jti`. Admin access tokens also include `is_super_admin` (informational; write checks use the database).
- **Audiences:** `member`, `admin` — one issuer (`ELARIS_JWT_ISSUER`). Policies require matching role **and** audience.
- **Schema:** EF Core code-first migrations. Empty Postgres DB only; no hand-built app tables.
- **Local deps:** PostgreSQL + Redis (`ELARIS_DB_CONNECTION`, `ELARIS_REDIS`). Dev SMS = console sink until a real provider.

## First implementation slice

Member-web phone OTP path (replace WeatherForecast scaffolding).

1. Packages and DI: EF Core + Npgsql, Identity Core, JWT Bearer, StackExchange.Redis; bind `ELARIS_*`.
2. `AppUser`, `ElarisDbContext`, migration, `AddIdentityCore` + roles + EF stores + token providers (no Identity UI).
3. Redis OTP store: code hash, TTL (~5 min), max attempts, per-phone/IP rate limits.
4. Endpoints:
   - `POST /auth/member/otp/request`
   - `POST /auth/verifysms` → access + refresh (`aud=member`)
   - `POST /auth/token/refresh`
   - `POST /auth/logout`
   - `GET /auth/me` (authorized)
5. JWT Bearer + `Member` policy; CorrelationId + ExceptionHandling middleware ([../middleware.md](../middleware.md)).
6. Tests: OTP verify / rate-limit; integration request → verify → `/auth/me`.

**Deferred:** optional app-lock PIN, MFA, Together step-up (`auth_time` claim shape reserved now), email invite for admins.

## Out of scope for this slice

Liveness/ID verification, member profile domain, admin portal UI, real SMS vendor, OAuth, full `POST /logs` feature ([../logging/plan.md](../logging/plan.md)).
