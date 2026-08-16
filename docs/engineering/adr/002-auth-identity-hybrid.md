# ADR 002: ASP.NET Identity hybrid authentication

## Status

Accepted

## Context

ElAris needs one identity **store** for members (phone/email OTP or password) and admins (password/OTP on a separate admin door later), two JWT audiences (`member`, `admin`), and safe session expiry with future Together step-up (FR-01). The API is a modular monolith ([ADR 001](./001-modular-monolith.md)).

Options considered:

1. ASP.NET Identity as the full login surface (`MapIdentityApi` / Identity UI)
2. Fully custom account store + JWT + Redis OTP
3. External IdP (Auth0, Clerk, Cognito, etc.)
4. **Identity as user/security store + custom Auth endpoints + JWT + Redis OTP**

## Decision

Use **option 4**.

- ASP.NET Core Identity (`AddIdentityCore`) for user persistence, lockout, security stamp, roles, email confirmation tokens, and admin password/MFA later.
- Do **not** use `MapIdentityApi` or Identity UI as the public auth API (password-shaped opaque tokens; poor multi-audience JWT fit).
- Custom Application feature endpoints for member phone/email OTP, password login/reset, admin OTP/password on `AdminController`, and token refresh/logout.
- Redis for OTP challenges and rate limits; Postgres for Identity and refresh sessions.
- Access tokens are application-issued JWTs with audience claims. Member app tokens use `aud=member`; admin site tokens use `aud=admin`. Accounts are not shared across products.

## Consequences

- Passwordless member UX fits without fighting Identity’s default login endpoints.
- Staff MFA and lockout reuse known Identity primitives.
- More Auth application/infrastructure code than an external IdP, but phone-first India UX and Together step-up stay in-product.
- Domain layer must not reference `IdentityUser` / `UserManager`; Infrastructure adapts.

See [backend/auth/plan.md](../backend/auth/plan.md) and [backend/auth/models.md](../backend/auth/models.md).
