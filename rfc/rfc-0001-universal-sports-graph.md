# RFC 0001 — The Universal Sports Graph  
*A Specification for Rights, Reach, and Real-Time Access*

**Document Series:** USG-RFC  
**Series Number:** 0001  
**DOI:** 10.5281/zenodo.17565793  
**Updated By:** RFC 0002  
**Author:** Scott Jellen (Independent Researcher)  
**Date:** 2025  
**License:** CC BY-NC-SA 4.0  
**Status:** Informational (Standards-Track Profile)




<div style="page-break-after: always;"></div>

---

## Status of This Memo
This memo provides information for the Internet and digital-infrastructure community.  
It defines the **Universal Sports Graph (USG)**, a standards-based framework for interoperable sports-rights registration, tokenized access, and clearinghouse settlement.  
This document is not an Internet Standards Track specification; publication is for informational purposes to invite public review, pilot implementations, and comment.  
Distribution of this memo is unlimited.

---

## 1. Introduction
Live-sports distribution remains fragmented across closed ecosystems.  
The **Universal Sports Graph (USG)** defines a neutral interoperability protocol that treats broadcast rights as structured data and access as an API.  
By standardizing entitlements, authentication, and settlement through an open schema and neutral clearinghouse, USG converts fragmentation into incremental revenue and auditable trust.  
The protocol does not replace existing streaming platforms; it connects them.

---

## 2. Terminology and Definitions
- **Rights Registry** — continuously updated database describing ownership, territory, and terms.  
- **Entitlement Token** — cryptographically signed, time-limited authorization to view an event.  
- **Clearinghouse** — neutral entity that reconciles revenue and provides audit evidence.  
- **Day Pass** — single-event purchase, typically USD 4.99.  
- **Stakeholders** — Leagues, Platforms, Rights-Holders, Fans, and Regulators.

---

## 3. Architecture Overview
USG defines four cooperating layers:

1. Rights Graph Layer — rights as data.  
2. Access & Auth API — tokenized access.  
3. Clearinghouse Layer — revenue and audit reconciliation.  
4. UX Layer — consistent “Buy / Watch” modules.  

Each layer compounds the next: rights as data → access as API → clearinghouse as trust → UX as consistency.

---

## 4. Protocol Specification

### 4.1 Rights Registry Layer
Every event must be represented as a unique JSON object (`event_id`).

**Mandatory fields:**
- `event_id` *(string, required)* — unique identifier (e.g., `nba_2025_gsw_lal_0410`)  
- `league` *(string, required)* — league or governing body  
- `territory` *(array[string], required)* — ISO 3166-1 country codes  
- `rights_holder` *(string, required)* — entity responsible for production  
- `delivery_partner` *(string, optional)* — platform authorized to deliver  
- `price_usd` *(number, required)* — end-user price  
- `access_window` *(object, required)* — UTC start and end timestamps  
- `settlement_split` *(object, required)* — revenue allocation  
- `privacy_ref` *(URI, recommended)* — URL to privacy policy  

Records must be digitally signed and append-only.  
Public read-only discovery endpoints (e.g., `GET /rights/{event_id}`) may be implemented.

---

### 4.1.1 USG Reference Registry (v0.1.0)

A concrete, machine-readable reference registry is published in the USG protocols
repository at:

**https://github.com/sjellen/protocols/registry**

This snapshot is versioned as **USG Registry v0.1.0** and includes an illustrative
set of JSON records for leagues, teams, venues, broadcasters, rights bundles, and
events. The reference registry demonstrates a minimal, interoperable implementation
of the Rights Registry Layer defined in this RFC.

Deployments are not required to use this specific registry, but MUST preserve the
identifier stability, directory semantics, and record structure defined herein.


---

### 4.2 Access and Authentication API
**Endpoints**
- `POST /entitlements/issue` — request a time-limited entitlement token.  
- `GET /entitlements/verify/{token}` — validate an existing token.

**Request**
```json
{
  "event_id": "nba_2025_gsw_lal_0410",
  "user_id": "wallet_8234",
  "payment_token": "txn_5567"
}
```

**Response**

```json
{
  "entitlement_token": "base64url(JWT-token)",
  "expires": "2025-04-10T23:59Z"
}
```

Tokens must expire no later than `access_window.end`; must be signed (HMAC-SHA256 or better); may include scoped permissions; and must use unique `jti` nonces to prevent replay.

---

### 4.3 Clearinghouse and Settlement Layer

1. Each purchase must generate a transaction record with `txn_id`, `event_id`, `amount_usd`, `split`, and `timestamp`.
2. Records must be hash-chained (append-only).
3. Default allocation: 40% Platform / 40% Rights / 20% Clearinghouse.
4. Audit logs must omit PII and be exportable for compliance.

**Example**

```json
{
  "txn_id": "txn_5567",
  "event_id": "nba_2025_gsw_lal_0410",
  "amount_usd": 4.99,
  "split": {"platform": 1.996, "rights": 1.996, "clearinghouse": 0.998},
  "timestamp": "2025-04-10T19:31Z",
  "ledger_hash": "0000abcd..."
}
```

---

### 4.4 Governance and Interoperability Rules

* Voting shares: Leagues 40%, Platforms 30%, Trustees 20%, Audit Co-op 10%.
* Governance should be open-charter and publicly auditable.
* Protocol amendments must be versioned (`usg-v1.1`, etc.).
* Nodes may federate via API keys or mutual TLS.

---

### 4.5 Interoperability Testing

Implementers should use a public sandbox with mock events and validation suites.
Passing implementations may display **USG Compatible v1.0** designation.

---

## 5. Security Considerations

* All tokens must be signed; keys rotated every 90 days or less.
* All traffic must use TLS 1.3 or later.
* Each token must contain a unique `jti`; duplicates rejected.
* The ledger must be append-only and hash-chained.
* Private keys must remain inside secure HSM or TEE.
* Operators must publish security-contact and PGP keys.

---

## 6. Privacy and Compliance Alignment

* Protocol transacts entitlements, not streams or identities.
* Ledger records must exclude PII.
* User IDs should be pseudonymous.
* Consent must be explicit, revocable, and scoped.
* Portability must meet GDPR Article 20 and CCPA §1798.100.
* Sandbox environments should align with OECD Digital Public Infrastructure frameworks.
* Audit hooks must allow authorized regulators to access anonymized logs.

---

## 7. IANA and Governance Considerations

### 7.1 Provisional Namespace

```
urn:usg:{category}:{identifier}
```

**Examples**

* `urn:usg:event:nba_2025_gsw_lal_0410`
* `urn:usg:league:nba`

### 7.2 Change Control and Versioning

All schema changes must be submitted as draft RFC amendments and recorded in a public changelog.

### 7.3 Sports Interoperability Consortium (SIC)

| Stakeholder           | Voting Share | Role                    |
| --------------------- | ------------ | ----------------------- |
| Leagues / Federations | 40%          | Rights & policy         |
| Platforms / Networks  | 30%          | Distribution            |
| Independent Trustees  | 20%          | Ethics & consumer voice |
| Audit Co-operative    | 10%          | Compliance              |

Material changes require a two-thirds majority approval.
SIC should publish annual reports and open comment periods.

### 7.4 Future Standardization

Later versions may be submitted to IETF or OECD working groups.
Until then, USG remains a public Informational RFC under the SIC charter.

---

## 8. Implementation Roadmap

* **Phase 1 – Pilot (Year 1):** Schema v0.1 + sandbox clearinghouse; 5–10% conversion target.
* **Phase 2 – Consortium (Years 2–3):** Ratified charter + 500 events indexed.
* **Phase 3 – Industry Standard (Years 3–5):** USG in contracts / SDKs; ≥70% league coverage.
* **Phase 4 – Global Interop (5+ Years):** OECD / ITU council; “DNS of Sports Access.”

---

## 9. References

### 9.1 Normative

* RFC 2119 — *Key Words for Use in RFCs to Indicate Requirement Levels* (IETF, 1997)
* RFC 3986 — *Uniform Resource Identifier (URI): Generic Syntax* (IETF, 2005)

### 9.2 Informative

* OECD (2025). *Digital Transformation: Shaping a Trusted, Sustainable, and Inclusive Digital Future.*
* PwC (2025). *Sports Industry Outlook 2025.*
* Sportico (2025). *NBA Team Valuations 2025.*
* Digital Content Next (2025). *Streaming Live Sports.*
* The Wrap (2025). *Why Watching Sports Online Has Become a Convoluted Jigsaw Puzzle.*

---

## Appendix A — USG Reference Registry and Illustrative Workflow

This appendix provides two things:

1. A pointer to the **USG Reference Registry v0.1.0**, which contains real, machine-readable league, team, venue, broadcaster, rights-bundle, and event records.
2. A minimal illustrative workflow showing how an entitlement token may be issued and later settled using the event defined in the registry.

---

### A.1 USG Reference Registry (v0.1.0)

A concrete reference registry is published in the USG protocols repository at:

**https://github.com/sjellen/protocols/registry**

The v0.1.0 snapshot includes:

- One league record (`nba`)
- Two team records (`nba_warriors`, `nba_lakers`)
- One venue record (`chase_center`)
- One broadcaster record (`youtube_tv`)
- One rights bundle (`nba_global_ott_2025`)
- One example event record (`nba_2025_gsw_lal_0410`)
- Machine-generated index files under `registry/_index/`
- A registry metadata file (`registry/registry-metadata.json`)

This registry is illustrative but normative in structure. Entitlement profiles defined in this RFC are expected to resolve `event_id` against an authoritative registry (local or remote) having the same semantics as the reference registry.

---

### A.2 Illustrative Event Record (From v0.1.0)

```json
{
  "event_id": "nba_2025_gsw_lal_0410",
  "league": "NBA",
  "home": "Warriors",
  "away": "Lakers",
  "start_time": "2025-04-10T19:30Z",
  "territory": ["US", "CA"],
  "rights_holder": "NBA Media",
  "delivery_partner": "YouTubeTV",
  "price_usd": 4.99,
  "access_window": {
    "start": "2025-04-10T19:00Z",
    "end": "2025-04-10T23:59Z"
  },
  "settlement_split": {"platform":40,"rights":40,"clearinghouse":20}
}
```

This is a concrete example event record found in the USG Reference Registry v0.1.0.

---

### A.3 Illustrative Issue Request

```http
POST /entitlements/issue
Content-Type: application/json

{
  "event_id": "nba_2025_gsw_lal_0410",
  "user_id": "wallet_8234",
  "payment_token": "txn_5567"
}
```

This example assumes the distributor is authorized for the event's territories and access window.

---

### A.4 Illustrative Issue Response

```json
{
  "entitlement_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires": "2025-04-10T23:59Z"
}
```

---

### A.5 Illustrative Settlement Record

```json
{
  "txn_id": "txn_5567",
  "event_id": "nba_2025_gsw_lal_0410",
  "amount_usd": 4.99,
  "split": {"platform":1.996,"rights":1.996,"clearinghouse":0.998},
  "timestamp": "2025-04-10T19:31Z",
  "ledger_hash": "0000abcd..."
}
```

This represents a stylized clearinghouse output matching the settlement semantics defined in this profile.

---

### A.6 Purpose of This Appendix

This appendix connects:

- the reference registry (real data),
- the entitlement token profile (normative behavior), and
- the event resolution process (registry → token → settlement).


## Acknowledgments

The author thanks the open-standards and digital-public-infrastructure communities for their work toward trustworthy, human-scale systems.
Feedback and implementation reports may be submitted via [scottjellen.com](https://scottjellen.com) or the Zenodo discussion thread for DOI 10.5281/zenodo.17537287.

---

## Revision History
**v1.1 — December 2025**  
- Updated cross-references to RFC 0002  
- Removed placeholder ISSN field  
- Updated header metadata to USG-RFC standard  
- Minor terminology alignment with entitlement profile

**v1.2 — December 2025**  
- Added Section 4.1.1 referencing the USG Reference Registry v0.1.0  
- Replaced placeholder Appendix A with full registry-aligned event, issue, and settlement examples  
- Corrected code-fence formatting in Sections 4.2 and Appendix A  
- Updated cross-references to RFC 0002 for consistency  
- Minor clarifications to terminology (no normative protocol changes)

___

**End of RFC 0001**
