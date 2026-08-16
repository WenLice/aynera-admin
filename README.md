# elaris-admin

Admin panel for ElAris (`admin.elaris.com`) and the **system of record for all documentation**.

## Layout

| Path | Purpose |
|------|---------|
| `src/` | Admin application (Vite + React + TypeScript) |
| `docs/` | All product, engineering, operations, and sensitive documents |

## Docs index

See [docs/README.md](./docs/README.md) and [docs/structure.md](./docs/structure.md).

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173. API default is `http://localhost:5057` (`VITE_ELARIS_API_BASE_URL`). See [docs/setup.md](./docs/setup.md) and [docs/engineering/admin-developer-guide.md](./docs/engineering/admin-developer-guide.md).
