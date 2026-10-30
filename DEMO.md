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
npm run audit:demo
```

Only `_preview` is a demo artifact. It contains an unconditional unofficial banner, noindex meta tags, robots exclusion and Cloudflare X-Robots-Tag headers, including the error page. Search exclusion is advisory, not authentication. `_site` remains separate. The default production checker/build intentionally fail while the genuine approval date and earnings year are missing. Invalid facts and other safety controls are not bypassed by demo mode. The original GitHub publishing workflow remains gated by production checks; GitHub Pages has not been enabled or configured for this project.

Recovered core pages can replace a restricted set of generic templates in preview only. The urgent-help partial is unchanged. This is not a production-ready practice configuration, and resolving dates alone is insufficient: all [migration questions](practice/MIGRATION-QUERIES.md), content approval, account ownership, rights and safety/accessibility review must be resolved before any official launch. Do not run an official deployment using this demo artifact.

## Usable replacement demo revision, 30 October 2026

The user authorised ordinary source-based practice content and outgoing PATCHS links, not actual practice sign-off. The homepage now uses the NHS.UK journey cards and a working configured supplier anchor; patient pages explain appointments, repeat prescriptions, results, registration, contact/access/parking, opening times, staff, services, fit notes and PPG without repeated archive qualifications. The top banner remains on every page. Noindex and unchanged urgent help remain mandatory. Archive dates, conflicts and unknowns remain in the inventory and queries, not extra footer warnings. Unknown-year earnings are not rendered at all, and the CQC link does not claim a latest report or verified rating.

Exact PATCHS destination: **https://patchs.ai/practice/barlowmedicalcentre**, copied from the archived appointments button and prescription link. Read-only live browser inspection returned the **Barlow Medical Centre** landing page and its clinical/Admin Query availability notice. NHS P84034 independently corroborated the practice identity, address and phone. No login, cookie consent, patient entry or submission was performed. See `practice/sources/online-consultation.json`. Direct booking, registration acceptance and response times are not guaranteed. No local forms, embeds or tracking have been introduced. Production still requires genuine approval and earnings dates, with all other validators unchanged.

## Evidence and rollback

See [inventory](practice/CONTENT-INVENTORY.md) and [verification](practice/MIGRATION-VERIFICATION.md). Public evidence contains only source URLs/capture metadata and factual summaries, not credentials, patient data or executable archive copies. Upstream template licences do not grant permission to relicense recovered practice material; source attribution is retained.

Deploy only to the new `barlow-site` Pages project, never `hhc-site`. To take this demo down, remove its deployment/domain through this new project's settings, preserving all unrelated projects and records. If changing DNS, save the exact prior `barlow.oddtv.uk` record privately first; do not touch the apex, email, HHC or other hosts. Never infer custom-domain activation from a successful Pages upload.

## Initial deployment record, 30 October 2026

- Separate clone: `/home/oscar/Documents/Code_Projects/Barlow_site`. Fresh upstream baseline `9f58d4a6f1441c5c046da472f97d78cd1d734f12`.
- New public project: <https://github.com/AbsurdSyssie/Barlow_site>. Only this project's `origin` was pushed; upstream push URL is locally disabled.
- Cloudflare Pages project: `barlow-site`, main branch, direct upload of tested `_preview` only. Working address: <https://barlow-site.pages.dev/>. First immutable deployment: <https://521d458c.barlow-site.pages.dev/> from implementation commit `612b1cbd808c446fa56502e111eaf30f32952f4a`.
- Initial `wrangler pages project create` attempted the CLI's new Workers delegation and failed without deploying. Retried once with the documented `--force` creation flag to create a conventional Pages project. Subsequent upload succeeded without that flag.
- Custom hostname `barlow.oddtv.uk` is attached **but pending**, with Cloudflare reporting **“CNAME record not set”**. HTTPS currently returns **525**, not a working demo. DNS read for this exact hostname returned **403** using the authorised OAuth token, so no DNS record was read, backed up or written. Existing unrelated DNS and HHC resources were not changed.
- Live homepage and appointments returned HTTP 200 with `X-Robots-Tag: noindex, nofollow`; robots.txt disallows crawling. A missing path returned HTTP 404 with the noindex header. All 19 local HTML pages passed the safety/content audit and demo HTML validation.
- Live home, appointments, opening times, contact and about pages were exercised at 390x844, 768x1024 and 1440x900. No horizontal overflow at standard text size. Home screenshots at all three sizes, phone appointments and desktop contact were inspected. Skip-link keyboard focus and mobile More navigation worked; no broken image assets were found. Reduced motion and 200% root-text enlargement were exercised; this is not a browser/assistive-technology accessibility certification.
- Local screenshots are `/tmp/opencode/barlow-390.png`, `barlow-768.png`, `barlow-1440.png`, `barlow-appointments-phone.png`, `barlow-contact-desktop.png` and `barlow-zoom200.png`, not committed. A browser tool automatically wrote one disposable snapshot under the original workspace; that exact new artifact was removed immediately. No HHC source, git, server, deployment or domain configuration was changed.
- The inherited CI and GitHub publishing workflows ran after the push and correctly stopped at the production check on the two missing genuine facts. GitHub Pages settings were not enabled or modified. This is intentional gate evidence, not green production CI.

### Complete the demo hostname in the Cloudflare dashboard

1. In `oddtv.uk` DNS settings, inspect **only** the exact `barlow.oddtv.uk` record(s), and privately save their complete current settings for rollback. Do not alter wildcard, apex, email, HHC or other host records.
2. Set the exact `barlow` host to a **CNAME** targeting **`barlow-site.pages.dev`**, with no scheme or path. Resolve only exact-host conflicts after recording them. If in doubt, stop rather than removing a broader record.
3. In Workers & Pages → `barlow-site` → Custom domains, wait for `barlow.oddtv.uk` verification and certificate activation. Check HTTPS home, appointments, assets and noindex headers before saying the address works. Do not bypass certificate warnings.

Until then, use the working `.pages.dev` demo address. No patient-facing launch or practice approval is implied by either hostname.

## Replacement revision deployment, 30 October 2026

- Implementation `de55db623eb7d53f7db53a23c027a435551de053`; hosting-integrity follow-up `cfc7ac5`. Both pushed only to `AbsurdSyssie/Barlow_site`. The follow-up supplies a documented `no-transform` response header and an accurate cookie page separating static application behaviour from host security.
- Fresh, validated `_preview` deployed only to Cloudflare Pages **barlow-site**. Final immutable deployment: <https://6a0eea12.barlow-site.pages.dev/>. Main address: <https://barlow-site.pages.dev/>. The custom hostname <https://barlow.oddtv.uk/> is now HTTPS-active, observed read-only; no DNS or zone-security changes were made by this revision.
- All 19 `.pages.dev` HTML responses, including the genuine missing-path 404, exactly match the tested local artifact and carry `X-Robots-Tag: noindex, nofollow`. Robots and checked CSS assets match too. All 18 normal custom-host pages match exactly with no injected scripts/frames; its missing-path 404 still receives Cloudflare JavaScript Detections because the host overrides cache control to `no-store`. This concrete hosting exception is tracked in [migration queries](practice/MIGRATION-QUERIES.md), not concealed as a clean custom-host audit. No zone-wide protection was disabled.
- Final verification: lint; 42 valid-fixture tests; fresh demo build; all 19-page HTML validation and `audit:demo`; REUSE 93/93 files. Valid fictional production check/build/HTML validation passed. Actual production check/build/default tests still refuse missing approval date and earnings year, intentionally. Phone/tablet/desktop visual and rendered-page checks are recorded in `practice/MIGRATION-VERIFICATION.md`; final live home/appointments on both hosts passed phone and desktop overflow, banner, supplier-anchor and no-form/no-frame checks.
- The source-authentic PATCHS landing page identifies Barlow Medical Centre. No patient submission was made. Independent operational-link risk review and practice approval remain separate follow-ups. HHC source, repository, deployment, server and domain were untouched.
