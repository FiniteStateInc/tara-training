import { AssessmentQuestion } from "@/types/training";

export const assessmentQuestions: AssessmentQuestion[] = [
  // STRIDE Questions - Focus on practical understanding
  {
    id: "stride-1",
    question: "A hacker pretending to be an administrator to access a system is an example of which threat type?",
    options: [
      { id: "a", text: "Tampering" },
      { id: "b", text: "Spoofing" },
      { id: "c", text: "Elevation of Privilege" },
      { id: "d", text: "Information Disclosure" },
    ],
    correct_answer: "b",
    category: "stride",
    explanation: "Spoofing is when an attacker pretends to be someone or something they're not, like impersonating a user or forging credentials.",
  },
  {
    id: "stride-2",
    question: "Malicious modification of data in transit or at rest is classified as which STRIDE category?",
    options: [
      { id: "a", text: "Spoofing" },
      { id: "b", text: "Repudiation" },
      { id: "c", text: "Tampering" },
      { id: "d", text: "Denial of Service" },
    ],
    correct_answer: "c",
    category: "stride",
    explanation: "Tampering involves the malicious modification of data or code to compromise system integrity.",
  },
  {
    id: "stride-3",
    question: "When a system lacks proper audit logging and a user can deny performing an action, this represents which threat?",
    options: [
      { id: "a", text: "Tampering" },
      { id: "b", text: "Information Disclosure" },
      { id: "c", text: "Denial of Service" },
      { id: "d", text: "Repudiation" },
    ],
    correct_answer: "d",
    category: "stride",
    explanation: "Repudiation is the ability of a user or attacker to deny performing an action without the system being able to prove otherwise.",
  },
  {
    id: "stride-4",
    question: "Sensitive patient data being exposed through an API vulnerability is an example of:",
    options: [
      { id: "a", text: "Denial of Service" },
      { id: "b", text: "Information Disclosure" },
      { id: "c", text: "Elevation of Privilege" },
      { id: "d", text: "Spoofing" },
    ],
    correct_answer: "b",
    category: "stride",
    explanation: "Information Disclosure is the exposure of sensitive information to unauthorized parties.",
  },
  
  // Risk Assessment Questions - Focus on practical application
  {
    id: "risk-1",
    question: "What is the primary purpose of a risk matrix in threat analysis?",
    options: [
      { id: "a", text: "To list all system components" },
      { id: "b", text: "To combine exploitability and impact to prioritize threats" },
      { id: "c", text: "To track project timelines" },
      { id: "d", text: "To generate compliance reports" },
    ],
    correct_answer: "b",
    category: "risk",
    explanation: "A risk matrix plots threats based on their likelihood (exploitability) and impact to help prioritize which threats to address first.",
  },
  {
    id: "risk-2",
    question: "In TARA's risk assessment, which factors determine how easy a threat is to exploit?",
    options: [
      { id: "a", text: "Cost, location, and time zone" },
      { id: "b", text: "Time, expertise, knowledge, window of opportunity, and equipment" },
      { id: "c", text: "Company size and industry" },
      { id: "d", text: "Number of developers and testing hours" },
    ],
    correct_answer: "b",
    category: "risk",
    explanation: "ISO 18045 exploitability factors include: time required, expertise level needed, knowledge of the system, window of opportunity, and equipment required.",
  },
  {
    id: "risk-3",
    question: "A threat with high exploitability and catastrophic impact would typically be rated as:",
    options: [
      { id: "a", text: "Low risk" },
      { id: "b", text: "Medium risk" },
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
    options: [
      { id: "a", text: "The physical location of the attacker" },
      { id: "b", text: "A sequence of steps an attacker could take from entry point to target" },
      { id: "c", text: "The network route packets travel" },
      { id: "d", text: "The order in which features were developed" },
    ],
    correct_answer: "b",
    category: "risk",
    explanation: "An attack path shows how an attacker could chain multiple steps together, from an entry point through intermediate steps to reach a target asset.",
  },

  // SBOM/Vulnerability Questions - Focus on practical workflow
  {
    id: "sbom-1",
    question: "What is the purpose of an SBOM (Software Bill of Materials)?",
    options: [
      { id: "a", text: "To track developer hours" },
      { id: "b", text: "To inventory all software components, libraries, and dependencies" },
      { id: "c", text: "To generate marketing materials" },
      { id: "d", text: "To calculate product pricing" },
    ],
    correct_answer: "b",
    category: "sbom",
    explanation: "An SBOM is a complete inventory of all software components in a product, enabling vulnerability tracking and supply chain security.",
  },
  {
    id: "sbom-2",
    question: "When triaging vulnerabilities, what does marking a CVE as 'Not Affected' mean?",
    options: [
      { id: "a", text: "The vulnerability has been patched" },
      { id: "b", text: "The vulnerable code is not reachable or present in your product" },
      { id: "c", text: "The vulnerability is too old to matter" },
      { id: "d", text: "Someone else is responsible for fixing it" },
    ],
    correct_answer: "b",
    category: "sbom",
    explanation: "'Not Affected' means the vulnerability exists in the package but is not exploitable in your specific product context - the code path isn't reachable.",
  },
  {
    id: "sbom-3",
    question: "Why should vulnerabilities be linked to threat scenarios in TARA?",
    options: [
      { id: "a", text: "For better report formatting" },
      { id: "b", text: "To understand which threats become more likely and track remediation impact" },
      { id: "c", text: "To increase the vulnerability count" },
      { id: "d", text: "To automatically fix the vulnerabilities" },
    ],
    correct_answer: "b",
    category: "sbom",
    explanation: "Linking vulnerabilities to threats helps understand exploitability, shows which threats are enabled by the vulnerability, and provides complete traceability.",
  },
  {
    id: "sbom-4",
    question: "What is the benefit of 'promoting' an SBOM package to a component in TARA?",
    options: [
      { id: "a", text: "It makes the package run faster" },
      { id: "b", text: "It allows detailed threat modeling and architecture visualization for that package" },
      { id: "c", text: "It removes the package from the SBOM" },
      { id: "d", text: "It automatically updates the package version" },
    ],
    correct_answer: "b",
    category: "sbom",
    explanation: "Promoting a package to a component lets you model it in your architecture, generate specific threats for it, and visualize its data flows.",
  },

  // Compliance/Workflow Questions - Focus on understanding process
  {
    id: "compliance-1",
    question: "What is the purpose of a mitigation in the threat modeling workflow?",
    options: [
      { id: "a", text: "To document that a threat exists" },
      { id: "b", text: "To define a security control that reduces the likelihood or impact of a threat" },
      { id: "c", text: "To calculate the risk score" },
      { id: "d", text: "To generate the final report" },
    ],
    correct_answer: "b",
    category: "compliance",
    explanation: "Mitigations are security controls implemented to reduce the likelihood or impact of identified threats being realized.",
  },
  {
    id: "compliance-2",
    question: "In TARA's workflow, what comes after mitigations are defined?",
    options: [
      { id: "a", text: "Threat generation" },
      { id: "b", text: "Architecture modeling" },
      { id: "c", text: "Security requirements generation" },
      { id: "d", text: "Document upload" },
    ],
    correct_answer: "c",
    category: "compliance",
    explanation: "After defining mitigations, you generate verifiable security requirements that specify how those mitigations will be implemented.",
  },
  {
    id: "compliance-3",
    question: "What is the purpose of verification checks in TARA?",
    options: [
      { id: "a", text: "To verify the AI is working correctly" },
      { id: "b", text: "To prove that security requirements are actually implemented in the shipped product" },
      { id: "c", text: "To check spelling in reports" },
      { id: "d", text: "To verify user passwords" },
    ],
    correct_answer: "b",
    category: "compliance",
    explanation: "Verification checks prove requirements are met with evidence from the actual shipped firmware, bridging the gap between design intent and reality.",
  },
  {
    id: "compliance-4",
    question: "What is a 'trust zone' in system architecture?",
    options: [
      { id: "a", text: "A geographic location where servers are hosted" },
      { id: "b", text: "A logical boundary grouping components with the same trust level and security requirements" },
      { id: "c", text: "A type of firewall" },
      { id: "d", text: "A user permission level" },
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
