# Structure

```text
elaris-admin/
├── src/                    # Admin application (Vite + React + TypeScript)
│   ├── pages/
│   ├── components/
│   ├── api/
│   ├── auth/
│   ├── types/
│   └── styles/
├── docs/                   # All ElAris documentation (system of record)
│   ├── product/
│   ├── engineering/
│   │   ├── architecture.md
│   │   ├── frontend.md          # Cross-client frontend overview
│   │   ├── admin-developer-guide.md
│   │   ├── adr/
│   │   └── backend/             # Auth, logging, middleware, future features
│   ├── operations/
│   ├── legal-safety/
│   ├── sensitive/
│   └── design/
├── package.json
└── README.md
```

Product-wide documents live only under `docs/` in this repository. Other repos keep short repo-local docs and point here for specs.
