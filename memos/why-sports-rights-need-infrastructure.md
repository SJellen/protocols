---
title: "Why Sports Rights Need Infrastructure"
kind: "keystone-memo"
status: "reference"
author: "Scott Jellen"
version: "1.0"
date: "2026-02-09"
context: "Universal Sports Graph (USG)"
related:
  - type: "protocol"
    title: "Universal Sports Graph (USG)"
  - type: "repository"
    title: "USG Reference Registry"
  - type: "repository"
    title: "USG Resolver"
license: "CC BY-NC 4.0"
tags:
  - Sports Rights
  - Digital Public Infrastructure
  - Protocol Design
  - Interoperability
  - Rights Representation
---


# Why Sports Rights Need Infrastructure

## The recurring failure

- Sports rights repeatedly break down into disputes, renegotiations, blackouts, or opaque reallocations, even among highly sophisticated leagues, broadcasters, platforms, and regulators.
- These failures recur across different sports, jurisdictions, distribution technologies, and legal regimes.
- Each instance is typically explained as a local failure—bad contracts, aggressive platforms, regulatory lag, or misaligned incentives.
- Yet the same failure modes reappear regardless of who is in control.
- The consistent variable is not intelligence, intent, or legal capacity, but the absence of a shared structural representation of rights.

---

## Why rights remain non-computable

- Sports rights are primarily defined through narrative legal instruments: contracts, amendments, schedules, and policy documents.
- These instruments are designed for human interpretation and dispute resolution, not for computational clarity.
- Core attributes of rights—such as scope, territory, duration, exclusivity, sublicensing, and carve-outs—are described inconsistently, embedded in prose, and redefined over time.
- There is no canonical, machine-readable representation of what rights exist, who holds them, where and when they apply, or how they interact.
- As a result:
  - auditing requires manual reconstruction,
  - entitlement verification is platform-specific,
  - and conflicts can only be resolved through negotiation or litigation.
- Rights enforcement becomes reactive and adversarial rather than inspectable and preventative.

---

## What “infrastructure” means here

- Infrastructure, in this context, does not mean a platform, marketplace, or intermediary.
- It refers to a neutral representation layer that sits beneath commercial, legal, and operational systems.
- This layer does not make decisions or enforce outcomes; it makes states and relationships legible.
- Comparable infrastructure layers exist in other domains:
  - DNS for domain resolution,
  - ISINs for securities identification,
  - GTINs for product identity.
- These systems do not replace markets or law; they make coordination possible without central control.
- In the absence of such a layer, every participant is forced to maintain private representations, resolve conflicts bilaterally, and repeatedly reinterpret the same underlying facts.
- Infrastructure reduces ambiguity without centralizing authority.

---

## What USG is (and is not)

- The Universal Sports Graph (USG) is a protocol framework for representing sports events, entities, rights, and entitlements as interoperable data.
- It defines canonical identifiers, shared schemas, and structural relationships between objects.
- USG focuses on representation, not execution.
- It makes rights, events, and entities legible and referable, not enforceable.
- USG is intentionally minimal and composable, designed to sit beneath contracts, platforms, regulatory regimes, and commercial systems.

**USG is not:**
- a streaming or distribution platform,
- a rights marketplace or exchange,
- a rights enforcement or DRM system,
- a business model or commercial service,
- or a replacement for law, contracts, or negotiation.

- USG does not determine outcomes.
- It defines a shared language in which outcomes can be reasoned about.

---

## How the layers fit together

- USG is structured as a set of loosely coupled layers, each with a distinct responsibility.
- RFCs define the conceptual and structural standards: object types, identifier formats, schemas, and allowed relationships.
- The Reference Registry provides canonical identifiers, authoritative records, and versioned snapshots of the data model.
- The Resolver exposes deterministic identifier-to-record lookup for read-only inspection and verification.
- Each layer can be evaluated independently:
  - the RFCs without the registry,
  - the registry without the resolver,
  - the resolver without operational deployment.
- Together, the layers demonstrate that USG is structurally coherent, inspectable end-to-end, and implementable without central control.
- This separation allows experimentation and verification without committing to adoption or operation.

---

## What this unlocks

- A shared representation layer makes sports rights independently inspectable rather than privately interpreted.
- Rights claims can be audited against a canonical structure instead of reconstructed from bespoke agreements.
- Entitlements can be verified across organizations without requiring shared platforms or bilateral trust.
- Conflicting claims can be identified earlier, before they harden into disputes or litigation.
- Aggregation and sublicensing become structurally clearer because relationships are explicit rather than implied.
- Downstream systems can reference the same underlying objects without collapsing into a single operator.
- This creates preconditions for automated reporting, clearer revenue attribution, and eventual settlement primitives—without requiring those systems to exist yet.

---

## What this avoids

- Without neutral infrastructure, coordination defaults to private interpretation rather than shared reference.
- Platform-specific entitlement systems centralize definition power and entrench incumbents.
- Standardization efforts without neutral infrastructure often collapse into vendor control, bespoke integrations, or compliance theater.
- Disputes are repeatedly resolved through renegotiation, litigation, or regulatory intervention rather than structural clarity.
- Policy and enforcement are forced to compensate for architectural gaps.
- Each new technology shift reintroduces the same interpretive conflicts.
- Infrastructure does not eliminate disagreement, but it prevents ambiguity from becoming the primary battleground.

---

## Scope and non-goals

- USG does not mandate adoption by any league, platform, or regulator.
- USG does not replace contracts, collective bargaining, or legal interpretation.
- USG does not determine commercial terms, pricing, or revenue allocation.
- USG does not enforce rights, resolve disputes, or adjudicate conflicts.
- USG does not prescribe governance, ownership models, or institutional control.
- USG is concerned solely with representation, not authority.
- Any operational, commercial, or regulatory use of USG would occur downstream and outside the scope of the protocol itself.

---

## Current status

- USG exists today as a reference-grade infrastructure stack, not an operational system.
- The work includes published RFCs, a versioned reference registry, and a public, read-only resolver.
- These artifacts are sufficient to evaluate the coherence of the model, verify referential integrity, and assess viability.
- This phase prioritizes legibility and verification rather than adoption or deployment.
- No claims are made regarding industry uptake, operational readiness, or timeline.
- Any future work would occur downstream and independently of the protocol itself.
