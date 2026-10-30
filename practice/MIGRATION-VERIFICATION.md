# Migration verification record

Status: **unofficial public demo, not practice-approved**. Evidence retrieval and demo statement preparation: 30 October 2026. This is not a content review/sign-off date. Independent review remains outstanding.

## Sources

- Latest successful homepage and full candidate inventory: [CONTENT-INVENTORY](CONTENT-INVENTORY.md), including per-page capture dates and links. Raw replay text and HTML remain local in `/tmp/opencode/barlow-source`.
- Current NHS profile retrieved successfully: [P84034](https://www.nhs.uk/services/gp-surgery/barlow-medical-centre/P84034), [contact and reception hours](https://www.nhs.uk/services/gp-surgery/barlow-medical-centre/P84034/contact-details-and-opening-times). NHS says hours last confirmed 4 June 2025, not today.
- Current [CQC location](https://www.cqc.org.uk/location/1-549931803) returned HTTP 403, so only the archived link is evidenced, not a current rating.
- The initial `/opening-times` NHS URL returned 404; the NHS profile's actual `/contact-details-and-opening-times` URL succeeded. No guessed supplier destination was used.
- [Training directory](https://gp-training.hee.nhs.uk/manchester/training-practices/south-man-train-prac/) independently inspected. It conflicts on **both address and phone**, not just address. NHS/practice archive is preferred provisionally, not confirmed by the practice.

## Content controls

Core content is in `practice.yaml` and `pages/`. Administrative Markdown and CDX metadata are outside `pages/` and not rendered. Clinical advice, stale closures, campaigns, archived forms, third-party scripts, supplier embeds and tracking are not migrated. Staff listing is explicitly historical. Privacy is a holding page, not invented legal text. All enabled external care links are generic NHS information/profile links or urgent-help links; archived supplier and registration destinations are evidence only.

Generic template appointment, repeat-order, results, registration, complaints and accessibility wording is replaced only in the demo by attributed historical pages. This avoids telephone repeat exceptions, incorrect result-call times, broad NHS App booking claims and false “run by the practice” claims. Production conversion requires resolving all queries and deliberately replacing those preview-only overrides with approved production content; do not just fill dates and deploy.

## Verification commands and expected outcomes

Baseline clean clone: `npm ci` succeeded, 0 audit vulnerabilities; all 40 original tests passed before changes.

- `npm run lint`: required before commit.
- `PRACTICE_DIR=tests/fixtures/demo-practice npm test`: tests production template behaviour with valid fictional data plus preview safety gates. No test data/sign-off is substituted into Barlow files.
- `node --test tests/preview.test.js`: verifies missing-only deferrals, invalid fields/embeds, production refusal, urgent help/noindex/banner on every page, earnings suppression including whitespace, recovered-page layout safety, stale preview cleanup and `_site` isolation.
- `npm run build:demo`, `npm run lint:html:demo`: only `_preview` may be uploaded.
- `npm run check`, `npm run build`, default `npm test`: expected to fail for the unapproved Barlow data because approval date and earnings year are absent. These are real blockers, not successful production verification. `npm run lint:html` has no approved `_site` output to validate; use the separate demo command.
- `reuse lint`: licence annotations check, not evidence of permission to use a real practice's branding/content.

Verified locally: lint passed; all 42 tests passed using the valid fictional practice override; both preview safety tests passed; 19 Barlow demo HTML pages passed HTML validation and a separate built-output audit of urgent links, noindex, banners, local links, no forms/frames/active supplier destinations, no leaked administrative sources, no HHC/Fernmoor facts and no undated earnings. `uvx reuse lint` passed all 92 files; bare `reuse` was unavailable. Initial lint included generated preview assets until the separate output was added to lint ignores; initial HTML validation found telephone spaces, corrected to non-breaking spaces.

Production check/build and default tests failed as expected on the two missing genuine facts; production HTML validation failed because no `_site` was generated. None has been counted as a production pass. Upstream checkout baseline remains `9f58d4a6f1441c5c046da472f97d78cd1d734f12`.

Live deployment, visual checks and final command results are recorded in the handoff and DEMO.md. No claim of a clinical safety assessment, full accessibility audit or practice approval is made.
