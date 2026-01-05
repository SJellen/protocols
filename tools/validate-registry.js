// tools/validate-registry.js
// USG registry validator + index builder (v0.2)
// - validates all registry object directories
// - enforces referential integrity (ID-first)
// - computes sha256 hashes
// - writes deterministic index files
// - updates registry metadata counts

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ROOT = process.cwd();
const REGISTRY_DIR = path.join(ROOT, "registry");
const SCHEMAS_DIR = path.join(ROOT, "schemas", "usg");
const INDEX_DIR = path.join(REGISTRY_DIR, "_index");

// ---------- Utility helpers ----------
function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function readJson(filePath) {
  const raw = readText(filePath);
  return JSON.parse(raw);
}

function writeJson(filePath, data) {
  const serialized = JSON.stringify(data, null, 2) + "\n";
  fs.writeFileSync(filePath, serialized, "utf8");
}

function sha256HexFromFile(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function listJsonFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath).filter((f) => f.endsWith(".json"));
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function normalizeRelPath(fullPath) {
  return path.relative(REGISTRY_DIR, fullPath).replace(/\\/g, "/");
}

// ---------- 1) Load schemas ----------
function loadSchemas() {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);

  // Event schema v1.1 (ID-first)
  const eventSchemaPath = path.join(SCHEMAS_DIR, "event-schema.v1.1.json");
  if (!fs.existsSync(eventSchemaPath)) {
    throw new Error(
      `Missing event schema v1.1 at: ${eventSchemaPath}\n` +
        `Create schemas/usg/event-schema.v1.1.json to match your ID-first event shape.`
    );
  }

  const eventSchema = readJson(eventSchemaPath);
  const validateEvent = ajv.compile(eventSchema);

  return { validateEvent };
}

// ---------- 2) Load registry metadata ----------
function loadRegistryMetadata() {
  const metadataPath = path.join(REGISTRY_DIR, "registry-metadata.json");
  if (!fs.existsSync(metadataPath)) {
    throw new Error(`Missing registry-metadata.json at: ${metadataPath}`);
  }
  return { metadata: readJson(metadataPath), metadataPath };
}

// ---------- 3) Generic loader for registry objects ----------
function loadObjects({ dirName, idKey, label }) {
  const dirPath = path.join(REGISTRY_DIR, dirName);
  if (!fs.existsSync(dirPath)) {
    throw new Error(`Missing ${label} directory at: ${dirPath}`);
  }

  const files = listJsonFiles(dirPath);
  const map = {};
  const entries = [];

  let errorCount = 0;

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const relPath = normalizeRelPath(fullPath);

    let obj;
    try {
      obj = readJson(fullPath);
    } catch (e) {
      console.error(`❌ [${label}] Failed to parse JSON: ${relPath}`);
      errorCount++;
      continue;
    }

    const id = obj[idKey];
    if (!id || typeof id !== "string") {
      console.error(`❌ [${label}] ${relPath} is missing ${idKey}`);
      errorCount++;
      continue;
    }

    if (map[id]) {
      console.error(`❌ [${label}] Duplicate ${idKey} detected: ${id}`);
      errorCount++;
      continue;
    }

    const hash = sha256HexFromFile(fullPath);

    map[id] = { ...obj, __path: relPath, __hash: hash };
    entries.push({
      id,
      path: relPath,
      hash_sha256: hash,
    });
  }

  // deterministic order
  entries.sort((a, b) => a.id.localeCompare(b.id));

  return {
    map,
    filesCount: files.length,
    okCount: entries.length,
    errorCount,
    entries,
  };
}

// ---------- 4) Validate events (schema + referential integrity) ----------
function loadAndValidateEvents({ validateEvent, leagues, teams, venues, broadcasters, rightsBundles }) {
  const dirName = "events";
  const label = "event";
  const idKey = "event_id";

  const dirPath = path.join(REGISTRY_DIR, dirName);
  if (!fs.existsSync(dirPath)) {
    throw new Error(`Missing events directory at: ${dirPath}`);
  }

  const files = listJsonFiles(dirPath);
  const eventsIndex = [];

  let okCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const relPath = normalizeRelPath(fullPath);

    let event;
    try {
      event = readJson(fullPath);
    } catch (e) {
      console.error(`❌ [${label}] Failed to parse JSON: ${relPath}`);
      errorCount++;
      continue;
    }

    const eventId = event[idKey];
    if (!eventId) {
      console.error(`❌ [${label}] ${relPath} is missing ${idKey}`);
      errorCount++;
      continue;
    }

    // Schema validation (v1.1)
    const valid = validateEvent(event);
    if (!valid) {
      console.error(`❌ [${label}] ${eventId} failed schema validation`);
      console.error(validateEvent.errors);
      errorCount++;
      continue;
    }

    // Referential integrity (strict, no coercion)
    const leagueId = event.league_id;
    if (!leagueId || !leagues[leagueId]) {
      console.error(`❌ [${label}] ${eventId} references unknown league_id: "${leagueId}"`);
      errorCount++;
      continue;
    }

    const homeTeamId = event.home_team_id;
    if (!homeTeamId || !teams[homeTeamId]) {
      console.error(`❌ [${label}] ${eventId} references unknown home_team_id: "${homeTeamId}"`);
      errorCount++;
      continue;
    }

    const awayTeamId = event.away_team_id;
    if (!awayTeamId || !teams[awayTeamId]) {
      console.error(`❌ [${label}] ${eventId} references unknown away_team_id: "${awayTeamId}"`);
      errorCount++;
      continue;
    }

    const broadcasterId = event.broadcaster_id;
    if (!broadcasterId || !broadcasters[broadcasterId]) {
      console.error(`❌ [${label}] ${eventId} references unknown broadcaster_id: "${broadcasterId}"`);
      errorCount++;
      continue;
    }

    // Optional references
    if (event.venue_id) {
      if (!venues[event.venue_id]) {
        console.error(`❌ [${label}] ${eventId} references unknown venue_id: "${event.venue_id}"`);
        errorCount++;
        continue;
      }
    }

    if (event.rights_bundle_id) {
      if (!rightsBundles[event.rights_bundle_id]) {
        console.error(
          `❌ [${label}] ${eventId} references unknown rights_bundle_id: "${event.rights_bundle_id}"`
        );
        errorCount++;
        continue;
      }
    }

    // Hash
    const hash = sha256HexFromFile(fullPath);

    okCount++;
    eventsIndex.push({
      event_id: eventId,
      path: relPath,
      league_id: leagueId,
      start_time: event.start_time,
      home_team_id: homeTeamId,
      away_team_id: awayTeamId,
      broadcaster_id: broadcasterId,
      venue_id: event.venue_id || null,
      rights_bundle_id: event.rights_bundle_id || null,
      hash_sha256: hash,
    });
  }

  // deterministic order
  eventsIndex.sort((a, b) => a.event_id.localeCompare(b.event_id));

  return { eventsIndex, filesCount: files.length, okCount, errorCount };
}

// ---------- 5) Write index files ----------
function writeIndexes({
  eventsIndex,
  leaguesIndex,
  teamsIndex,
  venuesIndex,
  broadcastersIndex,
  rightsBundlesIndex,
}) {
  ensureDir(INDEX_DIR);
  const now = new Date().toISOString();

  const writeIndex = (filename, schemaUrn, itemsKey, items) => {
    const doc = {
      index_version: "0.2.0",
      generated_at: now,
      schema: schemaUrn,
      count: items.length,
      [itemsKey]: items,
    };
    writeJson(path.join(INDEX_DIR, filename), doc);
  };

  writeIndex("events.index.json", "urn:usg:index:events:1.0", "events", eventsIndex);
  writeIndex("leagues.index.json", "urn:usg:index:leagues:1.0", "leagues", leaguesIndex);
  writeIndex("teams.index.json", "urn:usg:index:teams:1.0", "teams", teamsIndex);
  writeIndex("venues.index.json", "urn:usg:index:venues:1.0", "venues", venuesIndex);
  writeIndex(
    "broadcasters.index.json",
    "urn:usg:index:broadcasters:1.0",
    "broadcasters",
    broadcastersIndex
  );
  writeIndex(
    "rights-bundles.index.json",
    "urn:usg:index:rights-bundles:1.0",
    "rights_bundles",
    rightsBundlesIndex
  );
}

// ---------- 6) Update registry metadata counts ----------
function updateMetadataCounts(metadataPath, metadata, counts) {
  metadata.counts = metadata.counts || {};
  // store both file counts and valid counts
  metadata.counts.leagues_files = counts.leagues_files;
  metadata.counts.leagues_valid = counts.leagues_valid;

  metadata.counts.teams_files = counts.teams_files;
  metadata.counts.teams_valid = counts.teams_valid;

  metadata.counts.venues_files = counts.venues_files;
  metadata.counts.venues_valid = counts.venues_valid;

  metadata.counts.broadcasters_files = counts.broadcasters_files;
  metadata.counts.broadcasters_valid = counts.broadcasters_valid;

  metadata.counts.rights_bundles_files = counts.rights_bundles_files;
  metadata.counts.rights_bundles_valid = counts.rights_bundles_valid;

  metadata.counts.events_files = counts.events_files;
  metadata.counts.events_valid = counts.events_valid;

  writeJson(metadataPath, metadata);
}

// ---------- Main runner ----------
function main() {
  console.log("🔍 Validating USG registry…");

  const { validateEvent } = loadSchemas();
  const { metadata, metadataPath } = loadRegistryMetadata();

  // Load all non-event object maps
  const leaguesRes = loadObjects({ dirName: "leagues", idKey: "league_id", label: "league" });
  const teamsRes = loadObjects({ dirName: "teams", idKey: "team_id", label: "team" });
  const venuesRes = loadObjects({ dirName: "venues", idKey: "venue_id", label: "venue" });
  const broadcastersRes = loadObjects({
    dirName: "broadcasters",
    idKey: "broadcaster_id",
    label: "broadcaster",
  });
  const rightsBundlesRes = loadObjects({
    dirName: "rights-bundles",
    idKey: "rights_bundle_id",
    label: "rights-bundle",
  });

  // Validate referential integrity for non-events (teams, bundles)
  let refErrorCount = 0;

  // team.league_id must exist
  for (const [teamId, team] of Object.entries(teamsRes.map)) {
    if (!team.league_id || !leaguesRes.map[team.league_id]) {
      console.error(
        `❌ [team] ${teamId} references unknown league_id: "${team.league_id}"`
      );
      refErrorCount++;
    }
  }

  // rights_bundle.league_id must exist
  for (const [rbId, rb] of Object.entries(rightsBundlesRes.map)) {
    if (!rb.league_id || !leaguesRes.map[rb.league_id]) {
      console.error(
        `❌ [rights-bundle] ${rbId} references unknown league_id: "${rb.league_id}"`
      );
      refErrorCount++;
    }
  }

  // Validate events (schema + referential integrity)
  const eventsRes = loadAndValidateEvents({
    validateEvent,
    leagues: leaguesRes.map,
    teams: teamsRes.map,
    venues: venuesRes.map,
    broadcasters: broadcastersRes.map,
    rightsBundles: rightsBundlesRes.map,
  });

  // Build richer index entries (include a few display fields deterministically)
  const leaguesIndex = Object.values(leaguesRes.map)
    .map((l) => ({
      league_id: l.league_id,
      path: l.__path,
      name: l.name || null,
      region: l.region || null,
      status: l.status || "active",
      hash_sha256: l.__hash,
    }))
    .sort((a, b) => a.league_id.localeCompare(b.league_id));

  const teamsIndex = Object.values(teamsRes.map)
    .map((t) => ({
      team_id: t.team_id,
      path: t.__path,
      league_id: t.league_id || null,
      name: t.name || null,
      short_name: t.short_name || null,
      status: t.status || "active",
      hash_sha256: t.__hash,
    }))
    .sort((a, b) => a.team_id.localeCompare(b.team_id));

  const venuesIndex = Object.values(venuesRes.map)
    .map((v) => ({
      venue_id: v.venue_id,
      path: v.__path,
      name: v.name || null,
      city: v.city || null,
      country: v.country || null,
      timezone: v.timezone || null,
      status: v.status || "active",
      hash_sha256: v.__hash,
    }))
    .sort((a, b) => a.venue_id.localeCompare(b.venue_id));

  const broadcastersIndex = Object.values(broadcastersRes.map)
    .map((b) => ({
      broadcaster_id: b.broadcaster_id,
      path: b.__path,
      name: b.name || null,
      type: b.type || null,
      official_site: b.official_site || null,
      status: b.status || "active",
      hash_sha256: b.__hash,
    }))
    .sort((a, b) => a.broadcaster_id.localeCompare(b.broadcaster_id));

  const rightsBundlesIndex = Object.values(rightsBundlesRes.map)
    .map((rb) => ({
      rights_bundle_id: rb.rights_bundle_id,
      path: rb.__path,
      league_id: rb.league_id || null,
      access_model: rb.access_model || null,
      default_price_usd: rb.default_price_usd ?? null,
      status: rb.status || "active",
      hash_sha256: rb.__hash,
    }))
    .sort((a, b) => a.rights_bundle_id.localeCompare(b.rights_bundle_id));

  // Write index files
  writeIndexes({
    eventsIndex: eventsRes.eventsIndex,
    leaguesIndex,
    teamsIndex,
    venuesIndex,
    broadcastersIndex,
    rightsBundlesIndex,
  });

  // Update metadata counts
  updateMetadataCounts(metadataPath, metadata, {
    leagues_files: leaguesRes.filesCount,
    leagues_valid: leaguesRes.okCount,

    teams_files: teamsRes.filesCount,
    teams_valid: teamsRes.okCount,

    venues_files: venuesRes.filesCount,
    venues_valid: venuesRes.okCount,

    broadcasters_files: broadcastersRes.filesCount,
    broadcasters_valid: broadcastersRes.okCount,

    rights_bundles_files: rightsBundlesRes.filesCount,
    rights_bundles_valid: rightsBundlesRes.okCount,

    events_files: eventsRes.filesCount,
    events_valid: eventsRes.okCount,
  });

  const dirErrors =
    leaguesRes.errorCount +
    teamsRes.errorCount +
    venuesRes.errorCount +
    broadcastersRes.errorCount +
    rightsBundlesRes.errorCount;

  const totalErrors = dirErrors + refErrorCount + eventsRes.errorCount;

  console.log("");
  console.log("✅ Registry validation complete.");
  console.log(`   Leagues (files/valid):        ${leaguesRes.filesCount}/${leaguesRes.okCount}`);
  console.log(`   Teams (files/valid):          ${teamsRes.filesCount}/${teamsRes.okCount}`);
  console.log(`   Venues (files/valid):         ${venuesRes.filesCount}/${venuesRes.okCount}`);
  console.log(`   Broadcasters (files/valid):   ${broadcastersRes.filesCount}/${broadcastersRes.okCount}`);
  console.log(
    `   Rights Bundles (files/valid): ${rightsBundlesRes.filesCount}/${rightsBundlesRes.okCount}`
  );
  console.log(`   Events (files/valid):         ${eventsRes.filesCount}/${eventsRes.okCount}`);
  console.log("   Indexes rebuilt:              events, leagues, teams, venues, broadcasters, rights-bundles");
  console.log("");

  if (totalErrors > 0) {
    console.error(`❌ Registry has validation errors. Total: ${totalErrors}`);
    process.exitCode = 1;
  } else {
    console.log("🎉 Registry is consistent, schema-valid, and referentially sound (v0.1.1).");
  }
}

main();

