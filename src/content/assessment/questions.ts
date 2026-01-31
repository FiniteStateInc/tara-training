import { AssessmentQuestion } from "@/types/training";

export const assessmentQuestions: AssessmentQuestion[] = [
  // STRIDE Questions - Focus on practical understanding
  {
    id: "stride-1",
    question: "A hacker pretending to be an administrator to access a system is an example of which threat type?",
    topic: "Spoofing and impersonation",
    options: [
      { id: "a", text: "Tampering with authentication tokens" },
      { id: "b", text: "Spoofing an admin identity" },
      { id: "c", text: "Elevation of Privilege after login" },
      { id: "d", text: "Repudiation due to missing audit logs" },
    ],
    correct_answer: "b",
    category: "stride",
    explanation: "Spoofing is when an attacker pretends to be someone or something they're not, like impersonating a user or forging credentials.",
  },
  {
    id: "stride-2",
    question: "Malicious modification of data in transit or at rest is classified as which STRIDE category?",
    topic: "Tampering with data integrity",
    options: [
      { id: "a", text: "Spoofing via forged credentials" },
      { id: "b", text: "Repudiation due to weak logging" },
      { id: "c", text: "Tampering with stored or transmitted data" },
      { id: "d", text: "Denial of Service through resource exhaustion" },
    ],
    correct_answer: "c",
    category: "stride",
    explanation: "Tampering involves the malicious modification of data or code to compromise system integrity.",
  },
  {
    id: "stride-3",
    question: "When a system lacks proper audit logging and a user can deny performing an action, this represents which threat?",
    topic: "Repudiation and audit logging",
    options: [
      { id: "a", text: "Tampering with audit trails" },
      { id: "b", text: "Information Disclosure through log exposure" },
      { id: "c", text: "Denial of Service from log overload" },
      { id: "d", text: "Repudiation due to lack of non-repudiation" },
    ],
    correct_answer: "d",
    category: "stride",
    explanation: "Repudiation is the ability of a user or attacker to deny performing an action without the system being able to prove otherwise.",
  },
  {
    id: "stride-4",
    question: "Sensitive patient data being exposed through an API vulnerability is an example of:",
    topic: "Information disclosure via APIs",
    options: [
      { id: "a", text: "Denial of Service from excessive API requests" },
      { id: "b", text: "Information Disclosure of sensitive data" },
      { id: "c", text: "Elevation of Privilege to access restricted endpoints" },
      { id: "d", text: "Spoofing a trusted API client" },
    ],
    correct_answer: "b",
    category: "stride",
    explanation: "Information Disclosure is the exposure of sensitive information to unauthorized parties.",
  },
  
  // Risk Assessment Questions - Focus on practical application
  {
    id: "risk-1",
    question: "What is the primary purpose of a risk matrix in threat analysis?",
    topic: "Risk matrix prioritization",
    options: [
      { id: "a", text: "To normalize threats into a single severity score" },
      { id: "b", text: "To combine exploitability and impact to prioritize threats" },
      { id: "c", text: "To map mitigations to control objectives" },
      { id: "d", text: "To document compliance evidence requirements" },
    ],
    correct_answer: "b",
    category: "risk",
    explanation: "A risk matrix plots threats based on their likelihood (exploitability) and impact to help prioritize which threats to address first.",
  },
  {
    id: "risk-2",
    question: "In TARA's risk assessment, which factors determine how easy a threat is to exploit?",
    topic: "ISO 18045 exploitability factors",
    options: [
      { id: "a", text: "Attack surface size, exposure, and patch cadence" },
      { id: "b", text: "Time, expertise, knowledge, window of opportunity, and equipment" },
      { id: "c", text: "Threat actor intent, motivation, and frequency" },
      { id: "d", text: "Impact severity, business criticality, and compliance scope" },
    ],
    correct_answer: "b",
    category: "risk",
    explanation: "ISO 18045 exploitability factors include: time required, expertise level needed, knowledge of the system, window of opportunity, and equipment required.",
  },
  {
    id: "risk-3",
    question: "A threat with high exploitability and catastrophic impact would typically be rated as:",
    topic: "Risk rating at high exploitability and impact",
    options: [
      { id: "a", text: "Low risk" },
      { id: "b", text: "Moderate risk" },
      { id: "c", text: "High risk" },
      { id: "d", text: "Critical risk" },
    ],
    correct_answer: "d",
    category: "risk",
    explanation: "When both exploitability and impact are at their highest levels, the risk matrix produces a Critical rating requiring immediate remediation.",
  },
  {
    id: "risk-4",
    question: "What is an 'attack path' in threat modeling?",
    topic: "Attack path definition",
    options: [
      { id: "a", text: "The physical location of the attacker" },
      { id: "b", text: "A sequence of steps an attacker could take from entry point to target" },
      { id: "c", text: "The network route packets travel" },
      { id: "d", text: "The order in which features were deployed" },
    ],
    correct_answer: "b",
    category: "risk",
    explanation: "An attack path shows how an attacker could chain multiple steps together, from an entry point through intermediate steps to reach a target asset.",
  },

  // SBOM/Vulnerability Questions - Focus on practical workflow
  {
    id: "sbom-1",
    question: "What is the purpose of an SBOM (Software Bill of Materials)?",
    topic: "Purpose of an SBOM",
    options: [
      { id: "a", text: "To list system assets and data flows for modeling" },
      { id: "b", text: "To inventory all software components, libraries, and dependencies" },
      { id: "c", text: "To catalog release versions and deployment dates" },
      { id: "d", text: "To record vendor contracts and license terms" },
    ],
    correct_answer: "b",
    category: "sbom",
    explanation: "An SBOM is a complete inventory of all software components in a product, enabling vulnerability tracking and supply chain security.",
  },
  {
    id: "sbom-2",
    question: "When triaging vulnerabilities, what does marking a CVE as 'Not Affected' mean?",
    topic: "Vulnerability status: Not Affected",
    options: [
      { id: "a", text: "A fix exists, but it has not been applied yet" },
      { id: "b", text: "The vulnerable code is not reachable or present in your product" },
      { id: "c", text: "The risk has been accepted with compensating controls" },
      { id: "d", text: "The scanner result is a false positive by default" },
    ],
    correct_answer: "b",
    category: "sbom",
    explanation: "'Not Affected' means the vulnerability exists in the package but is not exploitable in your specific product context - the code path isn't reachable.",
  },
  {
    id: "sbom-3",
    question: "Why should vulnerabilities be linked to threat scenarios in TARA?",
    topic: "Linking vulnerabilities to threats",
    options: [
      { id: "a", text: "To auto-generate patch recommendations for the SBOM" },
      { id: "b", text: "To understand which threats become more likely and track remediation impact" },
      { id: "c", text: "To prioritize license compliance reporting" },
      { id: "d", text: "To reduce scanning time by deduplicating CVEs" },
    ],
    correct_answer: "b",
    category: "sbom",
    explanation: "Linking vulnerabilities to threats helps understand exploitability, shows which threats are enabled by the vulnerability, and provides complete traceability.",
  },
  {
    id: "sbom-4",
    question: "What is the benefit of 'promoting' an SBOM package to a component in TARA?",
    topic: "Promoting SBOM packages to components",
    options: [
      { id: "a", text: "It pins the package to a secure version automatically" },
      { id: "b", text: "It allows detailed threat modeling and architecture visualization for that package" },
      { id: "c", text: "It removes the package from the SBOM after review" },
      { id: "d", text: "It enables automatic dependency patching" },
    ],
    correct_answer: "b",
    category: "sbom",
    explanation: "Promoting a package to a component lets you model it in your architecture, generate specific threats for it, and visualize its data flows.",
  },

  // Compliance/Workflow Questions - Focus on understanding process
  {
    id: "compliance-1",
    question: "What is the purpose of a mitigation in the threat modeling workflow?",
    topic: "Purpose of mitigations",
    options: [
      { id: "a", text: "To document acceptance of an identified threat" },
      { id: "b", text: "To define a security control that reduces the likelihood or impact of a threat" },
      { id: "c", text: "To assign severity labels to threats" },
      { id: "d", text: "To generate evidence for compliance reports" },
    ],
    correct_answer: "b",
    category: "compliance",
    explanation: "Mitigations are security controls implemented to reduce the likelihood or impact of identified threats being realized.",
  },
  {
    id: "compliance-2",
    question: "In TARA's workflow, what comes after mitigations are defined?",
    topic: "Workflow after mitigations",
    options: [
      { id: "a", text: "Verification checks against the firmware" },
      { id: "b", text: "Architecture modeling refinement" },
      { id: "c", text: "Security requirements generation" },
      { id: "d", text: "Threat regeneration with updated context" },
    ],
    correct_answer: "c",
    category: "compliance",
    explanation: "After defining mitigations, you generate verifiable security requirements that specify how those mitigations will be implemented.",
  },
  {
    id: "compliance-3",
    question: "What is the purpose of verification checks in TARA?",
    topic: "Verification checks and evidence",
    options: [
      { id: "a", text: "To validate that AI-generated threats are accurate" },
      { id: "b", text: "To prove that security requirements are actually implemented in the shipped product" },
      { id: "c", text: "To ensure report formatting meets compliance templates" },
      { id: "d", text: "To confirm user authentication policies are enabled" },
    ],
    correct_answer: "b",
    category: "compliance",
    explanation: "Verification checks prove requirements are met with evidence from the actual shipped firmware, bridging the gap between design intent and reality.",
  },
  {
    id: "compliance-4",
    question: "What is a 'trust zone' in system architecture?",
    topic: "Trust zones and security boundaries",
    options: [
      { id: "a", text: "A geographic region where servers are deployed" },
      { id: "b", text: "A logical boundary grouping components with the same trust level and security requirements" },
      { id: "c", text: "A network firewall configured for inbound rules" },
      { id: "d", text: "A user role tier used for access control" },
    ],
    correct_answer: "b",
    category: "compliance",
    explanation: "Trust zones are logical groupings that help identify security boundaries - data flows crossing zone boundaries often need extra protection.",
  },
];

// Get a subset of questions for the assessment
export function getAssessmentQuestions(count: number = 12): AssessmentQuestion[] {
  // Get balanced representation from each category
  const categories = ["stride", "risk", "sbom", "compliance"] as const;
  const questionsPerCategory = Math.ceil(count / categories.length);
  
  const selectedQuestions: AssessmentQuestion[] = [];
  
  for (const category of categories) {
    const categoryQuestions = assessmentQuestions.filter(q => q.category === category);
    const shuffled = categoryQuestions.sort(() => Math.random() - 0.5);
    selectedQuestions.push(...shuffled.slice(0, questionsPerCategory));
  }
  
  // Shuffle final list and limit to count
  return selectedQuestions.sort(() => Math.random() - 0.5).slice(0, count);
}

// Calculate score and category breakdown
export function calculateAssessmentResults(
  questions: AssessmentQuestion[],
  answers: Record<string, string>
): {
  score: number;
  total: number;
  percentage: number;
  categoryScores: Record<string, { correct: number; total: number }>;
} {
  let correct = 0;
  const categoryScores: Record<string, { correct: number; total: number }> = {
    stride: { correct: 0, total: 0 },
    risk: { correct: 0, total: 0 },
    sbom: { correct: 0, total: 0 },
    compliance: { correct: 0, total: 0 },
  };

  for (const question of questions) {
    categoryScores[question.category].total++;
    if (answers[question.id] === question.correct_answer) {
      correct++;
      categoryScores[question.category].correct++;
    }
  }

  return {
    score: correct,
    total: questions.length,
    percentage: Math.round((correct / questions.length) * 100),
    categoryScores,
  };
}
