---
title: "WHOIS: Domain Registration Data, Privacy Frameworks, and RDAP Transition"
description: "WHOIS glossary: evolution to RDAP, GDPR impact on registrant data, WHOIS privacy services, and registrant rights under ICANN policy."
slug: "whois"
section: "glossary"
cluster: "private-domain-registration"
type: "glossary"
language: "en"
publishedAt: "2026-03-20"
updatedAt: "2026-04-28"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
  - "whois"
  - "rdap"
  - "gdpr"
  - "domain-privacy"
  - "registrant-data"
  - "icann-compliance"
keywords:
  primary: "WHOIS domain registration data"
  secondary:
    - "RDAP successor protocol"
    - "GDPR WHOIS impact"
    - "domain privacy protection"
    - "registrant data access"
    - "WHOIS privacy services"
riskLevel: "low"
index: true
audience:
  - "domain holders"
  - "researchers"
  - "legal professionals"
summary: "WHOIS is the long-standing Internet protocol for querying domain registration data, now transitioning to RDAP with structured outputs and access controls. GDPR and evolving privacy regulations have fundamentally reshaped WHOIS data availability and registrant rights."
faqs:
  - question: "What is WHOIS and why does it matter for domain holders?"
    answer: "WHOIS is a query-and-response protocol that retrieves the registration data for a domain name, including registrant contact details, registration and expiry dates, and nameserver assignments. It matters because it governs who can see your personal information when you register a domain."
  - question: "What is replacing WHOIS?"
    answer: "RDAP (Registration Data Access Protocol) is the designated successor. It provides structured JSON responses, supports internationalization, and enables differentiated access — law enforcement and accredited parties can access full data while public queries receive redacted results."
  - question: "How did GDPR change WHOIS?"
    answer: "GDPR required ICANN to implement a Temporary Specification in 2018, mandating that registrars redact personal data from public WHOIS outputs for EU-based registrants. This effectively ended the era of globally public WHOIS data and accelerated the RDAP transition."
  - question: "Should I use WHOIS privacy services?"
    answer: "Yes. WHOIS privacy (or domain privacy) services replace your personal contact information with proxy data in public records, reducing spam, harassment, and social engineering risks. Many registrars include this with registration, as described in our private domain registration guide."
references:
  - title: "ICANN WHOIS Overview"
    url: "https://www.icann.org/resources/pages/whois-qanda-2014-01-29-en"
    source: "ICANN"
  - title: "General Data Protection Regulation (GDPR)"
    url: "https://gdpr-info.eu/"
    source: "European Union"
  - title: "ICANN RDAP Implementation"
    url: "https://www.icann.org/rdap"
    source: "ICANN"
related:
  - title: "Private Domain Registration Guide"
    url: "/en/library/private-domain-registration/"
  - title: "Private Domain Registration FAQ"
    url: "/en/faq/private-domain-registration-faq/"
  - title: "Buy Domain with USDT"
    url: "/en/library/buy-domain-with-usdt/"
  - title: "ENS Glossary"
    url: "/en/glossary/ens/"
  - title: "USDT Glossary"
    url: "/en/glossary/usdt/"
updateCadence: "as-needed"
schemaType: "DefinedTerm"
---

## Definition

WHOIS is a widely used Internet query-and-response protocol defined in RFC 3912 that retrieves registration data for domain names, IP address blocks, and autonomous system numbers. When a user queries a domain via WHOIS, the response typically includes the registrant's name, organization, email, phone number, registration and expiry dates, and the assigned nameservers. The [private domain registration guide](/en/library/private-domain-registration/) explains how registrants can control what information appears in these records.

## The RDAP Transition

RDAP (Registration Data Access Protocol), defined in RFCs 7480–7485, is the IETF-designated successor to WHOIS. ICANN mandated RDAP adoption for all gTLD registries and registrars in 2019, and the protocol now serves as the primary access mechanism for registration data.

Key improvements over WHOIS include:

- **Structured JSON output** instead of free-form text, enabling automated parsing and standardization across registrars.
- **Differentiated access** allowing registrars to serve redacted data to public queries while providing full records to authenticated parties such as law enforcement, intellectual property holders, and cybersecurity researchers.
- **Internationalization** support through UTF-8 encoding, resolving long-standing issues with non-ASCII registrant data.
- **Bootstrapping** via a central RDAP bootstrap service that routes queries to the correct authoritative server.

Despite RDAP's deployment, legacy WHOIS port 43 access remains operational at many registrars. ICANN's eventual goal is full deprecation of the WHOIS protocol, though no firm sunset date has been set.

## GDPR Impact on WHOIS Data Access

The European Union's General Data Protection Regulation, which took effect in May 2018, fundamentally altered WHOIS data availability. ICANN responded with a Temporary Specification for gTLD Registration Data, requiring registrars and registries to:

- Redact registrant personal data (name, email, phone) from public WHOIS/RDAP responses for EU-based registrants.
- Provide a standardized mechanism for data requestors to seek access to redacted data through a gated access model.
- Publish a registrar-specific data retention policy consistent with GDPR minimization principles.

The result is a bifurcated WHOIS landscape: public queries return anonymized or redacted data, while accredited parties may access full records through contractually defined access pathways. The [private domain registration FAQ](/en/faq/private-domain-registration-faq/) addresses common questions about data visibility.

## WHOIS Privacy Services

WHOIS privacy (also called domain privacy or ID protection) is a service offered by most registrars that substitutes the registrant's personal information with proxy or forwarding contact details in the public WHOIS output. This service:

- Reduces unsolicited contact, spam, and phishing attempts targeting domain holders.
- Protects against doxxing and harassment, particularly for individual registrants and small businesses.
- Does not alter the legal ownership of the domain — the registrant retains full control while the privacy service acts as a forwarding layer.

When registering domains with cryptocurrency such as USDT ([buy domain with USDT](/en/library/buy-domain-with-usdt/)), privacy services are especially relevant since crypto-native registrars may have different default privacy policies compared to traditional registrars.

## Registrant Rights

Under current ICANN policy, registrants retain several rights concerning their WHOIS data:

- The right to accurate and accessible registration data about their own domains.
- The right to data minimization consistent with applicable privacy law.
- The right to correct inaccurate WHOIS data through their registrar.
- The right to transfer domains without undue WHOIS-related delays.

Understanding these rights is essential for domain holders navigating both traditional DNS and web3 naming systems like ENS ([ENS glossary](/en/glossary/ens/)), where on-chain registration data follows different disclosure models.

## Related Resources

- [Private Domain Registration Guide](/en/library/private-domain-registration/)
- [Private Domain Registration FAQ](/en/faq/private-domain-registration-faq/)
- [Buy Domain with USDT](/en/library/buy-domain-with-usdt/)
- [ENS: Architecture and DNS Integration](/en/glossary/ens/)
- [USDT: Networks and Domain Payments](/en/glossary/usdt/)

## References

1. **ICANN WHOIS Overview** — [icann.org/resources/pages/whois](https://www.icann.org/resources/pages/whois-qanda-2014-01-29-en) — ICANN
2. **General Data Protection Regulation (GDPR)** — [gdpr-info.eu](https://gdpr-info.eu/) — European Union
3. **ICANN RDAP Implementation** — [icann.org/rdap](https://www.icann.org/rdap) — ICANN
