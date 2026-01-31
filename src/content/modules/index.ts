import { Module, Task } from "@/types/training";

export const modules: Module[] = [
  {
    id: "initial-onboarding",
    title: "Initial Onboarding",
    description:
      "Get comfortable with the TARA platform interface and navigation.",
    order_index: 1,
    task_count: 4,
    shield_segment: "orientation",
    prerequisites: [],
  },
  {
    id: "project-setup",
    title: "Project Setup",
    description:
      "Learn to create and configure TARA projects for threat analysis.",
    order_index: 2,
    task_count: 3,
    shield_segment: "project-setup",
    prerequisites: ["initial-onboarding"],
  },
  {
    id: "document-management",
    title: "Document Management",
    description: "Upload and manage specification documents for AI analysis.",
    order_index: 3,
    task_count: 3,
    shield_segment: "documents",
    prerequisites: ["project-setup"],
  },
  {
    id: "architecture-modeling",
    title: "Architecture Modeling",
    description:
      "Build system architecture with zones, components, and data flows.",
    order_index: 4,
    task_count: 5,
    shield_segment: "architecture",
    prerequisites: ["document-management"],
  },
  {
    id: "asset-identification",
    title: "Asset Identification",
    description: "Identify and classify data assets that need protection.",
    order_index: 5,
    task_count: 3,
    shield_segment: "assets",
    prerequisites: ["architecture-modeling"],
  },
  {
    id: "threat-generation",
    title: "Threat Generation",
    description: "Generate and review STRIDE threat scenarios using AI.",
    order_index: 6,
    task_count: 5,
    shield_segment: "threats",
    prerequisites: ["asset-identification"],
  },
  {
    id: "attack-path-analysis",
    title: "Attack Path Analysis",
    description: "Understand how attackers chain steps to reach targets.",
    order_index: 7,
    task_count: 3,
    shield_segment: "attack-paths",
    prerequisites: ["threat-generation"],
  },
  {
    id: "risk-assessment",
    title: "Risk Assessment",
    description: "Calculate risk using ISO 18045 exploitability scoring.",
    order_index: 8,
    task_count: 4,
    shield_segment: "risks",
    prerequisites: ["attack-path-analysis"],
  },
  {
    id: "mitigation-planning",
    title: "Mitigation Planning",
    description: "Plan security controls to address identified risks.",
    order_index: 9,
    task_count: 4,
    shield_segment: "mitigations",
    prerequisites: ["risk-assessment"],
  },
  {
    id: "requirements-generation",
    title: "Requirements Generation",
    description: "Generate verifiable security requirements from mitigations.",
    order_index: 10,
    task_count: 4,
    shield_segment: "requirements",
    prerequisites: ["mitigation-planning"],
  },
  {
    id: "sbom-vulnerability",
    title: "SBOM & Vulnerabilities",
    description: "Manage SBOM packages and triage CVE vulnerabilities.",
    order_index: 11,
    task_count: 5,
    shield_segment: "sbom",
    prerequisites: ["requirements-generation"],
  },
  {
    id: "compliance-verification",
    title: "Compliance & Verification",
    description: "Apply compliance packs and run verification checks.",
    order_index: 12,
    task_count: 4,
    shield_segment: "compliance",
    prerequisites: ["sbom-vulnerability"],
  },
  {
    id: "report-generation",
    title: "Report Generation",
    description: "Generate regulatory compliance reports for FDA, EU CRA.",
    order_index: 13,
    task_count: 3,
    shield_segment: "reports",
    prerequisites: ["compliance-verification"],
  },
];

export const tasks: Record<string, Task[]> = {
  "initial-onboarding": [
    {
      id: "onboard-1",
      module_id: "initial-onboarding",
      title: "Log in to the TARA platform",
      instructions: `1. Click the "Launch TARA" button on the left to open the TARA platform in a new tab.

2. On the login page, click the "Sign in with Google" button.

3. Select your work Google account or enter your credentials.

4. After successful authentication, you'll be redirected to the TARA dashboard.

Note: If you don't have a Google account, contact your administrator for alternative login options.`,
      why_it_matters:
        "Authentication is the first step to accessing the TARA platform. Your account is tied to your organization's projects and data.",
      tips: [
        "Use your work email for authentication",
        "TARA supports multiple users per organization",
        "You'll stay logged in for future sessions",
      ],
      tara_deep_link: "/login",
      order_index: 1,
      verification_type: "manual",
    },
    {
      id: "onboard-2",
      module_id: "initial-onboarding",
      title: "Explore the main dashboard",
      instructions: `1. After logging in, you'll land on the Dashboard. Look at the top navigation bar - you should see your organization name and a user menu on the right.

2. The main dashboard area shows:
   • **Recent Projects** - Your most recently accessed threat models
   • **Quick Stats** - Summary of threats, risks, and compliance status
   • **Activity Feed** - Recent changes made by you or your team

3. Notice the left sidebar navigation. This is your primary way to move between sections.

4. Hover over different cards and buttons to see tooltips explaining their purpose.`,
      why_it_matters:
        "The dashboard is your command center for all threat analysis activities. Understanding its layout helps you work efficiently.",
      tips: [
        "Bookmark the dashboard for quick access",
        "Projects are sorted by most recently updated",
        "The activity feed shows team collaboration",
      ],
      tara_deep_link: "/dashboard",
      order_index: 2,
      verification_type: "manual",
    },
    {
      id: "onboard-3",
      module_id: "initial-onboarding",
      title: "Navigate the sidebar menu",
      instructions: `1. Look at the left sidebar. Click on each menu item to explore:

   • **Dashboard** - Home screen with overview stats
   • **Projects** - List of all your threat modeling projects
   • **Canvas** - Visual architecture diagram (project-specific)
   • **Threats** - AI-generated threat scenarios
   • **Risks** - Risk assessment with ISO 18045 scoring
   • **Mitigations** - Security controls to address risks
   • **SBOM** - Software Bill of Materials and CVEs
   • **Reports** - Generate compliance documentation

2. Notice how some items (Canvas, Threats, etc.) require you to select a project first.

3. Try collapsing the sidebar by clicking the collapse icon (usually << or a hamburger menu) at the bottom of the sidebar.`,
      why_it_matters:
        "Efficient navigation saves time during security assessments. The sidebar follows the natural threat modeling workflow from left to right.",
      tips: [
        "The sidebar can be collapsed for more workspace",
        "Gray/disabled items mean you need to select a project first",
        "The workflow generally flows top-to-bottom",
      ],
      tara_deep_link: "/projects",
      order_index: 3,
      verification_type: "manual",
    },
    {
      id: "onboard-4",
      module_id: "initial-onboarding",
      title: "Understand the project overview",
      instructions: `1. In the sidebar, click "Projects" to see the projects list.

2. If there's an existing demo project, click on it to open it. If not, you'll create one in the next module.

3. Once inside a project, notice the project header showing:
   • Project name and description
   • Device category (Class I, II, or III)
   • Compliance frameworks being tracked

4. Below the header, you'll see summary cards showing:
   • Number of components in your architecture
   • Threat count and their status (reviewed/pending)
   • Risk distribution (Critical/High/Medium/Low)
   • Mitigation coverage percentage

5. This overview is your quick health check for any project's security posture.`,
      why_it_matters:
        "The project overview gives you a bird's-eye view of your security posture. Use it to quickly assess project status and identify areas needing attention.",
      tips: [
        "Each project has its own Canvas, Threats, and Reports",
        "You can switch between projects from the sidebar or top dropdown",
        "The overview updates in real-time as you make changes",
      ],
      tara_deep_link: "/projects",
      order_index: 4,
      verification_type: "manual",
    },
  ],
  "project-setup": [
    {
      id: "project-1",
      module_id: "project-setup",
      title: "Create a new project",
      instructions: `1. In the sidebar, click "Projects" to go to the projects list.

2. Look for the "+ Create Project" button in the top-right corner of the page. Click it.

3. In the create project dialog, enter:
   • **Project Name**: Give it a descriptive name (e.g., "Training - Insulin Pump v2.0")
   • **Description**: Brief description of what this project covers

4. Click "Create" or "Save" to create your project.

5. You'll be taken to your new project's overview page. Notice the project is empty - no components, threats, or risks yet.

For this training, use a name like "TARA Training Project" so you can easily identify it later.`,
      why_it_matters:
        "Projects organize all your threat analysis work for a specific product or system. Each project contains its own architecture, threats, risks, and reports.",
      tips: [
        "Use descriptive names like 'Insulin Pump v2.0' or 'ECU Firmware 2024'",
        "You can edit project details later from Project Settings",
        "One project = one product or system being analyzed",
      ],
      tara_deep_link: "/projects/new",
      order_index: 1,
      verification_type: "manual",
    },
    {
      id: "project-2",
      module_id: "project-setup",
      title: "Configure device category and lifecycle stage",
      instructions: `1. From your project overview, look for a "Settings" or "Configure" option. This might be:
   • A gear icon (⚙️) in the project header
   • A "Project Settings" link in the sidebar
   • An "Edit" button near the project name

2. Find the "Device Category" section and select the appropriate FDA classification:
   • **Class I** - Low risk devices (e.g., bandages, tongue depressors)
   • **Class II** - Moderate risk devices (e.g., powered wheelchairs, pregnancy tests)
   • **Class III** - High risk devices (e.g., pacemakers, insulin pumps)

3. Find the "Lifecycle Stage" dropdown and select:
   • **Design** - Early development phase
   • **Development** - Active implementation
   • **Verification** - Testing and validation
   • **Production** - Released product
   • **Post-Market** - Monitoring deployed products

4. Save your changes.

For training, select "Class II" and "Development" as typical values.`,
      why_it_matters:
        "Device classification affects which regulations apply and the depth of security analysis required. Class III devices need the most rigorous analysis.",
      tips: [
        "Class III devices require PMA (Pre-Market Approval)",
        "Lifecycle stage affects which compliance activities are relevant",
        "You can update these settings as your project evolves",
      ],
      tara_deep_link: "/projects",
      order_index: 2,
      verification_type: "manual",
    },
    {
      id: "project-3",
      module_id: "project-setup",
      title: "Set target compliance standards",
      instructions: `1. In Project Settings, find the "Compliance Frameworks" or "Standards" section.

2. You'll see a list of available compliance frameworks. Check/select the ones that apply:
   • **FDA Cybersecurity Guidance** - Required for US medical devices
   • **EU MDR/IVDR** - European medical device regulations
   • **EU Cyber Resilience Act (CRA)** - New EU cybersecurity requirements
   • **IEC 62443** - Industrial automation security
   • **ISO 21434** - Automotive cybersecurity
   • **UNECE WP.29** - Vehicle cybersecurity regulations

3. For each selected framework, TARA will:
   • Track relevant control objectives
   • Map your mitigations to requirements
   • Include framework-specific sections in reports

4. Click "Save" to apply your selections.

For training, select "FDA Cybersecurity Guidance" and "EU CRA" as common choices.`,
      why_it_matters:
        "Different markets have different cybersecurity requirements. Selecting the right frameworks ensures your threat model addresses all regulatory needs.",
      tips: [
        "You can select multiple standards - TARA handles the overlap",
        "FDA Cybersecurity Guidance applies to all US medical devices",
        "EU CRA will be mandatory for products sold in Europe starting 2027",
      ],
      tara_deep_link: "/projects",
      order_index: 3,
      verification_type: "manual",
    },
  ],
  "document-management": [
    {
      id: "doc-1",
      module_id: "document-management",
      title: "Upload a specification document",
      instructions: `1. In the sidebar, click "Documents" to open the document management section.

2. Look for an "Upload" or "+ Add Document" button. Click it.

3. You can either:
   • **Drag and drop** a file onto the upload area
   • **Click "Browse"** to select a file from your computer

4. Select a PDF or document file. Good documents to upload include:
   • Product specification documents
   • System architecture diagrams
   • Requirements documents
   • Technical design documents

5. After selecting the file, you may be asked to categorize it:
   • **Specification** - Product requirements and features
   • **Architecture** - System design and components
   • **Regulatory** - Compliance requirements

6. Click "Upload" to start processing.

Note: If you don't have a document ready, TARA may have sample documents you can use for training.`,
      why_it_matters:
        "TARA's AI extracts context from your documents to generate accurate threats. The more relevant documents you provide, the better the threat analysis.",
      tips: [
        "PDFs work best - they preserve formatting",
        "Technical specifications yield richer threat analysis",
        "You can upload multiple documents to build context",
      ],
      tara_deep_link: "/documents",
      order_index: 1,
      verification_type: "manual",
    },
    {
      id: "doc-2",
      module_id: "document-management",
      title: "View document processing status",
      instructions: `1. After uploading, you'll see your document in the documents list with a processing indicator.

2. Watch for status changes:
   • **Uploading** - File is being transferred
   • **Processing** - AI is analyzing the document
   • **Extracting** - Key information is being pulled out
   • **Complete** - Ready to use

3. Processing typically takes 1-2 minutes depending on document size.

4. While processing, you can:
   • Upload additional documents
   • View other parts of the application
   • The processing continues in the background

5. Once complete, you'll see a success indicator (green checkmark or "Processed" status).`,
      why_it_matters:
        "Understanding the processing pipeline helps you provide better input documents. TARA uses AI to extract components, interfaces, and security-relevant information.",
      tips: [
        "Processing typically takes 1-2 minutes",
        "Larger documents (50+ pages) may take longer",
        "You can upload multiple documents while one is processing",
      ],
      tara_deep_link: "/documents",
      order_index: 2,
      verification_type: "manual",
    },
    {
      id: "doc-3",
      module_id: "document-management",
      title: "Review AI-extracted summaries",
      instructions: `1. Click on a processed document to view its details.

2. You'll see AI-extracted information including:
   • **Document Summary** - High-level overview of the document's content
   • **Key Components** - Hardware and software components identified
   • **Interfaces** - Communication protocols and data flows
   • **Security Features** - Existing security controls mentioned
   • **Regulatory References** - Compliance standards referenced

3. Review each extracted item for accuracy:
   • ✓ Correct items help TARA generate relevant threats
   • ✗ Incorrect items should be edited or removed

4. To edit an extraction:
   • Click on the item
   • Modify the text or properties
   • Save your changes

5. Your edits help improve the AI's understanding of your product.`,
      why_it_matters:
        "Accurate document extraction leads to more relevant threat scenarios. Taking time to verify extractions improves the entire threat modeling process.",
      tips: [
        "You can edit extracted information to fix any errors",
        "The AI learns from your corrections over time",
        "Missing components can be added manually on the Canvas",
      ],
      tara_deep_link: "/documents",
      order_index: 3,
      verification_type: "manual",
    },
  ],
  "architecture-modeling": [
    {
      id: "arch-1",
      module_id: "architecture-modeling",
      title: "Understand trust zones",
      instructions:
        "Learn about trust zones and their role in security modeling.",
      why_it_matters:
        "Trust zones define security boundaries - where you trust data and where you don't.",
      tips: [
        "Common zones: Internet, DMZ, Internal Network, Device",
        "Data crossing zone boundaries needs protection",
      ],
      tara_deep_link: "/canvas",
      order_index: 1,
      verification_type: "manual",
    },
    {
      id: "arch-2",
      module_id: "architecture-modeling",
      title: "Create components on the Canvas",
      instructions:
        "Add system components like servers, databases, and device modules to the Canvas.",
      why_it_matters:
        "Components are the building blocks of your security model.",
      tips: [
        "Drag and drop to add components",
        "Name components descriptively",
        "Group related components together",
      ],
      tara_deep_link: "/canvas",
      order_index: 2,
      verification_type: "manual",
    },
    {
      id: "arch-3",
      module_id: "architecture-modeling",
      title: "Draw data flows",
      instructions:
        "Connect components with arrows showing how data moves through your system.",
      why_it_matters:
        "Data flows help identify where attacks could intercept or modify information.",
      tips: [
        "Label flows with data types",
        "Show bi-directional flows where applicable",
        "Include external integrations",
      ],
      tara_deep_link: "/canvas",
      order_index: 3,
      verification_type: "manual",
    },
    {
      id: "arch-4",
      module_id: "architecture-modeling",
      title: "Mark entry points",
      instructions:
        "Identify and mark external entry points where attackers could access the system.",
      why_it_matters:
        "Entry points are the attack surface - where threats originate.",
      tips: [
        "APIs, network ports, USB interfaces are common entry points",
        "Physical access points count too",
      ],
      tara_deep_link: "/canvas",
      order_index: 4,
      verification_type: "manual",
    },
    {
      id: "arch-5",
      module_id: "architecture-modeling",
      title: "Review and refine architecture",
      instructions:
        "Step back and review your complete architecture diagram for completeness.",
      why_it_matters:
        "A complete architecture model enables comprehensive threat analysis.",
      tips: [
        "Check for missing components",
        "Verify all data flows are documented",
        "Have a peer review the diagram",
      ],
      tara_deep_link: "/canvas",
      order_index: 5,
      verification_type: "manual",
    },
  ],
  "asset-identification": [
    {
      id: "asset-1",
      module_id: "asset-identification",
      title: "Understand assets in security context",
      instructions: "Learn what constitutes an 'asset' in product security.",
      why_it_matters:
        "Assets are what you're protecting - patient data, device firmware, credentials.",
      tips: [
        "Assets can be data, functionality, or reputation",
        "Consider regulatory requirements for sensitive data",
      ],
      tara_deep_link: "/assets",
      order_index: 1,
      verification_type: "manual",
    },
    {
      id: "asset-2",
      module_id: "asset-identification",
      title: "Create and classify assets",
      instructions:
        "Add assets to your project and classify their sensitivity level.",
      why_it_matters: "Asset classification drives risk prioritization.",
      tips: [
        "PHI (Protected Health Info) is high sensitivity",
        "Device firmware is often critical",
        "Include cryptographic keys",
      ],
      tara_deep_link: "/assets",
      order_index: 2,
      verification_type: "manual",
    },
    {
      id: "asset-3",
      module_id: "asset-identification",
      title: "Link assets to components",
      instructions:
        "Associate each asset with the components that store, process, or transmit it.",
      why_it_matters:
        "Linking assets to components enables automatic threat generation.",
      tips: [
        "One asset can link to multiple components",
        "This mapping feeds into the threat model",
      ],
      tara_deep_link: "/assets",
      order_index: 3,
      verification_type: "manual",
    },
  ],
  "threat-generation": [
    {
      id: "threat-1",
      module_id: "threat-generation",
      title: "Understand STRIDE methodology",
      instructions:
        "Learn the six STRIDE threat categories and what each means.",
      why_it_matters:
        "STRIDE is the industry-standard framework for categorizing threats.",
      tips: [
        "S=Spoofing, T=Tampering, R=Repudiation, I=Info Disclosure, D=Denial of Service, E=Elevation of Privilege",
      ],
      tara_deep_link: "/threats",
      order_index: 1,
      verification_type: "manual",
    },
    {
      id: "threat-2",
      module_id: "threat-generation",
      title: "Run AI threat generation",
      instructions:
        "Click 'Generate Threats' to have TARA's AI analyze your architecture.",
      why_it_matters:
        "AI-powered generation identifies threats you might miss manually.",
      tips: [
        "Generation uses your documents and architecture",
        "More context = better threats",
      ],
      tara_deep_link: "/threats",
      order_index: 2,
      verification_type: "manual",
    },
    {
      id: "threat-3",
      module_id: "threat-generation",
      title: "Review generated threats",
      instructions:
        "Examine each generated threat scenario for relevance and accuracy.",
      why_it_matters:
        "Human review ensures AI-generated threats are applicable to your product.",
      tips: [
        "Look for false positives",
        "Add context from your domain expertise",
      ],
      tara_deep_link: "/threats",
      order_index: 3,
      verification_type: "manual",
    },
    {
      id: "threat-4",
      module_id: "threat-generation",
      title: "Mark threats as reviewed",
      instructions:
        "Set the review status for each threat (Confirmed, Not Applicable, Needs Review).",
      why_it_matters:
        "Tracking review status ensures all threats are properly evaluated.",
      tips: [
        "Document why threats are marked Not Applicable",
        "Confirmed threats proceed to risk assessment",
      ],
      tara_deep_link: "/threats",
      order_index: 4,
      verification_type: "manual",
    },
    {
      id: "threat-5",
      module_id: "threat-generation",
      title: "Add custom threats",
      instructions:
        "Manually add any threats the AI may have missed based on your expertise.",
      why_it_matters: "Domain knowledge complements AI for complete coverage.",
      tips: [
        "Consider insider threats",
        "Think about physical access scenarios",
      ],
      tara_deep_link: "/threats",
      order_index: 5,
      verification_type: "manual",
    },
  ],
  "attack-path-analysis": [
    {
      id: "attack-1",
      module_id: "attack-path-analysis",
      title: "Understand attack paths",
      instructions:
        "Learn how attackers chain multiple steps to reach their goal.",
      why_it_matters:
        "Attack paths show realistic exploitation scenarios, not just isolated threats.",
      tips: [
        "Paths often start at entry points",
        "Each step exploits a specific weakness",
      ],
      tara_deep_link: "/attack-paths",
      order_index: 1,
      verification_type: "manual",
    },
    {
      id: "attack-2",
      module_id: "attack-path-analysis",
      title: "Review generated attack paths",
      instructions:
        "Examine the automatically generated attack paths and their severity.",
      why_it_matters:
        "Understanding attack chains helps prioritize defenses at key choke points.",
      tips: [
        "Shorter paths are often more likely",
        "Look for paths to critical assets",
      ],
      tara_deep_link: "/attack-paths",
      order_index: 2,
      verification_type: "manual",
    },
    {
      id: "attack-3",
      module_id: "attack-path-analysis",
      title: "Assess path viability",
      instructions: "Evaluate each attack path for real-world feasibility.",
      why_it_matters:
        "Not all theoretical paths are practical - focus on viable ones.",
      tips: [
        "Consider attacker motivation and capability",
        "Factor in existing controls",
      ],
      tara_deep_link: "/attack-paths",
      order_index: 3,
      verification_type: "manual",
    },
  ],
  "risk-assessment": [
    {
      id: "risk-1",
      module_id: "risk-assessment",
      title: "Understand ISO 18045 exploitability scoring",
      instructions:
        "Learn the five factors used to calculate attack exploitability.",
      why_it_matters:
        "ISO 18045 provides a standardized, repeatable method for assessing risk.",
      tips: [
        "Factors: Time, Expertise, Knowledge, Window, Equipment",
        "Lower scores = easier to exploit",
      ],
      tara_deep_link: "/risks",
      order_index: 1,
      verification_type: "manual",
    },
    {
      id: "risk-2",
      module_id: "risk-assessment",
      title: "Review AI-proposed risk factors",
      instructions:
        "Examine the AI's suggested values for each exploitability factor.",
      why_it_matters:
        "AI provides starting values but human judgment ensures accuracy.",
      tips: [
        "Adjust based on your product specifics",
        "Document rationale for changes",
      ],
      tara_deep_link: "/risks",
      order_index: 2,
      verification_type: "manual",
    },
    {
      id: "risk-3",
      module_id: "risk-assessment",
      title: "Understand the risk matrix",
      instructions:
        "See how exploitability and impact combine to determine risk level.",
      why_it_matters:
        "The risk matrix provides consistent, defensible risk ratings.",
      tips: [
        "Levels: Critical, High, Medium, Low",
        "Critical risks need immediate attention",
      ],
      tara_deep_link: "/risks",
      order_index: 3,
      verification_type: "manual",
    },
    {
      id: "risk-4",
      module_id: "risk-assessment",
      title: "Complete risk assessments",
      instructions: "Finalize risk assessments for all confirmed threats.",
      why_it_matters:
        "Complete risk data enables proper prioritization of mitigations.",
      tips: [
        "Higher risks = higher priority for mitigation",
        "Track risk trends over time",
      ],
      tara_deep_link: "/risks",
      order_index: 4,
      verification_type: "manual",
    },
  ],
  "mitigation-planning": [
    {
      id: "mit-1",
      module_id: "mitigation-planning",
      title: "Understand control types",
      instructions:
        "Learn the different types of security controls (Preventive, Detective, Corrective).",
      why_it_matters: "A mix of control types provides defense in depth.",
      tips: [
        "Preventive: Stop attacks before they succeed",
        "Detective: Identify attacks in progress",
        "Corrective: Recover from attacks",
      ],
      tara_deep_link: "/mitigations",
      order_index: 1,
      verification_type: "manual",
    },
    {
      id: "mit-2",
      module_id: "mitigation-planning",
      title: "Generate mitigations for risks",
      instructions: "Use AI to generate recommended mitigations for each risk.",
      why_it_matters: "AI suggests best practices you might not think of.",
      tips: ["Review all suggestions", "Consider implementation feasibility"],
      tara_deep_link: "/mitigations",
      order_index: 2,
      verification_type: "manual",
    },
    {
      id: "mit-3",
      module_id: "mitigation-planning",
      title: "Set implementation status",
      instructions:
        "Track whether each mitigation is Planned, In Progress, or Implemented.",
      why_it_matters:
        "Status tracking ensures mitigations are actually deployed.",
      tips: ["Link to engineering tickets", "Set target dates"],
      tara_deep_link: "/mitigations",
      order_index: 3,
      verification_type: "manual",
    },
    {
      id: "mit-4",
      module_id: "mitigation-planning",
      title: "Link mitigations to vulnerabilities",
      instructions:
        "Connect mitigations to the specific vulnerabilities or threats they address.",
      why_it_matters: "Traceability proves you've addressed identified risks.",
      tips: [
        "One mitigation can address multiple threats",
        "Document the relationship clearly",
      ],
      tara_deep_link: "/mitigations",
      order_index: 4,
      verification_type: "manual",
    },
  ],
  "requirements-generation": [
    {
      id: "req-1",
      module_id: "requirements-generation",
      title: "Understand security requirements",
      instructions:
        "Learn what makes a good security requirement (specific, testable, traceable).",
      why_it_matters:
        "Requirements translate mitigations into implementable specifications.",
      tips: ["Use SMART criteria", "Requirements should be verifiable"],
      tara_deep_link: "/requirements",
      order_index: 1,
      verification_type: "manual",
    },
    {
      id: "req-2",
      module_id: "requirements-generation",
      title: "Generate requirements from mitigations",
      instructions:
        "Use AI to create detailed requirements from your mitigation plans.",
      why_it_matters:
        "AI ensures requirements are comprehensive and well-structured.",
      tips: ["Review for clarity", "Ensure requirements are actionable"],
      tara_deep_link: "/requirements",
      order_index: 2,
      verification_type: "manual",
    },
    {
      id: "req-3",
      module_id: "requirements-generation",
      title: "Map requirements to standards",
      instructions:
        "Link requirements to relevant regulatory standards (FDA, EU CRA, etc.).",
      why_it_matters: "Mapping proves compliance during audits and reviews.",
      tips: [
        "Most requirements map to multiple standards",
        "Note gaps in coverage",
      ],
      tara_deep_link: "/requirements",
      order_index: 3,
      verification_type: "manual",
    },
    {
      id: "req-4",
      module_id: "requirements-generation",
      title: "Set verification methods",
      instructions:
        "Define how each requirement will be tested (test, inspection, analysis).",
      why_it_matters:
        "Clear verification methods enable objective compliance proof.",
      tips: ["Automated tests are preferable", "Document test procedures"],
      tara_deep_link: "/requirements",
      order_index: 4,
      verification_type: "manual",
    },
  ],
  "sbom-vulnerability": [
    {
      id: "sbom-1",
      module_id: "sbom-vulnerability",
      title: "Understand SBOM packages",
      instructions: "Learn what an SBOM is and why it matters for security.",
      why_it_matters:
        "SBOMs list all software components, enabling vulnerability tracking.",
      tips: ["SBOM = Software Bill of Materials", "Required by FDA and EU CRA"],
      tara_deep_link: "/sbom",
      order_index: 1,
      verification_type: "manual",
    },
    {
      id: "sbom-2",
      module_id: "sbom-vulnerability",
      title: "Review vulnerabilities",
      instructions: "Examine CVEs affecting your SBOM components.",
      why_it_matters: "Known vulnerabilities are easy targets for attackers.",
      tips: ["Focus on high/critical CVEs first", "Check CVSS scores"],
      tara_deep_link: "/sbom/vulnerabilities",
      order_index: 2,
      verification_type: "manual",
    },
    {
      id: "sbom-3",
      module_id: "sbom-vulnerability",
      title: "Triage vulnerabilities with VEX",
      instructions:
        "Use VEX status to indicate how vulnerabilities affect your product.",
      why_it_matters:
        "VEX tells customers if a CVE is actually exploitable in your product.",
      tips: [
        "Statuses: Affected, Not Affected, Under Investigation, Fixed",
        "Document your reasoning",
      ],
      tara_deep_link: "/sbom/vulnerabilities",
      order_index: 3,
      verification_type: "manual",
    },
    {
      id: "sbom-4",
      module_id: "sbom-vulnerability",
      title: "Link CVEs to threats",
      instructions: "Connect CVE vulnerabilities to related threat scenarios.",
      why_it_matters:
        "Linking provides traceability and context for remediation.",
      tips: [
        "A CVE may enable multiple threats",
        "Update threats when CVEs are fixed",
      ],
      tara_deep_link: "/sbom/vulnerabilities",
      order_index: 4,
      verification_type: "manual",
    },
    {
      id: "sbom-5",
      module_id: "sbom-vulnerability",
      title: "Monitor SLA tracking",
      instructions:
        "Review remediation timelines and SLA compliance for vulnerabilities.",
      why_it_matters: "SLAs ensure timely vulnerability remediation.",
      tips: [
        "Critical CVEs typically have 30-day SLAs",
        "Set up alerts for approaching deadlines",
      ],
      tara_deep_link: "/sbom/vulnerabilities",
      order_index: 5,
      verification_type: "manual",
    },
  ],
  "compliance-verification": [
    {
      id: "comp-1",
      module_id: "compliance-verification",
      title: "Apply compliance packs",
      instructions:
        "Select and apply relevant compliance frameworks to your project.",
      why_it_matters:
        "Compliance packs map your work to regulatory requirements.",
      tips: [
        "Choose based on target markets",
        "FDA, EU CRA, ISO 21434 are common",
      ],
      tara_deep_link: "/compliance",
      order_index: 1,
      verification_type: "manual",
    },
    {
      id: "comp-2",
      module_id: "compliance-verification",
      title: "Understand control objectives",
      instructions:
        "Review the control objectives required by each compliance framework.",
      why_it_matters:
        "Understanding objectives helps ensure comprehensive coverage.",
      tips: [
        "Each framework has specific control areas",
        "TARA maps your work to these controls",
      ],
      tara_deep_link: "/compliance",
      order_index: 2,
      verification_type: "manual",
    },
    {
      id: "comp-3",
      module_id: "compliance-verification",
      title: "Run verification checks",
      instructions:
        "Execute automated verification to check compliance status.",
      why_it_matters: "Verification identifies gaps before auditors do.",
      tips: ["Run regularly during development", "Address gaps proactively"],
      tara_deep_link: "/compliance",
      order_index: 3,
      verification_type: "manual",
    },
    {
      id: "comp-4",
      module_id: "compliance-verification",
      title: "Review verification results",
      instructions:
        "Analyze verification results and create remediation plans.",
      why_it_matters: "Understanding failures enables targeted improvements.",
      tips: ["Prioritize high-impact gaps", "Document remediation actions"],
      tara_deep_link: "/compliance",
      order_index: 4,
      verification_type: "manual",
    },
  ],
  "report-generation": [
    {
      id: "report-1",
      module_id: "report-generation",
      title: "Select report templates",
      instructions:
        "Choose from available report templates (FDA, EU CRA, Executive Summary).",
      why_it_matters: "Different audiences need different report formats.",
      tips: [
        "FDA format for US submissions",
        "Executive summary for leadership",
      ],
      tara_deep_link: "/reports",
      order_index: 1,
      verification_type: "manual",
    },
    {
      id: "report-2",
      module_id: "report-generation",
      title: "Preview reports",
      instructions:
        "Review the report preview before generating the final document.",
      why_it_matters:
        "Preview catches errors before sharing with stakeholders.",
      tips: ["Check for completeness", "Verify risk summaries are accurate"],
      tara_deep_link: "/reports",
      order_index: 2,
      verification_type: "manual",
    },
    {
      id: "report-3",
      module_id: "report-generation",
      title: "Generate and download reports",
      instructions:
        "Generate the final report and download in your preferred format.",
      why_it_matters:
        "Reports are the deliverable for regulators and stakeholders.",
      tips: ["PDF is common for submissions", "Keep version history"],
      tara_deep_link: "/reports",
      order_index: 3,
      verification_type: "manual",
    },
  ],
};

export function getModule(moduleId: string): Module | undefined {
  return modules.find((m) => m.id === moduleId);
}

export function getModuleTasks(moduleId: string): Task[] {
  return tasks[moduleId] || [];
}

export function getTask(moduleId: string, taskId: string): Task | undefined {
  const moduleTasks = tasks[moduleId] || [];
  return moduleTasks.find((t) => t.id === taskId);
}
