# Protocols by Scott Jellen  
### RFC Series · Digital Public Infrastructure · Interoperability Standards  

This repository serves as the canonical source for my protocol work, RFC documents,  
schemas, and reference artifacts. It functions as a public, versioned archive for  
frameworks that define interoperable, humanity-first digital infrastructure.


> **Context**
>  
> For an explanation of *why* these protocols exist and the problem they are
> designed to address, see  
> **`/memos/why-sports-rights-need-infrastructure.md`**.



The goal:  
**Author standards that make complex systems—sports, media, education, commerce—interoperable, portable, and governable.**

All whitepapers are DOI-backed via Zenodo.  
All RFCs are maintained in plain-text Markdown for transparency, citation stability, and long-term accessibility.

---

## 📘 Status of This Repository

> **Status:** Active · Early Specification Stage  
> RFCs may be Informational or Standards-Track as noted.  
> Reference artifacts are illustrative implementations. Conformance to published RFCs is documented explicitly and remains partial where noted.

---

## 📡 RFC Series

### RFC Index

| Number          | Title                          | Category                       | Status |
|-----------------|--------------------------------|--------------------------------|--------|
| RFC 0001        | Universal Sports Graph         | Informational                  | Active · Inspectable |
| RFC 0002        | USG Entitlement Token Profile  | Standards-Track (Experimental) | Active |
| RFC 0003        | USG Registry Architecture      | Standards-Track                | Active |
| Registry v0.1.1 | USG Reference Registry         | Reference Artifact             | Pilot · CI-enforced |

---

### **RFC 0001 — The Universal Sports Graph**  
*A protocol for rights, reach, and real-time access.*

Defines a machine-readable rights registry, a universal Access API, and a neutral clearinghouse for settlement and auditability.

- **DOI (All Versions):** https://doi.org/10.5281/zenodo.17565793  
- **RFC Markdown:** [`/rfc/rfc-0001-universal-sports-graph.md`](./rfc/rfc-0001-universal-sports-graph.md)

---

### **RFC 0002 — USG Entitlement Token Profile**  
*A standards-track specification for tokenized sports access.*

Defines the token structure, required and optional claims, validation rules, security properties, and interoperability expectations for entitlement tokens within the USG ecosystem. Updates RFC 0001 by specifying the authorization layer necessary for interoperable access.

- **DOI (All Versions):** https://doi.org/10.5281/zenodo.17781619  
- **RFC Markdown:** [`/rfc/rfc-0002-usg-entitlement-token.md`](./rfc/rfc-0002-usg-entitlement-token.md)

---

### **RFC 0003 — USG Registry Architecture**  
*A standards-track specification for canonical sports rights registries.*

Defines the normative architecture for USG-compatible registries, including:
- required registry object models  
- canonical identifiers and lifecycle semantics  
- deterministic JSON formatting and integrity digests  
- index structures and directory layout  
- federation, authority, and key registry rules  
- mandatory validation requirements for implementations  

RFC 0003 formalizes how registries are constructed, validated, and trusted—completing the minimum viable USG protocol stack alongside RFC 0001 and RFC 0002.

- **DOI (All Versions):** https://doi.org/10.5281/zenodo.17942832
- **RFC Markdown:** [`/rfc/rfc-0003-usg-registry-architecture.md`](./rfc/rfc-0003-usg-registry-architecture.md)

---

### **USG Reference Registry (v0.1.1)**
*An illustrative JSON reference registry covering leagues, teams, venues, broadcasters, rights bundles, and events.*

The registry provides sample records and tooling for source validation, referential integrity, index generation, and independent index verification.

This implementation supports development and testing against the USG architecture but does not yet claim full RFC 0003 conformance. Canonical object modeling, comprehensive schema coverage, lifecycle management, and federation remain under development.

- **Registry Path:** [`/registry`](./registry)
- **Version:** `0.1.1`
- **Status:** Pilot (illustrative reference implementation)
- **Validation:** Event schema validation, identifier and referential checks, and automated CI testing
- **Integrity:** Generated indexes verified against source records using SHA-256 hashes and field comparisons
- **Specification Alignment:** RFC 0001, RFC 0002, and RFC 0003 (partial implementation)

---

---

## 🛠 Registry Development

The USG reference registry includes tooling for validating source records,
generating indexes, verifying integrity, and running automated tests.

### Setup

```bash
npm ci
```

### Registry Commands

| Command | Purpose |
|---|---|
| `npm run registry:check` | Validate registry source records without modifying files |
| `npm run registry:build` | Validate sources and generate registry indexes |
| `npm run registry:verify` | Verify generated indexes against their source records |
| `npm run registry:test` | Rebuild indexes and run automated integrity regression tests |

### Recommended Workflow

```bash
npm run registry:check
npm run registry:build
npm run registry:verify
npm run registry:test
```

Generated indexes are development artifacts and are not committed to the repository.
Run `registry:build` before `registry:verify` on a fresh checkout.

Automated regression tests use isolated temporary registry copies to verify
detection of corrupted fields, invalid hashes, and duplicate entries.

GitHub Actions runs registry validation, testing, and verification on
applicable changes.

The current tooling supports the illustrative reference registry and
does not constitute full RFC 0003 conformance.

## 🔎 Reference Implementation

The USG protocol stack includes a minimal, read-only **reference resolver** that
demonstrates deterministic resolution of canonical USG identifiers against a
pinned registry snapshot.

The resolver exists for **inspection and verification purposes only** and does
not introduce operational, production, or adoption commitments.

→ https://github.com/sjellen/usg-resolver

---

Additional RFCs will be published as formal protocol designs evolve.

---

## 📑 How to Cite

Use the DOI of the canonical PDF (Zenodo version) for formal citation.

**Jellen, Scott.** *The Universal Sports Graph: A Protocol for Rights, Reach, and Real-Time Access.*  
Zenodo, 2025. DOI: 10.5281/zenodo.17537287

---

## 📘 Foundational Research

The Universal Sports Graph originated as a DOI-backed whitepaper
and subsequently developed into a series of technical RFCs,
schemas, and reference implementations.

This repository maintains the protocol specifications, registry
artifacts, and supporting implementation tools.

Published whitepapers and research are archived on Zenodo.

- **USG Whitepaper:** https://doi.org/10.5281/zenodo.17537287
- **Research Archive:** https://zenodo.org/search?q=metadata.creators.person_or_org.name%3A%22Jellen%2C%20Scott%22

---

## 🧪 Schemas & Reference Specifications

Schemas define interface contracts for RFC implementations.  
All schemas use **URN identifiers** for longevity and independence from hosting.

Included:

- **Event Schema** — `urn:usg:schema:event:1.1`  
- **Entitlement Token Schema** — `urn:usg:schema:entitlement-token:1.0`  
- **Settlement Record Schema** — `urn:usg:schema:settlement-record:1.0`

See the full schema registry here:  
[`/schemas`](./schemas)

---

## 🔢 Versioning Model

USG specifications, schemas, registry artifacts, and reference implementations are versioned independently. A version change in one component does not automatically change the versions of the others.

| Component | Current Version | Scope |
|---|---|---|
| RFC 0001–0003 | Independently versioned | Published protocol specifications |
| Reference Registry | `0.1.1` | Illustrative registry dataset |
| Generated Index Format | `0.2.0` | Structure of generated registry indexes |
| Event Schema | `1.1` | Event record validation |
| Entitlement Token Schema | `1.0` | Entitlement API response structure |
| Settlement Record Schema | `1.0` | Settlement record structure |
| Reference Resolver | `v0.1` | Independent read-only HTTP implementation |

### Schema Versioning

Schema identifiers use major.minor version notation, with compatibility-oriented versioning conventions:

- `1.0` — Initial public release
- `1.1` — Backward-compatible additions
- `2.0` — Breaking structural changes

Schema URN pattern:

```text
urn:usg:schema:<name>:<version>
```

Registry versions describe reference datasets, while index-format versions describe generated artifact structures.

The reference resolver maintains its own implementation version and pinned registry snapshot. These versions are not currently synchronized with the reference registry in this repository.

Full compatibility and RFC conformance must be established through validation and testing, not inferred from version numbers alone.

---

## License

Textual content is licensed under  
**CC BY-NC-SA 4.0**.

---

## 🛠 Contributions

Author-maintained repository.  
External pull requests are not currently accepted.  
Issues and feedback are welcome.

---

## 🔗 External Links

- Portfolio: https://www.scottjellen.com  
- LinkedIn: https://www.linkedin.com/in/scottjellen  
- Zenodo: https://zenodo.org/search?q=metadata.creators.person_or_org.name%3A%22Jellen%2C%20Scott%22

---

## 📬 Contact

scottjellendev@gmail.com  
Open to collaboration on protocol design and digital public infrastructure.



