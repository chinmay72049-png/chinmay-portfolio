export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  workflowSteps: { step: string; label: string; desc: string }[];
  features: string[];
  techStack: string[];
}

export const projects: ProjectItem[] = [
  {
    id: "real-estate-voice-agent",
    title: "AI Voice Agent & Automation",
    category: "Voice AI & Client Systems",
    tagline: "Autonomous voice calling agent handling end-to-end real estate inquiries and lead qualification.",
    description: "Engineered conversational voice agents for real estate clients that conduct natural voice dialogues with prospective buyers, qualify buyer intent, collect property preferences, and trigger downstream CRM handoffs.",
    workflowSteps: [
      { step: "01", label: "Incoming Lead", desc: "Prospective buyer initiates inquiry or inbound phone call." },
      { step: "02", label: "Voice Conversation", desc: "Low-latency bidirectional voice dialogue handles objections and questions." },
      { step: "03", label: "Intent Understanding", desc: "LLM extracts budget, location preference, and purchase timeline." },
      { step: "04", label: "Workflow Automation", desc: "Structured lead dossier passed into automated CRM and calendar tools." },
      { step: "05", label: "Operational Handoff", desc: "Follow-up SMS/email scheduled and human sales broker alerted." }
    ],
    features: [
      "Natural conversational flow with real-time acoustic speech understanding",
      "Lead engagement & automated buyer qualification criteria",
      "Automated follow-up scheduling with zero human latency",
      "Seamless operational handoff to human sales agents"
    ],
    techStack: ["Voice AI", "Conversational AI", "Speech-to-Text", "Text-to-Speech", "LLMs", "CRM Automation"]
  },
  {
    id: "marketing-automation",
    title: "AI Marketing Automation",
    category: "LLM Automation & Workflow Orchestration",
    tagline: "LLM-powered engine generating multi-format digital marketing collateral from business parameters.",
    description: "An automated content orchestration system that ingests business requirements, targets audience personas, and synthesizes structured multi-channel marketing campaigns while scheduling downstream publishing tasks.",
    workflowSteps: [
      { step: "01", label: "Business Requirement", desc: "Client inputs campaign objectives, tone guidelines, and key themes." },
      { step: "02", label: "Context Processing", desc: "LLM retrieves brand voice parameters and market positioning context." },
      { step: "03", label: "Content Structuring", desc: "Multi-modal copy variants generated for social, email, and landing pages." },
      { step: "04", label: "Quality Validation", desc: "Automated schema evaluation checks constraints and readability." },
      { step: "05", label: "Workflow Execution", desc: "Outputs dispatched to distribution channels via automated webhooks." }
    ],
    features: [
      "Eliminates repetitive manual copy creation workflows",
      "Strict alignment with brand context and audience personas",
      "End-to-end connection between LLM synthesis and business tooling",
      "Multi-channel output formatting ready for immediate scheduling"
    ],
    techStack: ["LLMs", "Prompt Engineering", "Context Engineering", "n8n", "Composio", "Workflow Automation"]
  },
  {
    id: "data-analysis-agent",
    title: "AI Automation for Data Analysis",
    category: "Agentic AI & Analytics",
    tagline: "LLM agent coordinating exploratory data analysis through automated Python execution workflows.",
    description: "An intelligent autonomous agent that ingests raw structured datasets, formulates statistical hypothesis questions, generates and executes Python data analysis scripts, and distills high-level strategic insights.",
    workflowSteps: [
      { step: "01", label: "Dataset Ingestion", desc: "CSV/SQL data sources loaded into memory with automated schema inference." },
      { step: "02", label: "Agent Planning", desc: "LLM analyzes distributions, anomalies, and key performance variables." },
      { step: "03", label: "Python Execution", desc: "Agent writes and executes targeted statistical routines in Python." },
      { step: "04", label: "Insight Synthesis", desc: "Statistical outputs translated into concise executive summaries." },
      { step: "05", label: "Visual Output", desc: "Charts, metrics, and actionable recommendations surfaced to user." }
    ],
    features: [
      "Automated tabular dataset parsing and data cleaning",
      "Dynamic Python code generation for custom statistical queries",
      "Zero-hallucination metric extraction directly grounded in raw data",
      "Executive visual reports with actionable operational insights"
    ],
    techStack: ["Python", "AI Agents", "SQL", "Data Analysis", "LLM Reasoning", "Automated Workflows"]
  }
];
