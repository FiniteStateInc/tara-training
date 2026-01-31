export interface SecurityInsight {
  term: string;
  definition: string;
  tip: string;
  category: "stride" | "risk" | "sbom" | "compliance" | "architecture";
}

export const securityInsights: SecurityInsight[] = [
  {
    term: "STRIDE",
    definition:
      "A threat modeling framework that categorizes threats into six types: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege.",
    tip: "When reviewing threats in TARA, use STRIDE categories to ensure you've covered all potential attack types.",
    category: "stride",
  },
  {
    term: "Spoofing",
    definition:
      "A type of attack where an adversary pretends to be someone or something they are not, such as impersonating a user or forging credentials.",
    tip: "Look for authentication weaknesses in your system components - anywhere identity is verified is a potential spoofing target.",
    category: "stride",
  },
  {
    term: "Tampering",
    definition:
      "The malicious modification of data or code, either in transit or at rest, to compromise system integrity.",
    tip: "Check for data flows that lack integrity verification. These are prime targets for tampering attacks.",
    category: "stride",
  },
  {
    term: "Repudiation",
    definition:
      "The ability of a user or attacker to deny performing an action without the system being able to prove otherwise.",
    tip: "Ensure your system has adequate logging and audit trails for all security-relevant actions.",
    category: "stride",
  },
  {
    term: "Information Disclosure",
    definition:
      "The exposure of sensitive information to unauthorized parties, whether through direct access, side channels, or unintended leakage.",
    tip: "Identify all data assets in TARA and verify each has appropriate access controls and encryption.",
    category: "stride",
  },
  {
    term: "Denial of Service",
    definition:
      "An attack that prevents legitimate users from accessing a system or service by overwhelming resources or exploiting vulnerabilities.",
    tip: "Consider resource exhaustion scenarios for each component, especially those exposed to external networks.",
    category: "stride",
  },
  {
    term: "Elevation of Privilege",
    definition:
      "An attack where a user or process gains higher access rights than they were originally granted.",
    tip: "Review trust boundaries in your architecture - privilege escalation often occurs at boundary crossings.",
    category: "stride",
  },
  {
    term: "Trust Zone",
    definition:
      "A logical grouping of components that share the same trust level and security requirements within a system architecture.",
    tip: "In TARA's Canvas, group components by trust level to clearly visualize security boundaries.",
    category: "architecture",
  },
  {
    term: "Attack Surface",
    definition:
      "The sum of all points where an unauthorized user can try to enter data or extract data from a system.",
    tip: "Mark entry points in your TARA architecture to identify and minimize your attack surface.",
    category: "architecture",
  },
  {
    term: "Data Flow",
    definition:
      "The movement of data between components in a system, which can cross trust boundaries and expose data to risks.",
    tip: "Every data flow crossing a trust boundary should be analyzed for potential threats in TARA.",
    category: "architecture",
  },
  {
    term: "CVE (Common Vulnerabilities and Exposures)",
    definition:
      "A standardized identifier for publicly known cybersecurity vulnerabilities, enabling consistent tracking and communication.",
    tip: "Use TARA's SBOM features to automatically identify CVEs in your software components.",
    category: "sbom",
  },
  {
    term: "SBOM (Software Bill of Materials)",
    definition:
      "A complete inventory of all software components, libraries, and dependencies used in a product.",
    tip: "Keep your SBOM updated in TARA to catch newly disclosed vulnerabilities as they're published.",
    category: "sbom",
  },
  {
    term: "VEX (Vulnerability Exploitability eXchange)",
    definition:
      "A standard for communicating whether a product is affected by a known vulnerability and its exploitation status.",
    tip: "Use VEX status in TARA to document which vulnerabilities are actually exploitable in your specific context.",
    category: "sbom",
  },
  {
    term: "Risk Matrix",
    definition:
      "A visualization tool that plots threats based on their likelihood and impact to prioritize mitigation efforts.",
    tip: "TARA's risk matrix helps prioritize which threats to address first based on exploitability and impact.",
    category: "risk",
  },
  {
    term: "ISO 18045 Exploitability",
    definition:
      "A standardized methodology for assessing how easily a vulnerability can be exploited, considering factors like time, expertise, and equipment.",
    tip: "When assessing risks in TARA, consider all five exploitability factors for accurate scoring.",
    category: "risk",
  },
  {
    term: "Mitigation Control",
    definition:
      "A security measure implemented to reduce the likelihood or impact of a threat being realized.",
    tip: "Link mitigations to specific threats in TARA to track coverage and identify protection gaps.",
    category: "risk",
  },
  {
    term: "Security Requirement",
    definition:
      "A specific, verifiable statement of what the system must do to maintain security, derived from threat analysis.",
    tip: "Generate requirements from mitigations in TARA to ensure each control has a testable implementation.",
    category: "compliance",
  },
  {
    term: "FDA Cybersecurity Guidance",
    definition:
      "U.S. regulatory guidance for medical device manufacturers on managing cybersecurity throughout the product lifecycle.",
    tip: "Use TARA's compliance packs to map your security controls to FDA requirements.",
    category: "compliance",
  },
  {
    term: "EU CRA (Cyber Resilience Act)",
    definition:
      "European regulation establishing cybersecurity requirements for products with digital elements sold in the EU market.",
    tip: "TARA can help generate compliance reports showing alignment with EU CRA requirements.",
    category: "compliance",
  },
  {
    term: "Defense in Depth",
    definition:
      "A security strategy using multiple layers of protection so that if one layer fails, others continue to provide security.",
    tip: "Review your mitigations in TARA to ensure no single point of failure exists for critical threats.",
    category: "architecture",
  },
];

export function getInsightByIndex(index: number): SecurityInsight {
  return securityInsights[index % securityInsights.length];
}

export function getTimedInsightIndex(intervalMs: number): number {
  return Math.floor(Date.now() / intervalMs) % securityInsights.length;
}

export function getTotalInsights(): number {
  return securityInsights.length;
}
