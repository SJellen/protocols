# Protocols by Scott Jellen  
### RFC Series · Digital Public Infrastructure · Interoperability Standards  

This repository serves as the canonical source for my protocol work, RFC documents,  
schemas, and reference artifacts. It functions as a public, versioned archive for  
frameworks that define interoperable, humanity-first digital infrastructure.

The goal:  
**Author standards that make complex systems—sports, media, education, commerce—interoperable, portable, and governable.**

All whitepapers are DOI-backed via Zenodo.  
All RFCs are maintained in plain-text Markdown for transparency, citation stability, and long-term accessibility.

---

## 📘 Status of This Repository

> **Status:** Active · Early Specification Stage  
> RFCs may be Informational or Standards-Track as noted.  
> Reference artifacts are illustrative in scope but **normative in structure**.

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

- **DOI (All Versions):** https://doi.org/10.5281/zenodo.17807795  
- **RFC Markdown:** [`/rfc/rfc-0003-usg-registry-architecture.md`](./rfc/rfc-0003-usg-registry-architecture.md)

---

### **USG Reference Registry (v0.1.1)**  
*A canonical, CI-validated JSON registry defining leagues, teams, venues, broadcasters, rights bundles, and events.*

The registry is a reference implementation of the architecture defined in RFC 0003, providing authoritative identifiers and metadata that USG-compatible systems MUST resolve when validating entitlements and generating settlement records.

- **Registry Path:** [`/registry`](./registry)  
- **Version:** `0.1.1`  
- **Status:** Pilot (reference implementation)  
- **Validation:** Schema-validated and referentially enforced via CI  
- **Aligns With:** RFC 0001, RFC 0002, RFC 0003

---

## 🔎 Reference Implementation ⬅ NEW

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

## 📘 Whitepapers (Source Markdown)

Markdown source files corresponding to published whitepapers are stored in `/whitepapers/`.  
All canonical DOI-linked PDFs are available on Zenodo:

🔗 https://zenodo.org/search?q=metadata.creators.person_or_org.name%3A%22Jellen%2C%20Scott%22

This repo hosts the **source layer**—the editable, version-controlled foundation for each paper.

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

Schema versions follow **semantic versioning**:

- `1.0` — initial public release  
- `1.1` — non-breaking additions  
- `2.0` — breaking structural changes  

URN pattern:


```` urn:usg:schema:<name>:<version> ````

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



