---
title: "Brief 0001 — Universal Sports Graph Pilot v1.0"
slug: "usg-pilot-brief"
kind: "brief"
status: "draft"
version: "1.0"
author: "Scott Jellen"
date: "2025-11-15"
related:
  - type: "whitepaper"
    doi: "10.5281/zenodo.17537287"
    title: "The Universal Sports Graph — A Protocol for Rights, Reach, and Real-Time Access"
  - type: "rfc"
    doi: "10.5281/zenodo.17565794"
    title: "RFC 0001 — Universal Sports Graph"
license: "CC BY-NC 4.0"
tags:
  - Universal Sports Graph
  - Interoperability
  - Sports Rights
  - Digital Public Infrastructure
  - Pilot Design
---

# Brief 0001 — Universal Sports Graph Pilot v1.0  
## Single-Season Day-Pass Implementation

### 1. Purpose

This brief translates **The Universal Sports Graph** (USG) and **RFC 0001** into a concrete, single-season pilot that a league and streaming partner could run **without restructuring existing media deals**.

It is written for:

- League strategy and media-rights teams  
- Platform/streamer product and business leaders  
- Regulators and policy staff exploring interoperability pilots

The goal: **prove incremental revenue and regulator-ready auditability** using a simple **$4.99 day-pass** and a standardized **40 / 40 / 20** settlement split.

---

### 2. Pilot Scope (One League, One Platform, One Season)

**Partnership shape**

- **League:** one mid-tier league (or conference) with ~800–1,200 games per season  
- **Platform:** one primary streaming partner with an existing DTC or vMVPD product  
- **Territory:** one primary region (e.g., US and Canada) to simplify rights and compliance  
- **Catalog:** a subset of games (e.g., all regular-season games not already on free-to-air)

**What changes for fans**

- A consistent **“Watch / $4.99 Day Pass”** entry point appears next to existing “Watch Live” and subscription options.
- Fans can:
  - Purchase **a single game** at $4.99
  - Watch through the existing platform app
  - Avoid long-term subscription commitments

**What does *not* change**

- Existing subscriptions, bundles, and blackout rules remain in place.
- The platform keeps its **current apps, player, and data stack**.
- Contracts and rev-share baselines are honored; the pilot is an **overlay layer**, not a replacement.

---

### 3. What Gets Built (Minimum Viable USG Stack)

The pilot implements a **minimal version** of the USG layers defined in the whitepaper and RFC.

#### 3.1 Rights Schema v0.1 (Registry Stub)

A lightweight rights registry that represents each game as a **machine-readable object**:

- `event_id`, `league`, `home`, `away`, `start_time`
- `territory[]`, `blackout[]`
- `rights_holder`, `delivery_partner`
- `price_usd` (starting at 4.99)
- `access_window.start`, `access_window.end`
- `settlement_split` (40 / 40 / 20)

**Output:** a small registry service or static dataset that the Access API can query in real time.

#### 3.2 Access & Authentication API Stub

A neutral **Access API** that the platform calls when a fan taps:

> `Watch → $4.99 Day Pass`

Core behavior:

1. Validate the event and territory against the rights registry.  
2. Confirm that the delivery partner is the current platform.  
3. Accept payment or a payment token from the platform.  
4. Issue a **time-limited entitlement token** for that specific event.  
5. Return a simple response the platform can use to unlock the stream.

The stream itself remains on the platform; USG only standardizes **entitlements and settlement**.

#### 3.3 Clearinghouse Sandbox

A sandbox **clearinghouse** that logs each transaction and automatically splits revenue:

- **40 % – Platform / Streamer**  
- **40 % – Rights-Holder / Broadcaster**  
- **20 % – League / USG Clearinghouse (governance and analytics)**

Each transaction produces a **settlement record**:

- `txn_id`, `event_id`, `amount_usd`
- `split` breakdown (platform / rights / clearinghouse)
- `timestamp`
- `ledger_hash` or equivalent integrity marker

At pilot stage, this can be a league-run or jointly overseen service, with exportable logs for third-party audit.

---

### 4. Governance and Oversight (Pilot-Scale)

For the pilot, full consortium governance is **not** required. Instead:

**Pilot Steering Group**

- 2–3 representatives from the league  
- 2–3 from the platform  
- 1 independent advisor (e.g., compliance or policy expert)

Responsibilities:

- Approve the initial **rights schema v0.1**  
- Define **data retention** and **privacy boundaries**  
- Agree on the **40 / 40 / 20** split and any pilot-specific tweaks  
- Approve publication of **anonymized pilot results** (revenue ranges, conversion, settlement performance)

**Regulator touchpoint (optional but recommended)**

- Offer a **read-only view** of settlement logs and KPIs to relevant regulators through a sandbox-style arrangement.
- Position the pilot as a **voluntary digital-public-infrastructure experiment** on interoperability and consumer choice.

---

### 5. KPIs and Success Criteria

The pilot should be judged on **evidence**, not vibes. Minimum KPI set:

1. **Conversion of non-subscribers**  
   - Target: **5–10 %** conversion of identified non-subscribers exposed to the day-pass option on selected games.

2. **Incremental revenue per event**  
   - Target: material lift vs. baseline (e.g., ≥ $250,000 per high-interest game at 50,000 buyers).

3. **Settlement latency**  
   - Target: **24-hour settlement** from transaction to booked revenue across all parties.

4. **Compliance evidence**  
   - Ability to export an **audit-ready bundle**:
     - Sample settlement records
     - Log integrity proofs
     - Data minimization documentation (no PII leakage across boundaries)

5. **Fan experience metrics**  
   - Drop-off rate from “Click Day Pass” → “Payment Complete”  
   - Error rates on entitlement issuance  
   - Post-purchase satisfaction indicators (e.g., support tickets per 1,000 passes)

If the pilot hits these targets, the league and platform can justify moving from **USG Pilot** to a broader **USG Consortium** phase.

---

### 6. Why This Pilot Matters

- **For the league:** a proof that **casual fans** can be monetized without flattening subscription value.  
- **For the platform:** a controlled way to **unlock micro-revenue** and improve regulatory optics, while reusing existing infrastructure.  
- **For regulators:** a concrete example where **interoperability and transparency** are built voluntarily, not imposed.  
- **For the ecosystem:** a working demonstration of **Humanity-First Platform Design** in sport—where access is treated as infrastructure, not just a product.

---

### 7. Next Steps

1. **Sign a pilot MOU**  
   - Define scope (games, territory, duration), revenue split, and publication rights for outcomes.

2. **Stand up the minimum stack**  
   - Rights registry stub  
   - Access API stub  
   - Clearinghouse sandbox with exportable logs

3. **Run a limited soft launch**  
   - Select 10–20 games as an initial test set.  
   - Iterate on UX and pricing if needed.

4. **Publish a post-pilot technical note**  
   - Document which parts of **RFC 0001** were implemented or deferred.  
   - Capture lessons learned for Graph v1.1 and consortium expansion.

---

**Summary**

This brief defines the **smallest viable version** of the Universal Sports Graph:  
one league, one platform, one season, and a simple $4.99 day-pass.

If successful, it becomes the **on-ramp** from:

- Whitepaper ➝ RFC ➝ **live infrastructure**.

If it fails, it still generates the most valuable thing in infrastructure design: **ground truth** about where the protocol needs to evolve next.
