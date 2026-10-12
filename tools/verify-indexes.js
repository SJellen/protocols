// tools/verify-indexes.js
// USG Registry Index Verification — v0.1
// Initial implementation: events index

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const assert = require("node:assert/strict");

const ROOT = path.resolve(__dirname, "..");

const REGISTRY_DIR = process.env.USG_REGISTRY_DIR
  ? path.resolve(process.env.USG_REGISTRY_DIR)
  : path.join(ROOT, "registry");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function sha256(filePath) {
  return crypto
    .createHash("sha256")
    .update(fs.readFileSync(filePath))
    .digest("hex");
}

function verifyObjectIndex({ dirName, idKey, fields }) {
  const indexPath = path.join(
    REGISTRY_DIR,
    "_index",
    `${dirName}.index.json`
  );

  const sourceDir = path.join(REGISTRY_DIR, dirName);
  const index = readJson(indexPath);

  const itemsKey =
    dirName === "rights-bundles"
      ? "rights_bundles"
      : dirName;

  // Verify index structure.
  assert.equal(index.index_version, "0.2.0");
  assert.equal(index.schema, `urn:usg:index:${dirName}:1.0`);

  const entries = index[itemsKey];

  assert.ok(
    Array.isArray(entries),
    `Missing ${itemsKey} array`
  );

  // Compare indexed records against source files.
  const sourcePaths = fs.readdirSync(sourceDir)
    .filter((name) => name.endsWith(".json"))
    .map((name) => `${dirName}/${name}`)
    .sort();

  const indexedPaths = entries
    .map((entry) => entry.path)
    .sort();

  assert.equal(index.count, entries.length);
  assert.deepEqual(indexedPaths, sourcePaths);

  // Verify individual records.
  for (const entry of entries) {
    const sourcePath = path.join(REGISTRY_DIR, entry.path);
    const source = readJson(sourcePath);

    assert.equal(
      entry.hash_sha256,
      sha256(sourcePath),
      `Hash mismatch: ${entry[idKey]}`
    );

    assert.equal(
      entry[idKey],
      source[idKey],
      `ID mismatch: ${entry.path}`
    );

    // Verify indexed fields.
    for (const [field, getExpected] of Object.entries(fields)) {
      assert.deepEqual(
        entry[field],
        getExpected(source),
        `Field mismatch: ${entry[idKey]}.${field}`
      );
    }
  }

  console.log(
    `✅ ${dirName} index verified: ${entries.length} record(s)`
  );
}

function verifyLeaguesIndex() {
  verifyObjectIndex({
    dirName: "leagues",
    idKey: "league_id",
    fields: {
      name: (league) => league.name || null,
      region: (league) => league.region || null,
      status: (league) => league.status || "active",
    },
  });
}

  function verifyEventsIndex() {
  const indexPath = path.join(
    REGISTRY_DIR,
    "_index",
    "events.index.json"
  );

  const eventsDir = path.join(REGISTRY_DIR, "events");
  const index = readJson(indexPath);

  // Verify index structure.
  assert.equal(index.index_version, "0.2.0");
  assert.equal(index.schema, "urn:usg:index:events:1.0");
  assert.ok(Array.isArray(index.events));

  // Identify all source records.
  const sourcePaths = fs.readdirSync(eventsDir)
    .filter((name) => name.endsWith(".json"))
    .map((name) => `events/${name}`)
    .sort();

  const indexedPaths = index.events
    .map((entry) => entry.path)
    .sort();

  // Detect missing, extra, or duplicate index entries.
  assert.equal(index.count, index.events.length);
  assert.deepEqual(indexedPaths, sourcePaths);

  // Verify each indexed record against its source.
  for (const entry of index.events) {
    const sourcePath = path.join(
      REGISTRY_DIR,
      entry.path
    );

    const event = readJson(sourcePath);
    const actualHash = sha256(sourcePath);

    assert.equal(
      entry.hash_sha256,
      actualHash,
      `Hash mismatch: ${entry.event_id}`
    );

    const expectedFields = {
      event_id: event.event_id,
      league_id: event.league_id,
      start_time: event.start_time,
      home_team_id: event.home_team_id,
      away_team_id: event.away_team_id,
      broadcaster_id: event.broadcaster_id,
      venue_id: event.venue_id || null,
      rights_bundle_id: event.rights_bundle_id || null,
    };

    for (const [field, expected] of Object.entries(expectedFields)) {
      assert.deepEqual(
        entry[field],
        expected,
        `Field mismatch: ${entry.event_id}.${field}`
      );
    }
  }

  console.log(
    `✅ Events index verified: ${index.events.length} record(s)`
  );
}

function verifyTeamsIndex() {
  verifyObjectIndex({
    dirName: "teams",
    idKey: "team_id",
    fields: {
      league_id: (team) => team.league_id || null,
      name: (team) => team.name || null,
      short_name: (team) => team.short_name || null,
      status: (team) => team.status || "active",
    },
  });
}

function verifyVenuesIndex() {
  verifyObjectIndex({
    dirName: "venues",
    idKey: "venue_id",
    fields: {
      name: (venue) => venue.name || null,
      city: (venue) => venue.city || null,
      country: (venue) => venue.country || null,
      timezone: (venue) => venue.timezone || null,
      status: (venue) => venue.status || "active",
    },
  });
}

function verifyBroadcastersIndex() {
  verifyObjectIndex({
    dirName: "broadcasters",
    idKey: "broadcaster_id",
    fields: {
      name: (broadcaster) => broadcaster.name || null,
      type: (broadcaster) => broadcaster.type || null,
      official_site: (broadcaster) => broadcaster.official_site || null,
      status: (broadcaster) => broadcaster.status || "active",
    },
  });
}

function verifyRightsBundlesIndex() {
  verifyObjectIndex({
    dirName: "rights-bundles",
    idKey: "rights_bundle_id",
    fields: {
      league_id: (bundle) => bundle.league_id || null,
      access_model: (bundle) => bundle.access_model || null,
      default_price_usd: (bundle) => bundle.default_price_usd ?? null,
      status: (bundle) => bundle.status || "active",
    },
  });
}

try {
  console.log("🔍 Verifying USG registry indexes…");

  verifyEventsIndex();
  verifyLeaguesIndex();
  verifyTeamsIndex();
  verifyVenuesIndex();
  verifyBroadcastersIndex();
  verifyRightsBundlesIndex();

  console.log("✅ Index verification passed.");
} catch (error) {
  console.error("❌ Index verification failed.");
  console.error(error.message);
  process.exitCode = 1;
}

