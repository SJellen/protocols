# USG Canonical Identifier Contract

**Status:** Draft — Implementation Design  
**Version:** 0.1.0  
**Applies to:** USG Reference Registry and Reference Resolver  
**Related Specifications:** RFC 0001, RFC 0002, RFC 0003

## 1. Purpose

This document defines the proposed identifier contract between the
Universal Sports Graph reference registry, entitlement interfaces,
and reference resolver.

The objective is to establish stable, interoperable object identifiers
while preserving compatibility with existing registry records and
published RFC examples.

This document does not amend the published RFCs or establish full
RFC 0003 conformance.

## 2. Canonical Identifier Format

The reference implementation adopts the provisional USG namespace
introduced in RFC 0001 and RFC 0002:

    urn:usg:{category}:{identifier}

Example:

    urn:usg:event:nba_2025_gsw_lal_0410

The `urn:usg` namespace is provisional and is not represented as
an IANA-registered URN namespace.

Canonical identifiers:

- MUST remain stable once assigned.
- MUST NOT be reused for different entities.
- MUST be unique within the publishing registry.
- MUST be treated as opaque strings by consumers.
- MUST resolve within a documented authority scope.

## 3. Legacy Identifiers

Existing reference records use short identifiers.

Example:

    nba_2025_gsw_lal_0410

The corresponding proposed canonical identifier is:

    urn:usg:event:nba_2025_gsw_lal_0410

The registry MAY preserve existing short identifiers as local
record keys and compatibility aliases.

Canonical identifiers must not be inferred by consumers through
uncontrolled string manipulation.

Mappings between local identifiers and canonical identifiers
must be explicit, deterministic, and unambiguous.

## 4. Registry Object Identity

RFC 0003 defines the canonical object identity using the `id` field.

A future conforming event representation will include:

    type
    id
    version
    meta

The `id` field will contain the canonical identifier.

Existing `event_id`, `team_id`, and similar fields may remain
available during migration for compatibility.

Any retained legacy identifier fields must have explicitly
documented semantics.

Canonical identity must not depend on the filename.

## 5. Resolver Behavior

The reference resolver will resolve canonical identifiers to
their associated registry objects.

During migration, previously published short identifiers may
be supported through explicit alias mappings.

Resolver implementations must not:

- Guess object identity from identifier components.
- Treat unrelated identifiers as equivalent.
- Silently invent aliases.
- Return a different object when an identifier is unknown.

The existing resolver's demonstration identifiers are not
automatically equivalent to identifiers in the reference registry.

## 6. Entitlement Compatibility

RFC 0002 uses `event_id` as a required entitlement-token claim.

Existing examples use short event identifiers.

During migration:

- Existing identifiers remain supported through documented mappings.
- Canonical identifiers become the target representation for new integrations.
- Tokens must resolve to the intended authoritative event.
- Unknown or ambiguous identifiers must fail resolution.
- No published token examples are modified by this document.

Any change to normative token-validation requirements requires
separate specification change control.

## 7. Authority and Uniqueness

Canonical identifier assignment must occur within a documented
registry authority scope.

Independent registries must not claim conflicting authority
over the same identifier.

A future federation implementation must preserve identifiers
issued by authoritative registries.

## 8. Implementation Sequence

1. Inventory existing identifiers in both repositories.
2. Define and verify explicit alias mappings.
3. Introduce canonical identifiers into registry object models.
4. Update registry validation and indexing.
5. Export a resolver-compatible registry snapshot.
6. Test canonical and legacy resolution behavior.
7. Document compatibility and migration boundaries.

Changes should be introduced incrementally without breaking
the existing reference dataset.

## 9. Deferred Work

The following are outside the scope of this initial contract:

- Complete RFC 0003 object-model conformance.
- Canonical JSON serialization and digest publication.
- Registry lifecycle enforcement.
- Federation and delegated registry authority.
- IANA namespace registration.
- Entitlement issuance and cryptographic validation.

These requirements will be addressed separately.