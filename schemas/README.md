# USG Schema Registry

This directory contains the JSON Schemas that define the core data structures used
by the **Universal Sports Graph (USG)** protocol.  
All schemas use **URN-based identifiers**, which provide stable, location-independent
names that do not depend on hosting, domains, or GitHub URLs.

Schemas in this directory are **informational** and correspond to RFC 0001 —
*The Universal Sports Graph: A Protocol for Rights, Reach, and Real-Time Access*.

---

## 📦 Available Schemas

### **1. Event Schema**
**URN:** `urn:usg:schema:event:1.0`  
**File:** `event-schema.json`

Defines the canonical structure for a single sports event within the USG rights registry.  
This schema captures key metadata such as teams, league, start time, territories,
blackouts, pricing, access window, and settlement configuration.

---

### **2. Entitlement Token Schema**
**URN:** `urn:usg:schema:entitlement-token:1.0`  
**File:** `entitlement-token.json`

Defines the response payload returned by the `/entitlements/issue` endpoint.  
Represents a time-limited, scoped authorization token (e.g., JWT) granting access
to a specific event.

---

### **3. Settlement Record Schema**
**URN:** `urn:usg:schema:settlement-record:1.0`  
**File:** `settlement-record.json`

Defines a normalized record in the USG clearinghouse ledger.  
Encodes transaction metadata, revenue allocation, timestamps, and ledger hashes for
audit and reconciliation purposes.

---

## 📁 Examples

Examples demonstrating how these schemas look in practice are found in:

