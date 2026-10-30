# Barlow recovered-site demonstration

This is an unofficial personal archive-recovery demonstration for Barlow Medical Centre, not the practice's official website. The practice has not approved it. The real practice details are historical/source-derived, not invented testing data. Do not direct patients here or submit patient information.

The user explicitly authorised a new public `AbsurdSyssie/Barlow_site` project, Cloudflare Pages demo hosting and only the `barlow.oddtv.uk` hostname. This is a scoped exception for demonstration hosting, not official practice ownership/sign-off. The HHC checkout, repository, server, domain and deployment must not be changed.

## Build and review

```sh
npm ci
npm run lint
PRACTICE_DIR=tests/fixtures/demo-practice npm test
npm run build:demo
npm run lint:html:demo
```

Only `_preview` is a demo artifact. It contains an unconditional unofficial banner, noindex meta tags, robots exclusion and Cloudflare X-Robots-Tag headers, including the error page. Search exclusion is advisory, not authentication. `_site` remains separate. The default production checker/build intentionally fail while the genuine approval date and earnings year are missing. Invalid facts and other safety controls are not bypassed by demo mode. The original GitHub publishing workflow remains gated by production checks; GitHub Pages has not been enabled or configured for this project.

Recovered core pages can replace a restricted set of generic templates in preview only. The urgent-help partial is unchanged. This is not a production-ready practice configuration, and resolving dates alone is insufficient: all [migration questions](practice/MIGRATION-QUERIES.md), content approval, account ownership, rights and safety/accessibility review must be resolved before any official launch. Do not run an official deployment using this demo artifact.

## Evidence and rollback

See [inventory](practice/CONTENT-INVENTORY.md) and [verification](practice/MIGRATION-VERIFICATION.md). Public evidence contains only source URLs/capture metadata and factual summaries, not credentials, patient data or executable archive copies. Upstream template licences do not grant permission to relicense recovered practice material; source attribution is retained.

Deploy only to the new `barlow-site` Pages project, never `hhc-site`. To take this demo down, remove its deployment/domain through this new project's settings, preserving all unrelated projects and records. If changing DNS, save the exact prior `barlow.oddtv.uk` record privately first; do not touch the apex, email, HHC or other hosts. Never infer custom-domain activation from a successful Pages upload.
