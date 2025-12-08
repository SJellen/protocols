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
`urn:usg:schema:event:1.0` specification. Registry records are intended to act as the
ground truth for:

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
  All event files MUST validate against `urn:usg:schema:event:1.0`.  
  Future versions will introduce schemas for leagues, teams, venues, and broadcasters.

- **Append-Only Semantics**  
  Corrections and updates are handled through Git history and, later, explicit  
  supersession metadata—not destructive edits.

- **Deterministic JSON**  
  Stable key ordering and consistent formatting support diffability and auditability.

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

It is not production-grade, but its structure is normative for any USG-compliant registry.

Future registry releases will:

- expand event coverage
- publish schemas for all object types
- define supersession and withdrawal semantics
- provide a backed, read-only API
- support a TypeScript SDK and automated validation tooling
