# Fuente de Vida Ministerio de Fuego Int'l, City of Goshen

Static multilingual website (Spanish, English, French) deployed on GitHub Pages.

## Project structure

```
/
├── index.html              # Home page
├── CNAME                   # Custom domain (GitHub Pages)
├── package.json            # Dev tooling scripts
│
├── assets/                 # All runtime static assets
│   ├── css/
│   │   └── main.css        # Global stylesheet
│   ├── js/
│   │   └── main.js         # Shared client logic (i18n, nav, UI)
│   ├── images/             # Photos, logos, branch flyers, flags
│   │   └── flags/
│   └── locales/            # Translation JSON (es, en, fr)
│
├── pages/                  # Site sub-pages
│   ├── conocenos.html
│   ├── contacto.html
│   ├── miembro.html
│   ├── proximos_programas.html
│   ├── ramas.html
│   ├── redes_sociales.html
│   └── testimonio.html
│
└── scripts/                # Maintenance / optimization tools
    ├── sync-locales.js
    ├── optimize-images.js
    ├── optimize-logo.ps1
    ├── update-page-heads.js
    └── update-logos.js
```

## Path conventions

| From | CSS / JS / images | Other pages |
|------|-------------------|-------------|
| `index.html` | `assets/...` | `pages/<page>.html` |
| `pages/*.html` | `../assets/...` | sibling `<page>.html` |

## Development scripts

```bash
npm run i18n:sync        # Rebuild locale JSON from HTML source text
npm run optimize:images  # Compress gallery and branch images
npm run optimize:logo    # Resize logo.png
npm run optimize:heads   # Normalize page <head> blocks
```

## Local preview

Serve the project root with any static file server, for example:

```bash
npx serve .
```

Then open `http://localhost:3000`.
