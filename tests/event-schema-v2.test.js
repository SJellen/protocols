const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ROOT = path.join(__dirname, "..");

function loadJson(relativePath) {
  return JSON.parse(
    fs.readFileSync(path.join(ROOT, relativePath), "utf8")
  );
}

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const validateV1 = ajv.compile(
  loadJson("schemas/usg/event-schema.v1.1.json")
);

const validateV2 = ajv.compile(
  loadJson("schemas/usg/event-schema.v2.0.json")
);

const legacyEvent = loadJson(
  "registry/events/nba_2025_gsw_lal_0410.json"
);

const canonicalEvent = {
  ...legacyEvent,
  type: "event",
  id: "urn:usg:event:nba_2025_gsw_lal_0410",
  version: "1.0.0",
  meta: {
    created_at: "2025-04-01T00:00:00Z",
    last_updated_at: "2025-04-01T00:00:00Z",
    status: "active"
  }
};

test("v1.1 accepts existing registry event", () => {
  assert.equal(validateV1(legacyEvent), true);
});

test("v2.0 accepts canonical event", () => {
  assert.equal(validateV2(canonicalEvent), true);
});

test("v2.0 rejects legacy event without canonical fields", () => {
  assert.equal(validateV2(legacyEvent), false);
});

test("v2.0 rejects invalid canonical identifier", () => {
  const invalid = {
    ...canonicalEvent,
    id: "nba_2025_gsw_lal_0410"
  };

  assert.equal(validateV2(invalid), false);
});

test("v2.0 rejects invalid lifecycle status", () => {
  const invalid = {
    ...canonicalEvent,
    meta: {
      ...canonicalEvent.meta,
      status: "deleted"
    }
  };

  assert.equal(validateV2(invalid), false);
});

test("v1.1 rejects canonical v2.0 object", () => {
  assert.equal(validateV1(canonicalEvent), false);
});