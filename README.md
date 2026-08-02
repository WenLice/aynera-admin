# elaris-admin

Staff admin panel for ElAris (`admin.elaris.com`) and **system of record for all documentation**.

## App

React + Vite SPA — applicant review, curator workspace, cohorts, safety.

```text
src/
  pages/
  components/
  api/
  auth/          # staff JWT + TOTP
  types/
```

## Docs (all documents live here)

```text
docs/
  product/           # Specs, matchmaking, screen maps, build order
  engineering/       # Architecture, ADRs, API notes
  operations/        # Cohort / safety runbooks
  legal-safety/      # Internal policy notes
  sensitive/         # Rubrics, admission guides (private repo)
  design/            # Design briefs, tokens, examples
```

## Auth

Staff: email + password + TOTP. JWT audience `staff`.

## Next

```bash
npm create vite@latest . -- --template react-ts
```
