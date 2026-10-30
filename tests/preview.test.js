// SPDX-FileCopyrightText: 2026 Marcus Baw
// SPDX-License-Identifier: MIT

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { load, dump } from "js-yaml";

test("unofficial preview defers only absent review facts, not safety errors (H1, H2, H3, H7)", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "recovered-preview-"));
  const practiceDir = path.join(tmp, "practice");
  fs.cpSync("tests/fixtures/demo-practice", practiceDir, { recursive: true });
  const file = path.join(practiceDir, "practice.yaml");
  const data = load(fs.readFileSync(file, "utf8"));
  data.demo = false;
  data.site.custom_domain = "fictional.example.com";
  delete data.site.content_last_reviewed;
  delete data.gp_earnings.financial_year;
  const save = () => fs.writeFileSync(file, dump(data));
  const run = (preview, name) =>
    spawnSync(
      process.execPath,
      [
        "node_modules/@11ty/eleventy/cmd.cjs",
        `--config=eleventy.${preview ? "preview.config" : "config"}.js`,
        `--output=${path.join(tmp, name)}`,
      ],
      { env: { ...process.env, PRACTICE_DIR: practiceDir }, encoding: "utf8" },
    );
  try {
    save();
    const result = run(true, "preview");
    assert.equal(result.status, 0, result.stdout + result.stderr);
    const files = fs.readdirSync(path.join(tmp, "preview"), { recursive: true });
    assert.ok(files.filter((f) => f.endsWith(".html")).length > 10);
    for (const name of files.filter((f) => f.endsWith(".html"))) {
      const html = fs.readFileSync(path.join(tmp, "preview", name), "utf8");
      assert.match(html, /Unofficial recovered-site demo/);
      assert.match(html, /Demonstration only, not the official practice website/);
      assert.match(html, /Unreviewed content/);
      assert.match(html, /Do not submit patient information/);
      assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
      assert.match(html, /data-safety="urgent-help"/);
      assert.match(html, /href="tel:999"/);
      assert.match(html, /href="tel:111"/);
      assert.doesNotMatch(html, /Website content last reviewed/);
    }
    assert.ok(!files.includes("CNAME"));
    assert.match(
      fs.readFileSync(path.join(tmp, "preview/_headers"), "utf8"),
      /X-Robots-Tag: noindex, nofollow/,
    );
    assert.match(fs.readFileSync(path.join(tmp, "preview/robots.txt"), "utf8"), /Disallow: \//);
    const about = fs.readFileSync(path.join(tmp, "preview/about/index.html"), "utf8");
    assert.match(about, /financial year has not been confirmed/);
    assert.doesNotMatch(about, /£82,000/);
    const production = run(false, "production");
    assert.notEqual(production.status, 0);
    assert.match(production.stderr, /gp_earnings.financial_year/);
    assert.match(production.stderr, /site.content_last_reviewed/);
    data.gp_earnings.financial_year = "   ";
    save();
    assert.equal(run(true, "blank-year").status, 0);
    assert.doesNotMatch(
      fs.readFileSync(path.join(tmp, "blank-year/about/index.html"), "utf8"),
      /£82,000/,
    );
    delete data.gp_earnings.financial_year;
    for (const [change, restore] of [
      [
        () => {
          data.contact.phone = "invalid";
        },
        () => {
          data.contact.phone = "01632 960000";
        },
      ],
      [
        () => {
          data.site.content_last_reviewed = "not-a-date";
        },
        () => {
          delete data.site.content_last_reviewed;
        },
      ],
      [
        () => {
          data.gp_earnings.financial_year = "TODO";
        },
        () => {
          delete data.gp_earnings.financial_year;
        },
      ],
      [
        () => {
          data.online_services.online_consultation.embed_html =
            '<script src="https://untrusted.example.com/widget.js"></script>';
        },
        () => {
          data.online_services.online_consultation.embed_html = "";
        },
      ],
      [
        () => {
          data.opening_hours.monday = [];
        },
        () => {
          data.opening_hours.monday = [{ opens: "08:00", closes: "18:30" }];
        },
      ],
    ]) {
      change();
      save();
      assert.notEqual(run(true, "rejected").status, 0);
      restore();
    }
    // A recovered page can remove unsupported generic promises without
    // replacing the layout or urgent-help control.
    fs.writeFileSync(
      path.join(practiceDir, "pages/appointments.md"),
      "---\ntitle: Recovered appointments\n---\nHistorical route, not a working request form.\n",
    );
    save();
    const overridden = run(true, "overridden");
    assert.equal(overridden.status, 0, overridden.stderr);
    const html = fs.readFileSync(path.join(tmp, "overridden/appointments/index.html"), "utf8");
    assert.match(html, /Historical route/);
    assert.match(html, /data-safety="urgent-help"/);
    assert.doesNotMatch(html, /Use our online form/);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("static demo clears stale output on failure and leaves production untouched (H2, H7)", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "demo-output-"));
  try {
    for (const name of [
      "node_modules",
      "src",
      "lib",
      "eleventy.config.js",
      "eleventy.preview.config.js",
      "package.json",
    ]) {
      fs.symlinkSync(path.join(process.cwd(), name), path.join(tmp, name));
    }
    fs.cpSync("tests/fixtures/demo-practice", path.join(tmp, "practice"), { recursive: true });
    fs.mkdirSync(path.join(tmp, "_site"));
    fs.writeFileSync(path.join(tmp, "_site/sentinel"), "untouched");
    fs.mkdirSync(path.join(tmp, "_preview"));
    fs.writeFileSync(path.join(tmp, "_preview/stale.html"), "stale");
    const run = () =>
      spawnSync("npm", ["run", "build:demo"], {
        cwd: tmp,
        env: { ...process.env, PRACTICE_DIR: path.join(tmp, "practice") },
        encoding: "utf8",
        timeout: 30000,
      });
    assert.equal(run().status, 0);
    assert.ok(!fs.existsSync(path.join(tmp, "_preview/stale.html")));
    const file = path.join(tmp, "practice/practice.yaml");
    const data = load(fs.readFileSync(file, "utf8"));
    data.contact.phone = "invalid";
    fs.writeFileSync(file, dump(data));
    assert.notEqual(run().status, 0);
    assert.ok(!fs.existsSync(path.join(tmp, "_preview/index.html")));
    assert.equal(fs.readFileSync(path.join(tmp, "_site/sentinel"), "utf8"), "untouched");
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
