# Archive recovery inventory

Unofficial demonstration only. Retrieved 30 October 2026. This file and `sources/` are administrative evidence, not patient pages. Only Markdown within `practice/pages/` is rendered.

## Search scope and selection

The [un-collapsed CDX query](https://web.archive.org/cdx/search/cdx?url=barlowmed.com%2F%2A&output=json&filter=statuscode%3A200&filter=mimetype%3Atext%2Fhtml&fl=timestamp%2Coriginal%2Cstatuscode%2Cmimetype%2Cdigest&from=2020&to=2026) searched successful HTML captures from 2020 through 2026. `sources/wayback-cdx.json` preserves the complete response with its header row. `sources/latest-captures.json` inventories **all 662 canonical path/query candidates**. Each entry contains timestamp, original URL, recorded status, MIME type and digest in that order. To select latest, compare timestamps explicitly, normalising scheme/hostname and trailing slash only; retain query strings. A collapsed CDX result is not assumed to return the latest capture. No successful sitemap was found in the initial scout; the CDX list, not a guessed sitemap, is the inventory basis.

Latest successful exact non-www homepage found: **20260611162319**, [raw replay](https://web.archive.org/web/20260611162319id_/https://barlowmed.com/). The www exact homepage latest found by the scout was June 2023. The June 2026 homepage is not a claim that every inner page was captured then. CDX success means indexed HTTP 200, not independently verified replay quality. The inventory JSON is metadata only, not a copy of executable pages.

## Recovered core pages

All captures below replayed HTTP 200 and their main text and link destinations were inspected. An archive capture date is different from a page's claimed last-update date. Canonical paths resolve against `https://barlowmed.com/`; exact selected originals and timestamps are in the JSON inventory.

| Original path | Capture UTC | Result in this demo |
| --- | --- | --- |
| `/` | 2026-06-11 16:23:19 | `/`, NHS.UK journey cards and configured PATCHS action, not old notices |
| `/appointments/` | 2026-05-09 14:14:06 | `/appointments/`, PATCHS hours, routine/urgent distinctions, home visits, access needs |
| `/prescriptions/` | 2026-06-11 15:56:33 | `/prescriptions/`, 2 working days, no phone/email repeat requests |
| `/contact-us/` | 2026-05-09 13:52:49 | `/contact/`, address, phone, access and ANPR caution |
| `/surgery-information/opening-times/` | 2026-06-11 16:58:21 | `/opening-times/`, reception hours |
| `/services/test-results/` | 2026-05-09 14:28:27 | `/test-results/`, after 10am, not template after 2pm |
| `/services/new-patients/` | 2026-06-11 16:50:50 | `/register/`, M20 and reception registration, no local form or unverified boundary tool |
| `/services/new-patients/catchment-area/` | 2026-04-15 04:38:08 | Boundary tool not migrated; exact boundary unresolved |
| `/services/surgery-clinics/` | 2026-01-23 13:47:53 | `/services/`, service names only, clinical advice omitted |
| `/services/sick-notes/` | 2026-06-11 15:39:57 | `/sick-notes/`, source-based PATCHS and reception routes, NHS guidance |
| `/surgery-information/cqc-rating/` | 2026-03-17 10:06:09 | `/about/`, normal CQC location link, no asserted rating or latest-review claim |
| `/surgery-information/policies/gp-earnings/` | 2026-05-09 13:53:30 | Figures retained in data, declaration withheld pending year |
| `/surgery-information/feedback-and-complaints/` | 2026-01-23 13:54:35 | `/complaints/`, writing/consent process, no invented acknowledgement deadline |
| `/surgery-information/policies/privacy-notice/` | 2026-05-09 14:43:59 | `/privacy-notice/`, holding page linking archive, not an invented policy |
| `/surgery-information/patient-group/` | 2026-04-15 03:22:50 | `/patient-group/`, membership enquiry routes, no invented meeting dates |
| `/surgery-information/staff/doctors/` | 2025-07-20 12:17:59 | `/our-team/`, names and source roles, no GMC claims |
| `/surgery-information/staff/nursing-team/` | 2026-04-15 04:23:07 | `/our-team/`, deduplicated Nicola Morgan |
| `/surgery-information/staff/practice-management/` | 2026-01-23 14:37:29 | `/our-team/`, managers and team categories |
| `/surgery-information/staff/healthcare-team/` | 2026-06-11 16:41:34 | Inspected; external team phone routes not promoted unverified |
| `/services/managing-your-health-online/` | 2026-06-11 16:29:51 | Inspected; NHS account/Patient Access vs PATCHS claims require clarification |
| `/news/new-online-consultation-sytem/` | 2026-03-17 09:02:20 | Inspected; describes December 2023 launch, not current news |
| `/news/update-on-our-online-consultation-platform-patchs/` | 2026-02-14 02:33:09 | Inspected; distinguishes clinical 7-10am vs other requests during practice hours |
| `/news/the-patchs-telephone-assistant/` | 2026-05-09 14:40:23 | Inspected; telephone assistant 8-10am and busy periods, not verified current |

Five replays initially failed with connection refused; all five succeeded on retry. Raw fetch evidence is retained locally at `/tmp/opencode/barlow-source`, outside the public project. Archive copyright/licensing permission is not established by availability on Wayback. This demo uses attributed factual summaries, not wholesale page republication; practice content/brand rights review remains required before any official use.

## Disposition for every other candidate

Every candidate not explicitly marked replayed above is **indexed 200, replay not independently tested**. The complete per-path timestamp and original URL remain in `sources/latest-captures.json`; no assertion is made that all 662 pages were recovered. Apply the following migration disposition, in order:

1. `/form/`, `/navigator/`, `/sp_triage/`, `/services/managing-your-health-online/online-forms/`, request and review endpoints: excluded from patient site. No data collection, archive form actions, scripts or active embeds.
2. `/conditions/`, `/wellbeing/`, `/cancer-information/` and clinical campaigns: not copied. Prefer current NHS links and practice clinical review.
3. `/news/`, `/practice_news/`, notices, closures, bank holidays and incident announcements: historical only; not reissued as current. Capture dates do not make the event dates current.
4. `/practice-information/` and `/digitalpractice/`: older information architecture, often 2023. Prefer newer equivalent core pages above; do not merge contradictory old policies.
5. Policies, staff, services, PPG and other core information not listed as replayed: candidate backlog for practice review. Do not silently mark migrated or approved.
6. Author/category pages, supplier side panels, cookie controls, search and technical pages: no patient-content migration. Old supplier cookie/tracking policies do not describe this static demo.

## Supplier and registration destinations

Copied verbatim from replayed sources, never generated from the ODS code. The main PATCHS landing page is now enabled as an outgoing anchor following read-only live verification on 30 October 2026. It renders the heading **Barlow Medical Centre**, identifies clinical requests as next available Monday at 07:00, and explains non-urgent Admin Query requests between 10am and 6:30pm. No patient information was entered. See `sources/online-consultation.json`. The live NHS P84034 profile corroborates the practice identity, address and phone, but does not itself expose a PATCHS href. This is destination identity evidence, not practice approval or a guarantee of request acceptance.

Destination disposition:

- `https://patchs.ai/practice/barlowmedicalcentre`: enabled for homepage, appointments, prescriptions, results, fit notes, complaints and PPG. Exact appointments button href, also found on other recovered pages.
- `https://patchs.ai/barlowmedicalcentre/message`: evidence only; no direct-booking guarantee in the demo.
- `https://patchs.ai/barlowmedicalcentre/message/myself`: evidence only; use the verified landing page rather than a deep link.
- `https://www.patientaccess.com/`: enabled, source prescriptions and results.
- `https://gp-registration.nhs.uk/P84034/gpregistration/landing`: evidence only; registration is described through reception until acceptance and boundary are confirmed.
- `https://www.nhs.uk/nhs-app/account/`: enabled for repeats, results and cancellation, not asserted as direct appointment booking.

No account configuration, registration acceptance or response promise has been tested by submitting data. Staff spelling/roles, current service availability, privacy, exact phone hours, catchment and approval remain administrative queries, not patient-page archive commentary. Source last-update dates retained for audit: doctors and management 13 May 2025; appointments, prescriptions, results, clinics, registration and fit notes 6 May 2025; contact 7 April 2026; opening times 3 July 2023; nurses 28 January 2026; complaints and PPG 20 December 2023. These are not sign-off dates. Duplicate Nicola Morgan nursing entry is shown only once. The registration boundary tool was not recovered, so M20 is not treated as a complete eligibility boundary. Phone-line intervals have not been inferred from reception hours.
