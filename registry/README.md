# USG Reference Registry (v0.1.0)

This directory contains the **reference registry** for the Universal Sports Graph (USG).

The registry provides canonical identifiers and minimal metadata for:

- leagues (`/leagues`)
- teams (`/teams`)
- venues (`/venues`)
- broadcasters / platforms (`/broadcasters`)
- rights bundles (`/rights-bundles`)
- events (`/events`)

Every event file in `/events` is a single JSON object conforming to the
`urn:usg:schema:event:1.1` specification (ID-first registry profile).

Registry records are intended to act as the ground truth for:

- entitlement validation (RFC 0002 — USG Entitlement Token Profile)
- clearinghouse settlement records
- future USG APIs and SDKs


---

## Design Principles

- **Canonical Identifiers**  
  `event_id`, `league_id`, and related keys form the primary lookup namespace.

- **One File = One Object**  
  Each registry file contains exactly one JSON document.

- **Schema-Backed**  
  All event files MUST validate against `urn:usg:schema:event:1.1` (ID-first registry
  schema). Validation is enforced by the USG registry validator.

  Schemas for leagues, teams, venues, broadcasters, and rights bundles are currently
  informational and enforced structurally by the validator.

- **Append-Only Semantics**  
  Corrections and updates are handled through Git history and, later, explicit  
  supersession metadata—not destructive edits.

- **Deterministic JSON**  
  Stable key ordering and consistent formatting support diffability and auditability.

---

## Validation & Indexing

The validator performs the following actions:

- validates events against `urn:usg:schema:event:1.1`
- enforces referential integrity across all registry objects
- computes SHA-256 integrity hashes for each object
- regenerates deterministic index files in `/_index/`
- updates registry object counts in `registry-metadata.json`

Index files are **generated artifacts** and **MUST NOT** be edited manually.

The registry is validated and indexed using the USG registry validator:

```bash
node tools/validate-registry.js
```

---

## Versioning

Global registry metadata is recorded in `registry-metadata.json`, including:

- registry identifier
- semantic version (e.g., `0.1.0`)
- object counts by category
- notes for each release

Individual objects MAY include a `metadata.usg_version_added` field to indicate the version
they first appeared in.

## Status

This v0.1.0 registry is illustrative and intended for:

- implementers exploring USG semantics
- sandbox deployments
- schema validation
- example integrations

It is not production-grade, but its structure, validation rules, and referential
semantics are normative for any USG-compliant registry.

Future registry releases will:

- expand event coverage
- publish schemas for all object types
- define supersession and withdrawal semantics
- provide a backed, read-only API
- support a TypeScript SDK and automated validation tooling

