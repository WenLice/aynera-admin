# API middleware pipeline

Applies to `elaris-api`. Keep custom middleware thin; business rules stay in Application features.

## Order (outer → inner)

```text
HTTP request
  → CorrelationIdMiddleware
    → ExceptionHandlingMiddleware
    → HTTPS redirection
    → CORS
    → Authentication (JWT Bearer)
    → CurrentUserMiddleware (sets request-scoped ICurrentUser.UserId from JWT)
    → Authorization
    → RequestLoggingMiddleware (AuditLogs: method/path/status/duration)
    → Endpoints (/auth/*, …)
```

## Middleware

| Middleware | Type | Role |
|------------|------|------|
| **CorrelationId** | Custom | Read or generate `X-Correlation-Id`. Store in request scope (`ICorrelationId`) so `AuditLogs`, `AuditEvents`, and clients share one id. |
| **ExceptionHandling** | Custom | Catch unhandled domain/infra errors → `ApiResponse` JSON (`errorCode` + `statusCode`). No stack traces in Production. |
| **HTTPS redirection** | Built-in | |
| **CORS** | Built-in | Allow configured `elaris-web` / `elaris-admin` origins. |
| **Authentication** | Built-in JWT Bearer | Validate access token (`iss`, `aud`, `exp`, signature). |
| **CurrentUser** | Custom | After auth, set request-scoped `ICurrentUser.UserId` from `NameIdentifier` / `sub`. Inject `ICurrentUser` in controllers/services. |
| **Authorization** | Built-in | Policies: `Member`, `Admin`, later `RecentAuth`. |
| **RequestLogging** | Custom | One `AuditLogs` row per request: method, path, status, duration, user id if present. Skip health/swagger. No bodies or tokens. |

## Not middleware

| Concern | Where it lives |
|---------|----------------|
| OTP rate limits | Redis inside Auth handlers |
| Audit writes | Explicit `IAuditWriter` in use cases (`AuditEvents` + parent `AuditLogs`) |
| Request / ops logs | `IAuditLogWriter` / RequestLogging → `AuditLogs` (+ Seq via Serilog) |
| Identity user store | `UserManager` / Infrastructure |
| Refresh token rotation | Auth Application feature |

## Rollout

| Slice | Include |
|-------|---------|
| First auth | CorrelationId, ExceptionHandling, JWT Authentication + Authorization |
| Logging / audit | RequestLogging → AuditLogs; IAuditWriter → AuditEvents; Serilog → Console (+ Seq); Warning+ → AuditLogs via sink; DiagnosticLoggingFilter on actions |


Clients should send `X-Correlation-Id` on API calls and when posting to `/logs`.

Related: [logging/plan.md](./logging/plan.md), [auth/plan.md](./auth/plan.md).
