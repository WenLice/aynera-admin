# Architecture

Product specs: [`../product/`](../product/). Backend implementation plans: [`backend/`](./backend/). Decisions: [`adr/`](./adr/).

## Stack

- Modular monolith: `aynera-api` (ASP.NET Core) — [ADR 001](./adr/001-modular-monolith.md)
- Clients: `aynera-web`, `aynera-admin`, `aynera-app`
- Data: PostgreSQL (Identity, sessions, AuditLogs, AuditEvents), Redis (OTP, rate limits)
- Docs: this repository (`aynera-admin/docs`)

## Cross-cutting

| Topic | Doc |
|-------|-----|
| Authentication | [backend/auth/plan.md](./backend/auth/plan.md), [ADR 002](./adr/002-auth-identity-hybrid.md) |
| Auth models | [backend/auth/models.md](./backend/auth/models.md) |
| Logging and audit | [backend/logging/plan.md](./backend/logging/plan.md) |
| Middleware pipeline | [backend/middleware.md](./backend/middleware.md) |
| Frontend clients | [frontend.md](./frontend.md) |
| Admin UI guide | [admin-developer-guide.md](./admin-developer-guide.md) |
| API contract (repo) | `aynera-api/docs/api-reference.md` |
| Backend onboarding (repo) | `aynera-api/docs/developer-guide.md` |

## Application layering (house style)

```text
Controller → Service → Repository → Database
```

| Layer | Responsibility |
|-------|----------------|
| **Domain** | DTOs, enums, statics — **no** EF/Identity; **no** upward project refs |
| **Persistence** | Main entities (`AppUser`, …), `AyneraDbContext`, EF migrations |
| **Controller** | HTTP only: routes, auth policies, validation, `ApiResponse<T>` |
| **Service** | Business logic for a feature; Record → DTO via `IMapper` (Application profiles) |
| **Repository** | **One per model** — persistence for that model; Entity ↔ Record via `IMapper` (Infrastructure profiles) |

### Project references (one-way only)

```text
Domain  ←  Application
Domain  ←  Persistence
Application + Persistence  ←  Infrastructure  ←  Api
```

Never reference upward. Identity store entities and the DbContext live in **Persistence**, not Domain.

## Schema approach

EF Core **code-first** migrations own application schema. Local Postgres holds an empty `aynera` database until migrations run.
