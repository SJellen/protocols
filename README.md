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
| RFC 0001        | Universal Sports Graph         | Informational                  | Active |
| RFC 0002        | USG Entitlement Token Profile  | Standards-Track (Experimental) | Active |
| RFC 0003        | USG Registry Architecture      | Standards-Track                | Active |
| Registry v0.1.1 | USG Reference Registry | Reference Artifact | Pilot · CI-enforced |




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
- **Aligns With:** RFC 0001 (Rights Registry Layer), RFC 0002 (Entitlement Token Profile), RFC 0003 (Registry Architecture)

#### Registry Validation & CI Enforcement

All registry records are validated using a schema-backed validator and checked for referential integrity.  
Validation is enforced via GitHub Actions on every pull request and push to `main`.

Invalid registry changes fail CI and are blocked from merge.


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

🔗 https://zenodo.org/search?q=Scott%20Jellen

This repo hosts the **source layer**—the editable, version-controlled foundation for each paper.

---

## 🧪 Schemas & Reference Specifications

Schemas define interface contracts for RFC implementations.  
All schemas use **URN identifiers** for longevity and independence from hosting.

Included:

- **Event Schema** — `urn:usg:schema:event:1.1`  
  Previous versions remain available for reference but are not validated in the current registry.


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

URNs follow the pattern:



```` urn:usg:schema:<name>:<version> ````

---

## 🗂 Repository Structure

``` 
protocols/
├── .github/workflows/ # CI enforcement for registry validation
├── rfc/ # Formal RFC markdown documents
├── whitepapers/ # Markdown source versions of whitepapers
├── briefs/ # Strategy briefs and early conceptual memos
├── schemas/ # JSON schemas + sample payloads
├── diagrams/ # SVG/PNG architecture diagrams
├── public-assets/ # Covers, metadata blocks, shared visuals
├── registry/ # USG Reference Registry v0.1.1 (CI-validated)
├── LICENSE.md # CC BY-NC-SA 4.0 license
└── README.md # This file
```


---

## License

Textual content (RFCs, whitepapers, briefs) is licensed under  
**Creative Commons Attribution–NonCommercial–ShareAlike 4.0 (CC BY-NC-SA 4.0)**.

Licensing terms may evolve as specifications mature toward implementation and adoption.


Example schemas and sample JSON are provided for illustrative and non-commercial research use.  
For commercial or production use, additional licensing may be required.


---

## 🛠 Contributions

This is an author-maintained standards repository.  
External pull requests are not currently accepted.  
Issues, questions, and feedback are welcome.

---

## 🔗 External Links

- **Portfolio:** https://www.scottjellen.com  
- **LinkedIn:** https://www.linkedin.com/in/scottjellen  
- **Zenodo (DOIs):**  
  https://zenodo.org/search?q=metadata.creators.person_or_org.name%3A%22Jellen%2C%20Scott%22  
- **Google Scholar:** *(will appear after indexing)*

---

## 📬 Contact

**scottjellendev@gmail.com**  
Open to collaboration on digital public infrastructure, protocol design, and standards architecture.

---


