// tools/validate-registry.js
// Basic USG registry validator + index builder (v0.1)

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ROOT = process.cwd();
const REGISTRY_DIR = path.join(ROOT, "registry");
const SCHEMAS_DIR = path.join(ROOT, "schemas", "usg");
const INDEX_DIR = path.join(REGISTRY_DIR, "_index");

// Utility helpers
function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function writeJson(filePath, data) {
  const serialized = JSON.stringify(data, null, 2) + "\n";
  fs.writeFileSync(filePath, serialized, "utf8");
}

// 1. Load schemas
function loadSchemas() {
  const eventSchemaPath = path.join(SCHEMAS_DIR, "event-schema.v1.0.json");
  const eventSchema = readJson(eventSchemaPath);

  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);  //  enable date-time, uri, etc.

  const validateEvent = ajv.compile(eventSchema);

  return { validateEvent };
}

// 2. Load registry metadata
function loadRegistryMetadata() {
  const metadataPath = path.join(REGISTRY_DIR, "registry-metadata.json");
  if (!fs.existsSync(metadataPath)) {
    throw new Error(`Missing registry-metadata.json at: ${metadataPath}`);
  }
  return { metadata: readJson(metadataPath), metadataPath };
}

// 3. Load leagues + build in-memory map
function loadLeagues() {
  const leaguesDir = path.join(REGISTRY_DIR, "leagues");
  if (!fs.existsSync(leaguesDir)) {
    throw new Error(`Missing leagues directory at: ${leaguesDir}`);
  }

  const files = fs
    .readdirSync(leaguesDir)
    .filter((f) => f.endsWith(".json"));

  const leagues = {};
  for (const file of files) {
    const fullPath = path.join(leaguesDir, file);
    const league = readJson(fullPath);

    const leagueId = league.league_id;
    if (!leagueId) {
      throw new Error(`League file ${file} is missing league_id`);
    }
    if (leagues[leagueId]) {
      throw new Error(`Duplicate league_id detected: ${leagueId}`);
    }

    leagues[leagueId] = {
      ...league,
      __path: path.relative(REGISTRY_DIR, fullPath),
    };
  }

  return { leagues, leagueCount: files.length };
}

// 4. Load events, validate against schema, and build event index
function loadAndValidateEvents(validateEvent, leagues) {
  const eventsDir = path.join(REGISTRY_DIR, "events");
  if (!fs.existsSync(eventsDir)) {
    throw new Error(`Missing events directory at: ${eventsDir}`);
  }

  const files = fs
    .readdirSync(eventsDir)
    .filter((f) => f.endsWith(".json"));

  const eventsIndex = [];

  let okCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const fullPath = path.join(eventsDir, file);
    const relPath = path.relative(REGISTRY_DIR, fullPath);
    const event = readJson(fullPath);

    const eventId = event.event_id;
    if (!eventId) {
      console.error(`❌ [event] ${file} is missing event_id`);
      errorCount++;
      continue;
    }

    // Schema validation
    const valid = validateEvent(event);
    if (!valid) {
      console.error(`❌ [event] ${eventId} failed schema validation`);
      console.error(validateEvent.errors);
      errorCount++;
      continue;
    }

    // League consistency
    const leagueIdRaw = event.league;
    const leagueId = typeof leagueIdRaw === "string" ? leagueIdRaw.toLowerCase() : undefined;
    if (!leagueId || !leagues[leagueId]) {
      console.error(
        `❌ [event] ${eventId} references unknown league: "${event.league}"`
      );
      errorCount++;
      continue;
    }

    // Basic start_time presence
    if (!event.start_time) {
      console.error(`❌ [event] ${eventId} is missing start_time`);
      errorCount++;
      continue;
    }

    // If we got here, event is "OK"
    okCount++;
    eventsIndex.push({
      event_id: eventId,
      path: relPath.replace(/\\/g, "/"),
      league_id: leagueId,
      start_time: event.start_time,
      // hash_sha256 can be added in v0.2 if you want integrity checks
      hash_sha256: "TO_BE_FILLED"
    });
  }

  return { eventsIndex, eventsCount: files.length, okCount, errorCount };
}

// 5. Write index files
function writeIndexes(eventsIndex, leagues) {
  if (!fs.existsSync(INDEX_DIR)) {
    fs.mkdirSync(INDEX_DIR, { recursive: true });
  }

  const now = new Date().toISOString();

  const eventsIndexDoc = {
    index_version: "0.1.0",
    generated_at: now,
    schema: "urn:usg:index:events:1.0",
    count: eventsIndex.length,
    events: eventsIndex
  };

  writeJson(path.join(INDEX_DIR, "events.index.json"), eventsIndexDoc);

  const leagueEntries = Object.values(leagues).map((league) => ({
    league_id: league.league_id,
    path: league.__path.replace(/\\/g, "/"),
    name: league.name,
    region: league.region || null,
    status: league.status || "active",
    hash_sha256: "TO_BE_FILLED"
  }));

  const leaguesIndexDoc = {
    index_version: "0.1.0",
    generated_at: now,
    schema: "urn:usg:index:leagues:1.0",
    count: leagueEntries.length,
    leagues: leagueEntries
  };

  writeJson(path.join(INDEX_DIR, "leagues.index.json"), leaguesIndexDoc);
}

// 6. Sanity-check registry metadata counts
function updateMetadataCounts(metadataPath, metadata, eventsCount, leagueCount) {
  metadata.counts = metadata.counts || {};
  metadata.counts.events = eventsCount;
  metadata.counts.leagues = leagueCount;

  writeJson(metadataPath, metadata);
}

// Main runner
function main() {
  console.log("🔍 Validating USG registry…");

  const { validateEvent } = loadSchemas();
  const { metadata, metadataPath } = loadRegistryMetadata();
  const { leagues, leagueCount } = loadLeagues();
  const { eventsIndex, eventsCount, okCount, errorCount } =
    loadAndValidateEvents(validateEvent, leagues);

  writeIndexes(eventsIndex, leagues);
  updateMetadataCounts(metadataPath, metadata, eventsCount, leagueCount);

  console.log("");
  console.log("✅ Registry validation complete.");
  console.log(`   Events (total files): ${eventsCount}`);
  console.log(`   Events (valid):       ${okCount}`);
  console.log(`   Events (errors):      ${errorCount}`);
  console.log(`   Leagues (total):      ${leagueCount}`);
  console.log("   Indexes rebuilt:      events.index.json, leagues.index.json");
  console.log("");

  if (errorCount > 0) {
    console.error("❌ Registry has validation errors. See logs above.");
    process.exitCode = 1;
  } else {
    console.log("🎉 Registry is consistent and schema-valid (v0.1.0).");
  }
}

main();
