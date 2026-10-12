const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const VERIFY_SCRIPT = path.join(ROOT, "tools", "verify-indexes.js");

test("detects corrupted fields, hashes, and duplicate entries", (t) => {
  // Create an isolated registry copy.
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "usg-registry-test-")
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

  // Run the verifier against our temporary registry.
  function verify() {
    return spawnSync(process.execPath, [VERIFY_SCRIPT], {
      cwd: ROOT,
      env: {
        ...process.env,
        USG_REGISTRY_DIR: registryDir,
      },
      encoding: "utf8",
    });
  }

  // Confirm the unmodified copy passes.
  const valid = verify();

  assert.equal(
    valid.status,
    0,
    valid.stdout + valid.stderr
  );

  // Corrupt an indexed field.
  const indexPath = path.join(
    registryDir,
    "_index",
    "teams.index.json"
  );

  const index = JSON.parse(
    fs.readFileSync(indexPath, "utf8")
  );

  const originalName = index.teams[0].name;
  index.teams[0].name = "CORRUPTED_TEST_TEAM";

  fs.writeFileSync(
    indexPath,
    JSON.stringify(index, null, 2) + "\n"
  );

  // Confirm verification rejects the corrupted index.
  const corrupted = verify();

  assert.notEqual(corrupted.status, 0);

  assert.match(
    corrupted.stdout + corrupted.stderr,
    /Field mismatch:/
  );

  // Restore the name and corrupt the hash.
index.teams[0].name = originalName;
const originalHash = index.teams[0].hash_sha256;
index.teams[0].hash_sha256 = "0".repeat(64);

fs.writeFileSync(
  indexPath,
  JSON.stringify(index, null, 2) + "\n"
);

const corruptedHash = verify();

assert.notEqual(corruptedHash.status, 0);

assert.match(
  corruptedHash.stdout + corruptedHash.stderr,
  /Hash mismatch:/
);

// Restore the hash and introduce a duplicate entry.
index.teams[0].hash_sha256 = originalHash;

index.teams.push({ ...index.teams[0] });

// Make the declared count match the corrupted index.
index.count = index.teams.length;

fs.writeFileSync(
  indexPath,
  JSON.stringify(index, null, 2) + "\n"
);

const duplicated = verify();

assert.notEqual(
  duplicated.status,
  0,
  "Duplicate index entries should fail verification"
);

assert.match(
  duplicated.stdout + duplicated.stderr,
  /Expected values to be strictly deep-equal/
);

});