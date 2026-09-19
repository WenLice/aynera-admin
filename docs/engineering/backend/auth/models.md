# Authentication models

Auth owns identity and sessions only. Member profile, city, path (Core/Professionals), and status are product domain models keyed by `AppUser.Id` later — not part of this set.

Code-first EF Core creates Postgres tables. OTP challenges live in Redis (not EF).

## Entity overview

```text
AppUser 1──1 MemberProfile
AppUser 1──* RefreshSession
AppUser *──* IdentityRole (via AspNetUserRoles)
AppUser 1──* IdentityUserClaim
```

## 1. `AppUser` (Postgres / ASP.NET Identity)

Extends `IdentityUser<Guid>`. Infrastructure only.

| Field | Type | Notes |
|-------|------|--------|
| `Id` | `Guid` | PK; JWT `sub` |
| `UserName` | `string` | Members: E.164 (`+91…`). Admins: email |
| `NormalizedUserName` | `string` | Identity lookup |
| `Email` | `string?` | After REG-06; unique when present |
| `NormalizedEmail` | `string?` | |
| `EmailConfirmed` | `bool` | Verification-link result |
| `PasswordHash` | `string?` | Null until a password is set (member and admin password login are later slices) |
| `PhoneNumber` | `string?` | Same E.164 as `UserName` for members |
| `PhoneNumberConfirmed` | `bool` | True after successful OTP verify |
| `SecurityStamp` | `string` | Global session invalidate |
| `ConcurrencyStamp` | `string` | EF concurrency |
| `TwoFactorEnabled` | `bool` | Later MFA; false in current slices |
| `LockoutEnd` / `LockoutEnabled` / `AccessFailedCount` | Identity | Brute-force / abuse |
| `AccountKind` | enum-backed string | `Member` \| `Admin` |
| `IsSuperAdmin` | `bool` | Super-admin rights for admins; always `false` for members. Not a role. Set in the database (not seeded, no promote/demote API) |
| `IsActive` | `bool` | `false` = member self-deactivated (must activate; cannot re-register). Via `IActivatable` |
| `DeactivatedAtUtc` | `DateTimeOffset?` | When the account was last deactivated; cleared on activate |
| `IsRestricted` | `bool` | `true` = restricted by super-admin; blocks sign-in until unrestricted |
| `RestrictedAtUtc` | `DateTimeOffset?` | When the account was last restricted; cleared on unrestrict |
| `IsDeleted` | `bool` | Soft delete; excluded from normal queries. Via `ISoftDeletable` |
| `DeletedAtUtc` | `DateTimeOffset?` | Set when soft-deleted |
| `DeletedPhoneE164` | `string?` | Phone snapshot after delete (login fields renamed to free uniqueness) |
| `CreatedAtUtc` | `DateTimeOffset` | |
| `LastLoginAtUtc` | `DateTimeOffset?` | |

**Not on `AppUser`:** display name, DOB, city, Core/Professionals path, member status, liveness.

Stock Identity tables (first slice, no custom columns): `AspNetRoles`, `AspNetUserRoles`, `AspNetUserClaims`, `AspNetUserLogins`, `AspNetUserTokens`, `AspNetRoleClaims`.

## 2. Roles (seeded)

| Role name | Who | Purpose |
|-----------|-----|---------|
| `member` | Member accounts | App JWT + Member policy (`aud=member`) |
| `admin` | Admin portal users | Admin JWT + Admin policy (`aud=admin`) |

Seeds `member` and `admin`. Member product status is **domain**, not an Identity role. Super-admin rights use `IsSuperAdmin`, not a second role.

## 3. `RefreshSession` (Postgres)

Opaque refresh tokens; store hash only.

| Field | Type | Notes |
|-------|------|--------|
| `Id` | `Guid` | Session id (`sid`) |
| `UserId` | `Guid` | FK → `AppUser` |
| `Audience` | `string` | `member` \| `admin` |
| `TokenHash` | `string` | SHA-256 of refresh token |
| `FamilyId` | `Guid` | Rotation family; reuse revokes family |
| `DeviceLabel` | `string?` | Optional |
| `CreatedAtUtc` | `DateTimeOffset` | |
| `ExpiresAtUtc` | `DateTimeOffset` | 90 days member; 24 hours admin |
| `RevokedAtUtc` | `DateTimeOffset?` | Logout / security revoke |
| `ReplacedAtUtc` | `DateTimeOffset?` | On rotation |
| `ReplacedBySessionId` | `Guid?` | Next session in family |

## 4. `OtpChallenge` (Redis)

Not an EF entity. Key: `otp:phone:{e164}` (plus rate-limit keys `otp:rl:phone:{e164}`, `otp:rl:ip:{ip}`).

| Field | Type | Notes |
|-------|------|--------|
| `PhoneE164` | `string` | |
| `CodeHash` | `string` | Never store plaintext OTP |
| `Attempts` | `int` | Lock after max |
| `ExpiresAtUtc` | `DateTimeOffset` | ~5 minutes (Redis TTL) |
| `Purpose` | `string` | `login` \| later `step_up` |
| `Audience` | `string` | Token audience after verify |

## 5. Access token claims (JWT)

| Claim | Example | Notes |
|-------|---------|--------|
| `iss` | `aynera-api` | `AYNERA_JWT_ISSUER` |
| `aud` | `member` | `member` for the app; `admin` for the admin site |
| `sub` | user Guid | `AppUser.Id` |
| `sid` | session Guid | Refresh session |
| `role` | `member` | `member` or `admin` |
| `is_super_admin` | `true` / `false` | Admin tokens only. Informational; `POST /users/admins` reads the database flag |
| `amr` | `otp` or `pwd` | Later `mfa` |
| `auth_time` | unix seconds | Together step-up later |
| `jti` | unique id | Access token id |
| `exp` / `iat` | | Access token 1 hour |

## 6. API contracts (first slice)

**RequestMemberOtpRequest** — `Identifier` (Indian mobile normalized to `+91…`, or email lowercased)

**RequestMemberOtpResponse** — `ExpiresInSeconds`, `RetryAfterSeconds?`

**VerifyMemberOtpRequest** — `Identifier`, `Code`, `Audience` (default `member`)

**MemberPasswordLoginRequest** — `Identifier`, `Password`

**SetMemberPasswordRequest** — `Password`, `CurrentPassword?`

**RequestAdminOtpRequest** — `Identifier` (Indian mobile or email)

**VerifyAdminOtpRequest** — `Identifier`, `Code`

**AdminPasswordLoginRequest** — `Identifier`, `Password`

**CreateAdminRequest** — `Email`, `Password`, `Phone?`

**TokenResponse** — `AccessToken`, `RefreshToken`, `TokenType` (`Bearer`), `ExpiresInSeconds`, `Account` (`AuthAccountDto`)

**RefreshTokenRequest** / **LogoutRequest** — `RefreshToken`

**AuthAccountDto** — `Id`, `Phone`, `PhoneConfirmed`, `Email`, `EmailConfirmed`, `AccountKind`, `IsActive`, `IsDeleted`, `IsSuperAdmin`, `IsRestricted`, `Roles`, `Profile?` (`MemberProfileDto`)

Profile lives on `MemberProfiles` (not `AppUser`): first/last name, gender, date of birth, city, optional religion. Soft-deleted with the account.

## 7. Domain

First slice may use bare `Guid` as account id. Optional later: `AccountId` value object in Domain without referencing Identity.

## 8. Models (config)

Application auth models under `Features/Auth/Models` (bound from configuration).

**JwtOptions** — `Issuer`, `SigningKey`, `AccessTokenLifetimeMinutes`, audience names, refresh lifetimes per audience.

**OtpOptions** — `CodeLength` (6), `TtlSeconds` (300), `MaxAttempts` (5), per-identifier/IP hourly caps (`MaxRequestsPerPhonePerHour` applies to phone **and** email).

**AccessTokenResult** / **IssuedRefreshToken** — token-service result shapes (not HTTP DTOs).

## Related logging models

`AuditEvents` and `AppLogs` are documented under [../logging/plan.md](../logging/plan.md); they are not Identity entities but share `correlationId` / user id with auth flows.
