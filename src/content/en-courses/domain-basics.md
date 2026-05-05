---
title: "Domain Name Basics: DNS Hierarchy, Registration, and Management"
description: "An introductory course covering domain name fundamentals, the DNS hierarchy, ICANN's role, the domain lifecycle, and WHOIS basics for beginners entering the Web3 domain space."
slug: "domain-basics"
section: "learn"
cluster: "dns-security-governance"
type: "course"
language: "en"
publishedAt: "2026-02-10"
updatedAt: "2026-04-28"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
 - "dns"
 - "domain-names"
 - "icann"
 - "whois"
 - "domain-lifecycle"
keywords:
 primary: "domain name basics"
 secondary:
 - "dns hierarchy"
 - "domain registration"
 - "icann role"
 - "domain lifecycle"
 - "whois basics"
riskLevel: "low"
index: true
audience:
 - "domain holders"
 - "researchers"
summary: "Learn the fundamentals of domain names including DNS hierarchy, how ICANN governs the namespace, the differences between registrars and registries, the full domain lifecycle, and WHOIS lookup essentials."
faqs:
 - question: "What is a domain name?"
   answer: "A domain name is a human-readable address that maps to an IP address via the Domain Name System, allowing users to reach websites without memorizing numeric identifiers."
 - question: "What is the DNS hierarchy?"
   answer: "The DNS hierarchy organizes names from the root zone downward through top-level domains (.com, .org), second-level domains (example.com), and optional subdomains (www.example.com)."
 - question: "What role does ICANN play in domain names?"
   answer: "ICANN coordinates the global DNS root zone, accredits registrars, and enforces policies such as the Registrar Accreditation Agreement to maintain a stable and interoperable namespace."
 - question: "What happens when a domain expires?"
   answer: "After expiry the domain enters a registrar grace period (typically 30 days) where the owner can still renew, followed by a redemption period with a higher restoration fee, and finally pending delete before release."
 - question: "What is WHOIS?"
   answer: "WHOIS is a query-and-response protocol that retrieves registration data for a domain, including the registrant, registrar, and key dates, though privacy services and GDPR have limited data availability."
references:
 - title: "ICANN Domain Lifecycle"
   url: "https://www.icann.org/resources/pages/domain-lifecycle"
   source: "ICANN"
 - title: "IETF RFC 1035 — Domain Names Implementation and Specification"
   url: "https://www.rfc-editor.org/rfc/rfc1035"
   source: "IETF"
 - title: "ICANN Registrar Accreditation Agreement (RAA)"
   url: "https://www.icann.org/resources/pages/raa"
   source: "ICANN"
related:
 - title: "Buy Domain with USDT"
   url: "/en/library/buy-domain-with-usdt/"
 - title: "Buy Domain with Crypto"
   url: "/en/library/buy-domain-with-crypto/"
 - title: "DNS Security and Governance Research"
   url: "/en/research/dns-security-governance/"
 - title: "WHOIS Glossary"
   url: "/en/glossary/whois/"
 - title: "DNS Security FAQ"
   url: "/en/faq/dns-security-faq/"
updateCadence: "quarterly"
schemaType: "Course"
---

## What Is a Domain Name?

A domain name is a human-readable label that maps to a numeric IP address through the Domain Name System (DNS). Instead of typing `192.0.2.1`, users enter `example.com`, and the DNS resolves the name to the correct server. Domains serve as the foundation of online identity, enabling websites, email, and other internet services to be reachable through memorable addresses.

## The DNS Hierarchy

The DNS operates as an inverted tree with three principal levels:

- **Root zone** — The unnamed root sits at the top, managed by ICANN, and delegates authority to all top-level domains.
- **Top-level domains (TLDs)** — Categories such as generic TLDs (`.com`, `.org`, `.net`), country-code TLDs (`.uk`, `.de`), and newer gTLDs (`.xyz`, `.app`). Each TLD is operated by a designated registry.
- **Second-level domains (2LDs)** — The registrable label directly beneath a TLD (e.g., `example` in `example.com`). Organizations and individuals register 2LDs through accredited registrars.

Subdomains (e.g., `www.example.com`) extend the hierarchy further but are configured by the domain owner rather than registered separately.

## ICANN's Role and Registrar vs Registry

**ICANN** (Internet Corporation for Assigned Names and Numbers) is the global multi-stakeholder body that coordinates the DNS root zone, accredits registrars, and oversees policy development. ICANN does not sell domains directly but sets the rules that registries and registrars must follow.

- **Registry** — The organization that operates a TLD (e.g., Verisign for `.com`). The registry maintains the authoritative zone file and sets wholesale pricing.
- **Registrar** — An ICANN-accredited entity that sells domain registrations to end users (e.g., Namecheap, GoDaddy). Registrars interact with the registry via the Extensible Provisioning Protocol (EPP).

For a practical walkthrough of purchasing a domain using cryptocurrency, see [Buy Domain with USDT](/en/library/buy-domain-with-usdt/) and [Buy Domain with Crypto](/en/library/buy-domain-with-crypto/).

## The Domain Lifecycle

Every domain passes through a defined lifecycle:

1. **Registration** — A registrant selects an available name, pays the registrar, and the domain is active for the chosen period (1–10 years).
2. **Renewal** — Before expiry the registrant can renew. Most registrars allow auto-renewal to prevent accidental lapses.
3. **Expiry and Grace Period** — After the expiration date the domain enters a registrar-hold grace period (typically 0–45 days, often 30). The owner can still renew at the standard price.
4. **Redemption Period** — If unrenewed, the domain moves to registry redemption (about 30 days). Restoration requires a higher redemption fee.
5. **Pending Delete** — A five-day phase before the domain is purged from the registry. No recovery is possible at this stage.
6. **Release** — The domain becomes available for new registration, often snapped up by drop-catch services.

Understanding this lifecycle is critical for avoiding unintended loss. Our [DNS Security and Governance Research](/en/research/dns-security-governance/) covers advanced expiry-monitoring strategies.

## WHOIS Basics

WHOIS is a longstanding protocol for querying domain registration metadata — registrant name, organization, registrar, creation date, and expiry date. With the advent of GDPR and privacy-by-default policies, many registrations now use redacted WHOIS or privacy-proxy services. RDAP (Registration Data Access Protocol) is the modern successor, offering structured JSON responses and better access-control mechanisms. For definitions of WHOIS terminology, see the [WHOIS Glossary](/en/glossary/whois/).

## Related Resources

- [Buy Domain with USDT](/en/library/buy-domain-with-usdt/) — Step-by-step guide to purchasing domains using Tether.
- [Buy Domain with Crypto](/en/library/buy-domain-with-crypto/) — Overview of cryptocurrency payment options for domain registration.
- [DNS Security and Governance Research](/en/research/dns-security-governance/) — In-depth analysis of DNS threats and policy frameworks.
- [WHOIS Glossary](/en/glossary/whois/) — Key terms and definitions for domain registration data.
- [DNS Security FAQ](/en/faq/dns-security-faq/) — Common questions about DNS security practices.

## References

- ICANN. "Domain Lifecycle." [https://www.icann.org/resources/pages/domain-lifecycle](https://www.icann.org/resources/pages/domain-lifecycle)
- IETF. "RFC 1035 — Domain Names: Implementation and Specification." [https://www.rfc-editor.org/rfc/rfc1035](https://www.rfc-editor.org/rfc/rfc1035)
- ICANN. "Registrar Accreditation Agreement (RAA)." [https://www.icann.org/resources/pages/raa](https://www.icann.org/resources/pages/raa)
