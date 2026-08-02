# Structure

```text
elaris-admin/
├── src/                    # Admin application code
│   ├── pages/
│   ├── components/
│   ├── api/
│   ├── auth/
│   └── types/
├── docs/                   # All ElAris documentation (system of record)
│   ├── product/
│   ├── engineering/
│   ├── operations/
│   ├── legal-safety/
│   ├── sensitive/
│   └── design/
├── package.json
└── README.md
```

Product-wide documents live only under `docs/` in this repository. Other repos keep short repo-local docs and point here for specs.
