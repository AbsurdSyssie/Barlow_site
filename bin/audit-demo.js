// SPDX-FileCopyrightText: 2026 Marcus Baw
// SPDX-License-Identifier: MIT

// Deployment audit of this recovered demo, separate from fictional template tests.
// H1, H2, H3, H5, H7, H10: no sign-off fabrication, disabled routes or collection.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { load } from "js-yaml";

const root = path.resolve("_preview");
const data = load(fs.readFileSync("practice/practice.yaml", "utf8"));
const evidence = JSON.parse(fs.readFileSync("practice/sources/online-consultation.json", "utf8"));
const destination = data.online_services.online_consultation.url;
assert.equal(destination, evidence.url, "PATCHS must match the recorded source href");
assert.equal(data.site.content_last_reviewed, "");
assert.equal(data.gp_earnings.financial_year, "");
const files = fs.readdirSync(root, { recursive: true }).filter((file) => file.endsWith(".html"));
assert.ok(files.length >= 19, "Missing demo pages");
for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  assert.equal((html.match(/Unofficial demo/g) ?? []).length, 1, file);
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/, file);
  assert.match(html, /data-safety="urgent-help"/, file);
  assert.match(html, /href="tel:999"/, file);
  assert.match(html, /href="tel:111"/, file);
  assert.doesNotMatch(html, /<form\b|<iframe\b|<input\b|<textarea\b/i, file);
  assert.doesNotMatch(html, /<script[^>]+src="https?:|googletagmanager|google-analytics/i, file);
  assert.doesNotMatch(
    html,
    /Historical|archived|unverified|unconfirmed|Unreviewed|No practice sign-off|financial year has not been confirmed|Website content last reviewed|£66,154|Handforth|Fernmoor|MIGRATION-QUERIES|CONTENT-INVENTORY|web\.archive\.org/i,
    file,
  );
  for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const local = path.join(root, href.endsWith("/") ? `${href}index.html` : href);
    assert.ok(fs.existsSync(local), `${file}: broken local link ${href}`);
  }
}
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
for (const file of [
  "index.html",
  "appointments/index.html",
  "prescriptions/index.html",
  "test-results/index.html",
  "sick-notes/index.html",
]) {
  const html = read(file);
  assert.ok(html.includes(`href="${destination}"`), `${file}: missing exact supplier anchor`);
  assert.doesNotMatch(html, /aria-disabled="true"/);
}
assert.match(read("contact/index.html"), /href="\/appointments\/"/);
assert.match(read("index.html"), /Do not use for emergencies/);
const appointments = read("appointments/index.html");
assert.match(appointments, /After 10am/);
assert.match(appointments, /Do not use PATCHS or wait for a call back/);
assert.doesNotMatch(appointments, /to book some appointments|direct booking/i);
const prescriptions = read("prescriptions/index.html");
assert.match(prescriptions, /do not accept repeat prescription requests by phone or email/i);
assert.match(prescriptions, /paper repeat prescription slip/);
assert.doesNotMatch(prescriptions, /unless you cannot order any other way/);
assert.doesNotMatch(read("about/index.html"), /GP earnings|latest CQC/);
assert.match(read("cookies/index.html"), /leave this website and go to a service run by PATCHS/);
assert.match(
  fs.readFileSync(path.join(root, "_headers"), "utf8"),
  /X-Robots-Tag: noindex, nofollow/,
);
assert.match(fs.readFileSync(path.join(root, "_headers"), "utf8"), /Cache-Control: .*no-transform/);
assert.match(fs.readFileSync(path.join(root, "robots.txt"), "utf8"), /Disallow: \//);
console.log(
  `Audited all ${files.length} demo HTML pages: single banner, noindex, urgent help, local links, source-authentic PATCHS anchors, no collection or stale archive prose.`,
);
