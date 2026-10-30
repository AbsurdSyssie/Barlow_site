# Migration verification record

Status: **unofficial public demo, not practice-approved**. Evidence retrieval and demo statement preparation: 30 October 2026. This is not a content review/sign-off date. Independent review remains outstanding.

## Sources

- Latest successful homepage and full candidate inventory: [CONTENT-INVENTORY](CONTENT-INVENTORY.md), including per-page capture dates and links. Raw replay text and HTML remain local in `/tmp/opencode/barlow-source`.
- Current NHS profile retrieved successfully: [P84034](https://www.nhs.uk/services/gp-surgery/barlow-medical-centre/P84034), [contact and reception hours](https://www.nhs.uk/services/gp-surgery/barlow-medical-centre/P84034/contact-details-and-opening-times). NHS says hours last confirmed 4 June 2025, not today.
- Current [CQC location](https://www.cqc.org.uk/location/1-549931803) returned HTTP 403, so only the archived link is evidenced, not a current rating.
- The initial `/opening-times` NHS URL returned 404; the NHS profile's actual `/contact-details-and-opening-times` URL succeeded. No guessed supplier destination was used.
- [Training directory](https://gp-training.hee.nhs.uk/manchester/training-practices/south-man-train-prac/) independently inspected. It conflicts on **both address and phone**, not just address. NHS/practice archive is preferred provisionally, not confirmed by the practice.

## Content controls

Core content is in `practice.yaml` and `pages/`. Administrative Markdown and source metadata are outside `pages/` and not rendered. Clinical advice, stale closures, campaigns, archived forms, third-party scripts, supplier embeds and tracking are not migrated. Ordinary source-derived staff, service, contact and process information is presented as patient journeys under one sitewide unofficial demo banner. Privacy is a holding page, not invented legal text. PATCHS is now an enabled external anchor to the exact archived button href, verified against the live Barlow landing page without any submission. Patient Access and NHS account links retain the source's purposes; registration and direct-booking deep links are not promoted.

Generic template appointment, repeat-order, results, registration, complaints and accessibility wording is replaced only in the demo by source-derived pages. Source dates, provenance and unresolved facts are retained in administrative files rather than repeated as patient prose. This avoids telephone repeat exceptions, incorrect result-call times, broad NHS App booking claims and false “run by the practice” claims. Production conversion requires resolving all queries and deliberately replacing those preview-only overrides with approved production content; do not just fill dates and deploy.

## Verification commands and expected outcomes

Baseline clean clone: `npm ci` succeeded, 0 audit vulnerabilities; all 40 original tests passed before changes.

- `npm run lint`: required before commit.
- `PRACTICE_DIR=tests/fixtures/demo-practice npm test`: tests production template behaviour with valid fictional data plus preview safety gates. No test data/sign-off is substituted into Barlow files.
- `node --test tests/preview.test.js`: verifies missing-only deferrals, invalid fields/embeds, production refusal, urgent help/noindex/banner on every page, earnings suppression including whitespace, recovered-page layout safety, stale preview cleanup and `_site` isolation.
- `npm run build:demo`, `npm run lint:html:demo`, `npm run audit:demo`: only fresh `_preview` may be uploaded. The audit checks every page, exact source-equal PATCHS anchors, no forms or embeds, local links, one banner, noindex, urgent help and no undated earnings or leaked archive prose.
- `npm run check`, `npm run build`, default `npm test`: expected to fail for the unapproved Barlow data because approval date and earnings year are absent. These are real blockers, not successful production verification. `npm run lint:html` has no approved `_site` output to validate; use the separate demo command.
- `reuse lint`: licence annotations check, not evidence of permission to use a real practice's branding/content.

Initial demo verification: all 42 tests passed using valid fictional data, and all 19 pages passed HTML validation. `uvx reuse lint` passed; bare `reuse` was unavailable. The initial intentionally disabled supplier policy has been superseded by source-authentic outgoing anchors as described above and in the hazard log. Rework baseline: all 42 tests passed before edits. HTML validation initially caught spaces in new telephone labels; corrected to non-breaking spaces. Final rework verification and deployment are recorded below and in DEMO.md.

Production check/build and default tests failed as expected on the two missing genuine facts; production HTML validation failed because no `_site` was generated. None has been counted as a production pass. Upstream checkout baseline remains `9f58d4a6f1441c5c046da472f97d78cd1d734f12`.

Live deployment, visual checks and final command results are recorded in the handoff and DEMO.md. No claim of a clinical safety assessment, full accessibility audit or practice approval is made.

## Replacement-demo rework checks, 30 October 2026

- Lint, all 42 valid-fixture tests, fresh demo build, all 19-page demo HTML validation, deployment audit and `uvx reuse lint` passed. Valid fictional production check/build and HTML validation passed, with the repository HTML configuration supplied explicitly for output outside this directory. An initial external-output HTML validation omitted that config and applied unrelated default whitespace/role rules; rerunning with `--config .htmlvalidate.json` passed without changing output or rules.
- Actual Barlow production check, build and default test run correctly refused the two missing genuine review facts. No fictional date or earnings year has been inserted; invalid supplied facts and all other validators remain blocking.
- All 19 pages rendered at phone 390x844 and desktop 1440x900 without horizontal overflow, forms, frames, duplicate banners, missing urgent help or browser errors. Home and appointments were also exercised at 768x1024. Full-page home/appointments phone and desktop screenshots were inspected; all page screenshots are local `/tmp/opencode/barlow-rework-*.png`, not committed. Skip-link keyboard focus worked. This is not a full accessibility certification.
- Read-only live PATCHS inspection and NHS corroboration are in the source record. Supplier request submission, account linking and registration acceptance were not tested. Independent operational-link risk review remains a separate follow-up, not a claimed practice approval.
- Final deployed implementation: `cfc7ac5`, <https://6a0eea12.barlow-site.pages.dev/>. All 19 `.pages.dev` HTML responses, robots and checked CSS assets matched local bytes. All pages carried noindex headers; the missing route returned the intended 404. The custom hostname is HTTPS-active and its 18 normal pages also match. Cloudflare mutates its missing-path 404 with JavaScript Detections despite normal-page `no-transform` protection; this exact exception is in the hazard log and migration queries. No DNS or zone-security changes were made. A preliminary Python urllib check returned 403; read-only browser/request and curl verification succeeded, and the final audit used browser requests rather than treating that 403 as site availability evidence.
- Final live home and appointments were inspected on both hosts at 390x844 and 1440x900: one banner, the exact PATCHS anchor, no forms/frames and no horizontal overflow. Final screenshots are `/tmp/opencode/barlow-final-live-*.png`. Local full-page browser audit covered all 19 pages at both widths. Final lint, all 42 tests, demo build/HTML/audit and REUSE 93/93 files passed again after the hosting follow-up. No clean custom-host 404 audit or independent safety sign-off is claimed.
