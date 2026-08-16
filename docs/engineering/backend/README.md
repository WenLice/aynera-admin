# Backend plans (`elaris-api`)

Implementation plans for the ASP.NET Core modular monolith live here, separated by feature. Product requirements stay under [`../../product/`](../../product/). Architecture overview: [`../architecture.md`](../architecture.md). ADRs: [`../adr/`](../adr/).

| Feature | Docs |
|---------|------|
| **Auth** | [plan.md](./auth/plan.md), [models.md](./auth/models.md) |
| **Logging & audit** | [plan.md](./logging/plan.md) |
| **Middleware** | [middleware.md](./middleware.md) |

Implementation onboarding and live HTTP contracts live in the API repo:

| Doc | Path |
|-----|------|
| Developer guide | `elaris-api/docs/developer-guide.md` |
| API reference | `elaris-api/docs/api-reference.md` |

Future features add sibling folders (for example `applications/`, `profiles/`).

Code-first EF Core migrations create schema; do not hand-build application tables in Postgres.
