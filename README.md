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
> All RFCs and schemas are *informational* unless otherwise noted.  
> Examples are illustrative and non-normative.

---

## 📡 RFC Series

### RFC Index

| Number     | Title                                | Category                       | Status |
|------------|----------------------------------------|-------------------------------|--------|
| RFC 0001   | Universal Sports Graph                 | Informational                 | Active |
| RFC 0002   | USG Entitlement Token Profile          | Standards-Track (Experimental) | Draft  |

---

### **RFC 0001 — The Universal Sports Graph**
*A protocol for rights, reach, and real-time access.*

Defines a machine-readable rights registry, a universal Access API, and a neutral clearinghouse for settlement and auditability.

- **DOI (Whitepaper):** https://doi.org/10.5281/zenodo.17807503
- **RFC Markdown:** [`/rfc/rfc-0001-universal-sports-graph.md`](./rfc/rfc-0001-universal-sports-graph.md)

---

### **RFC 0002 — USG Entitlement Token Profile**
*A standards-track specification for tokenized sports access.*

Defines the token structure, required and optional claims, validation rules, security properties, and interoperability expectations for entitlement tokens within the USG ecosystem. Updates RFC 0001 by specifying the authorization layer necessary for interoperable access.

- **DOI:** https://doi.org/10.5281/zenodo.17807795
- **RFC Markdown:** [`/rfc/rfc-0002-usg-entitlement-token.md`](./rfc/rfc-0002-usg-entitlement-token.md)

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

- **Event Schema** — `urn:usg:schema:event:1.0`  
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
├── rfc/ # Formal RFC markdown documents
├── whitepapers/ # Markdown source versions of whitepapers
├── briefs/ # Strategy briefs and early conceptual memos
├── schemas/ # JSON schemas + sample payloads
├── diagrams/ # SVG/PNG architecture diagrams
├── public-assets/ # Covers, metadata blocks, shared visuals
├── LICENSE.md # CC BY-NC 4.0 license
└── README.md # This file
```

---

## License

Textual content (RFCs, whitepapers, briefs) is licensed under **CC BY-NC 4.0**.

Example schemas and sample JSON are provided for illustrative and non-commercial research use.  
For commercial or production use, please contact the author.


---

## 🛠 Contributions

This is an author-maintained standards repository.  
External pull requests are not currently accepted.  
Issues, questions, and feedback are welcome.

---

## 🔗 External Links

- **Portfolio:** https://www.scottjellen.com  
- **LinkedIn:** https://www.linkedin.com/in/scottjellen  
- **Zenodo (DOIs):** https://zenodo.org/search?q=metadata.creators.person_or_org.name%3A%22Jellen%2C%20Scott%22&l=list&p=1&s=10&sort=bestmatch
- **Google Scholar:** *(will appear after indexing)*

---

## 📬 Contact

**scottjellendev@gmail.com**  
Open to collaboration on digital public infrastructure, protocol design, and standards architecture.

---

