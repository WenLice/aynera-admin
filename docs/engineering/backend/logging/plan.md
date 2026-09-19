# Logging and audit

## Goals

- Durable **admin audit** for security and product actions (FR-11): `AuditEvents` with optional `Changes` (old/new JSON).
- **Developer / ops logs** in Postgres (`AuditLogs`) in all environments, mirrored to **Seq** when configured.
- Shared request fields live on `AuditLogs`; `AuditEvents` references a parent log via `AuditLogId`.

## Two tables (code-first)

| Table | Audience | Role |
|-------|----------|------|
| **AuditLogs** | Developers / Seq | Normal operational lines (request log, Serilog-facing stream). Also the shared header for an audit. |
| **AuditEvents** | Admin | Action, outcome, subject, `Changes` JSON; required FK → `AuditLogs`. |

```text
AuditEvents.AuditLogId ──► AuditLogs
```

- Many `AuditLogs` have no `AuditEvent` (HTTP request logging).
- Every `AuditEvent` has exactly one parent `AuditLog`.

### `AuditEvents.Changes`

Field-level diffs (null for OTP/login/logout):

```json
{ "name": { "old": "Delhi", "new": "New Delhi" } }
```

### Sensitive data

**Exclude** (never store): OTP codes, access/refresh/email tokens, passwords, Authorization headers, media bytes, full request bodies, verify URLs.  
**Mask** phones (`+91******3210`) and emails (`a***@example.com`); prefer user ids over raw emails in metadata.  
Do **not** encrypt values inside log columns—rely on exclusion/masking + DB access control.

Console/stub SMS and email adapters must **never** log codes, links, full phones, or raw emails (even in Development).

## Writers

- `IAuditLogWriter` — insert `AuditLogs` only (`RequestLoggingMiddleware`).
- `IAuditWriter` — insert `AuditLog` + `AuditEvent` from Application use cases (best-effort; failures do not fail the business call).
- `ICorrelationId` / `ICurrentUser` stamp correlation and actor on the log row.

## Seq

Configure `Seq:ServerUrl` or `AYNERA_SEQ_URL`. Serilog writes Console + Seq for the **normal** log stream. Audit detail (`AuditEvents` / `Changes`) stays in Postgres for the admin UI.

## Diagnostic layer logging

| Layer | What to log |
|-------|-------------|
| API | `DiagnosticLoggingFilter` — every action start (Information) |
| Application services | Start / success (Information); expected domain failures (Warning) |
| Infrastructure repositories | Mutating entry (Debug); hard infra failures (Error) |

`ILogger<T>` goes to Serilog (Console + Seq). **Warning and above** are also written to `AuditLogs` by `AuditLogSerilogSink` (skips its own recursion). Do **not** call `IAuditWriter` from every log line—reserve that for intentional product/admin audit.

Never log OTP codes, tokens, passwords, Authorization headers, verify URLs, media bytes, or raw emails; mask phones when a phone must appear.

## Middleware

See [../middleware.md](../middleware.md): CorrelationId sets `ICorrelationId`; RequestLogging writes `AuditLogs` (no bodies/tokens).

## Out of scope (later)

- Richer audit row UI (actor email, field-diff viewer) on the detail rail
- Client `POST /logs` batch ingest
- Retention job for `AuditLogs`
- Media off Postgres `bytea` + account-delete compress/archive job — see `aynera-api/docs/deferred-work.md`

## Admin UI (current)

- Detail panes split **details | audit trail** (member detail; city edit). List pages stay list-only.
- `GET /audit/events` — subject-scoped with `memberId` and/or `subjectType` + `subjectId` returns all actions for that subject; without a subject, defaults to member restrict/unrestrict
- Dedicated **Restricted** list at `/restricted` (members with `isRestricted=true`)
- No standalone Audit nav page
