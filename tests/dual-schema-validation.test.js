const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const VALIDATOR = path.join(ROOT, "tools", "validate-registry.js");

const EVENT_FILE = "nba_2025_gsw_lal_0410.json";

const legacyEvent = JSON.parse(
  fs.readFileSync(
    path.join(ROOT, "registry", "events", EVENT_FILE),
    "utf8"
  )
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

function runValidation(t, event) {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "usg-dual-schema-")
  );

  t.after(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  const registryDir = path.join(tempDir, "registry");

  fs.cpSync(
    path.join(ROOT, "registry"),
    registryDir,
    { recursive: true }
  );

  fs.writeFileSync(
    path.join(registryDir, "events", EVENT_FILE),
    JSON.stringify(event, null, 2) + "\n"
  );

  return spawnSync(process.execPath, [VALIDATOR, "--check"], {
    cwd: ROOT,
    env: {
      ...process.env,
      USG_REGISTRY_DIR: registryDir
    },
    encoding: "utf8"
  });
}

function expectAccepted(name, event) {
  test(name, (t) => {
    const result = runValidation(t, event);

    assert.equal(
      result.status,
      0,
      result.stdout + result.stderr
    );
  });
}

function expectRejected(name, event) {
  test(name, (t) => {
    const result = runValidation(t, event);

    assert.notEqual(
      result.status,
      0,
      `Validator unexpectedly accepted ${name}\n` +
        result.stdout + result.stderr
    );
  });
}

expectAccepted(
  "Accepts legacy v1.1 event",
  legacyEvent
);

expectAccepted(
  "Accepts canonical v2.0 event",
  canonicalEvent
);

expectRejected(
  "Rejects partial canonical event without fallback",
  {
    ...legacyEvent,
    id: canonicalEvent.id
  }
);

expectRejected(
  "Rejects canonical event missing meta",
  {
    ...canonicalEvent,
    meta: undefined
  }
);

expectRejected(
  "Rejects canonical event missing version",
  {
    ...canonicalEvent,
    version: undefined
  }
);

expectRejected(
  "Rejects invalid canonical identifier",
  {
    ...canonicalEvent,
    id: "invalid-event-id"
  }
);

expectRejected(
  "Rejects invalid lifecycle status",
  {
    ...canonicalEvent,
    meta: {
      ...canonicalEvent.meta,
      status: "deleted"
    }
  }
);