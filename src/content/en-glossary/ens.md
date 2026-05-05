---
title: "ENS (Ethereum Name Service): Architecture, Governance, and DNS Integration"
description: "ENS (Ethereum Name Service) glossary: smart contract architecture, .eth registry, DAO governance, DNSSEC bridge, and DNS integration."
slug: "ens"
section: "glossary"
cluster: "web3-domain-identity"
type: "glossary"
language: "en"
publishedAt: "2026-03-18"
updatedAt: "2026-04-28"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
  - "ens"
  - "ethereum-name-service"
  - "web3-identity"
  - "dnssec"
  - "eth-domains"
  - "decentralized-naming"
keywords:
  primary: "Ethereum Name Service definition"
  secondary:
    - "ENS smart contract architecture"
    - ".eth domain"
    - "ENS DAO governance"
    - "DNSSEC ENS bridge"
    - "web3 domain identity"
riskLevel: "low"
index: true
audience:
  - "domain holders"
  - "researchers"
  - "developers"
summary: "The Ethereum Name Service (ENS) is a decentralized naming system built on Ethereum that maps human-readable .eth names to blockchain addresses, content hashes, and DNS records through a smart contract registry governed by the ENS DAO."
faqs:
  - question: "What is ENS and how does it differ from traditional DNS?"
    answer: "ENS is a decentralized naming protocol on Ethereum that resolves .eth names to wallet addresses, content hashes, and other records. Unlike traditional DNS managed by ICANN and centralized registries, ENS operates via immutable smart contracts governed by a DAO."
  - question: "How does the ENS DNSSEC bridge work?"
    answer: "The DNSSEC bridge allows owners of traditional DNS domains to import their DNS records on-chain by proving ownership through DNSSEC signatures, enabling .com and .org domains to resolve within the ENS ecosystem without purchasing a separate .eth name."
  - question: "Who governs the ENS protocol?"
    answer: "The ENS DAO, composed of ENS token holders, governs protocol upgrades, fee structures, and treasury allocation. The core development team (ENS Labs) implements decisions approved through on-chain governance votes."
references:
  - title: "ENS Documentation"
    url: "https://docs.ens.domains/"
    source: "ENS Labs"
  - title: "ICANN DNS Overview"
    url: "https://www.icann.org/resources/pages/dns-what-is-it-2018-03-05-en"
    source: "ICANN"
  - title: "W3C Decentralized Identifiers (DIDs) v1.0"
    url: "https://www.w3.org/TR/did-core/"
    source: "W3C"
related:
  - title: "Web3 Domain Identity Research"
    url: "/en/research/web3-domain-identity/"
  - title: "Web3 Domain Identity FAQ"
    url: "/en/faq/web3-domain-identity-faq/"
  - title: "Buy Domain with Crypto"
    url: "/en/library/buy-domain-with-crypto/"
  - title: "USDT Glossary"
    url: "/en/glossary/usdt/"
  - title: "WHOIS Glossary"
    url: "/en/glossary/whois/"
updateCadence: "as-needed"
schemaType: "DefinedTerm"
---

## Definition

The Ethereum Name Service (ENS) is a distributed, open, and extensible naming system based on the Ethereum blockchain. It maps human-readable names — primarily ending in `.eth` — to machine-readable identifiers such as Ethereum addresses, content hashes, metadata records, and even traditional DNS data. ENS functions as the web3 analog to the Domain Name System (DNS), which the [web3 domain identity research](/en/research/web3-domain-identity/) explores in depth.

## Smart Contract Architecture

ENS operates through a layered smart contract architecture on Ethereum:

- **ENS Registry:** A single on-chain contract that maps domain names to their owners and resolvers. The registry stores the name-owner mapping and the resolver address but delegates resolution logic to pluggable resolver contracts.

- **Resolvers:** Each name can specify its own resolver contract. The Public Resolver handles standard record types (address, content hash, text records), while custom resolvers enable application-specific resolution logic.

- **Name Wrapper (ERC-1155):** Introduced in 2023, the Name Wrapper converts .eth second-level domains into ERC-1155 NFTs with fine-grained permission controls — allowing subdomain issuance, expiry management, and fuse-based restriction of owner capabilities.

- **Reverse Registry:** Enables address-to-name lookups, allowing wallets and dApps to display `.eth` names instead of hexadecimal addresses.

## .eth Domains

`.eth` is the native top-level domain of ENS, allocated through a Vickrey auction for names longer than 5 characters and a fixed-price registration for 3–5 character names. All .eth registrations are subject to an annual renewal fee denominated in ETH, paid to the ENS treasury. Unlike ICANN-governed TLDs ([WHOIS glossary](/en/glossary/whois/)), .eth domains exist entirely on-chain with no centralized registrar authority.

## ENS DAO Governance

In November 2021, the ENS DAO was established with the deployment of the ENS governance token. Token holders vote on:

- Protocol fee structures and renewal pricing
- Treasury allocation from registration revenue
- Upgrade proposals to core contracts
- Ecosystem grant funding

The DAO treasury holds registration revenue and is managed through on-chain proposals. This governance model contrasts with ICANN's multi-stakeholder approach to traditional DNS, as detailed in the [web3 domain identity FAQ](/en/faq/web3-domain-identity-faq/).

## DNSSEC Bridge

The ENS DNSSEC bridge enables traditional DNS domain owners to claim their domains on ENS without purchasing a .eth name. Domain owners submit DNSSEC-signed proofs on-chain, allowing `.com`, `.org`, and other TLD names to resolve within ENS. This bridge creates a pathway between the ICANN DNS hierarchy and the ENS namespace — a critical interoperability layer for hybrid domain strategies involving crypto payments ([buy domain with crypto](/en/library/buy-domain-with-crypto/)).

## Comparison with Traditional DNS

| Feature | ENS | Traditional DNS |
|---------|-----|-----------------|
| Registry | Smart contract (immutable) | Centralized registry operators |
| Governance | DAO (token holders) | ICANN multi-stakeholder |
| Top-Level Domain | .eth | .com, .org, .net, etc. |
| Renewal | ETH-denominated, on-chain | USD-denominated, registrar-mediated |
| Resolution | On-chain resolver contracts | Nameserver delegation |
| Censorship Resistance | High (no single authority) | Low (registry can suspend) |

## Related Resources

- [Web3 Domain Identity Research](/en/research/web3-domain-identity/)
- [Web3 Domain Identity FAQ](/en/faq/web3-domain-identity-faq/)
- [Buy Domain with Crypto](/en/library/buy-domain-with-crypto/)
- [USDT: Networks and Domain Payments](/en/glossary/usdt/)
- [WHOIS: Privacy and RDAP Transition](/en/glossary/whois/)

## References

1. **ENS Documentation** — [docs.ens.domains](https://docs.ens.domains/) — ENS Labs
2. **ICANN DNS Overview** — [icann.org/resources/pages/dns](https://www.icann.org/resources/pages/dns-what-is-it-2018-03-05-en) — ICANN
3. **W3C Decentralized Identifiers (DIDs) v1.0** — [w3.org/TR/did-core](https://www.w3.org/TR/did-core/) — W3C
