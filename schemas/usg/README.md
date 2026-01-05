# USG Schema Registry

This directory (`protocols/schemas/usg/`) contains the **informational JSON Schemas**
and example instances that support the **Universal Sports Graph (USG)** protocol.

> **Normative Source:**  
> These schemas are *informational profiles* derived from the minimal event schema in  
> **Appendix A** of *The Universal Sports Graph — Blueprint Edition v1.0*  
> (DOI: 10.5281/zenodo.17537287) and from **Section 4.1** of **RFC 0001 – USG**.  
> In any discrepancy, the **Blueprint and RFC** remain authoritative.

All schemas use **URN-based identifiers**, providing stable, location-independent
names that are not tied to hosting or repository location.

These files serve as implementation aids, validators, and reference models for
third-party developers, researchers, and pilot environments.

---

## 📦 Available Schemas

### **1. Event Schema**

**Registry Schema (ID-First)** 

This schema is enforced by the USG registry validator and defines the required
shape for all registry-backed event records.


**URN:** `urn:usg:schema:event:1.1`  
**File:** `event-schema.v1.1.json`

Defines the canonical, ID-first structure for a single sports event within the USG
reference registry. All cross-entity references (league, teams, broadcaster, venue,
rights bundle) MUST use canonical registry identifiers.

This schema is enforced by the USG registry validator and is intended for
registry-backed implementations.

**Legacy / Informational Schema**  
**URN:** `urn:usg:schema:event:1.0`  
**File:** `event-schema.v1.0.json`

Defines an earlier, display-oriented event profile derived from Appendix A of the
USG Blueprint. Retained for backward compatibility and documentation purposes.


---

### **2. Entitlement Token Schema**  
**URN:** `urn:usg:schema:entitlement-token:1.0`  
**File:** `entitlement-token.v1.0.json`  

Defines the response payload returned by the `/entitlements/issue` endpoint.
Represents a scoped, time-limited authorization token (e.g., JWT format) granting access
to a specific event.

---

### **3. Settlement Record Schema**  
**URN:** `urn:usg:schema:settlement-record:1.0`  
**File:** `settlement-record.v1.0.json`  

Defines a normalized record inside the USG clearinghouse ledger.  
Encodes per-transaction metadata, revenue allocation (40/40/20), timestamps, and
ledger hashes for audit and reconciliation.

---

## 📁 Examples

Example JSON instances that validate against the schemas are located in:

protocols/schemas/usg/examples/


Files include:

- `event.sample.json` — Expanded event profile (optional fields included)  
- `event.minimal.sample.json` — Minimal event object matching RFC 0001 & Appendix A  
- `entitlement.sample.json`  
- `settlement-record.sample.json`

Examples are **illustrative only** and are **not normative**.

---

## 🔍 Why URNs?

URNs (Uniform Resource Names):

- provide permanent, location-independent identifiers  
- avoid URL drift, hosting changes, or repo restructuring issues  
- match conventions used by IETF, W3C, ISO, and DID specifications  
- ensure schemas remain stable across versions and implementations  

A URN is a **name**, not a network location — ideal for protocol-grade specifications.

---

## 📚 Related Documents

- **RFC 0001 – Universal Sports Graph (USG)**  
  Defines the rights registry, Access API, entitlement model, settlement flow, and  
  clearinghouse governance.  
  *(See `/protocols/rfc/rfc-0001-universal-sports-graph.md` or DOI-linked PDF.)*

- **USG Whitepaper – Blueprint Edition v1.0**  
  DOI: `10.5281/zenodo.17537287`  
  Provides economic justification, governance rationale, and minimal schema definition.

---

## 📜 License

All schemas, examples, and protocol materials in this repository — including the 
USG Blueprint, RFC Series, Briefs, Diagrams, and accompanying documentation — 
are released under the **Creative Commons Attribution–NonCommercial–ShareAlike 
4.0 International (CC BY-NC-SA 4.0)** license.

This ensures that the Universal Sports Graph (USG) and its related specifications 
remain openly available for non-commercial use, research, adaptation, and 
interoperability work, while requiring derivative versions to be shared under 
the same license to preserve the integrity of the public-good standard.
