// Grounded knowledge map and section explanations for Zarbo
export interface SectionNarration {
  sectionId: string;
  line: string;
}

export const sectionNarrations: Record<string, string> = {
  "awakening": "Welcome. You're entering the mind of Chinmay A — an AI engineer building generative systems, voice intelligence, and automation.",
  "engineer": "This is Chinmay's capability environment — combining LLMs, autonomous agents, and local GPU workloads into practical systems.",
  "voice-ai": "Entering Voice AI. Chinmay designs sub-second conversational pipelines connecting live speech directly to autonomous tool execution.",
  "projects": "These are production systems: real estate voice agents, marketing automation engines, and agentic data analysis pipelines.",
  "intelligence-layer": "The Intelligence Layer: Retrieval-Augmented Generation, embeddings, and fine-tuning grounded strictly in verifiable data.",
  "local-intelligence": "Local Intelligence: Running open-source models on dedicated GPU hardware with Ollama for zero cloud latency and privacy.",
  "automation": "Automation workflows: Connecting business triggers to intelligent tool hubs using n8n and Composio without manual friction.",
  "experience": "Professional record: Currently engineering at PitchX AI, with previous RAG and data science work at PySpiders.",
  "skills": "Interactive capability matrix: 5 specialized domains spanning Python, Voice AI, agent orchestration, and GPU computing.",
  "education": "Academic foundations: B.E. in Computer Science with AI and ML from VTU, CGPA 8.34, backed by six technical certifications.",
  "connection": "The core is ready. If you have an intelligent system to engineer, initiate a connection directly with Chinmay."
};

export interface QAPair {
  keywords: string[];
  response: string;
}

export const groundedKnowledge: QAPair[] = [
  {
    keywords: ["who is", "about", "chinmay", "background", "introduce", "who are you"],
    response: "Chinmay A is an AI/ML Engineer based in Bangalore, specializing in Generative AI, Large Language Models, Voice AI, and workflow automation. He currently engineers AI systems at PitchX AI."
  },
  {
    keywords: ["voice", "voice ai", "speech", "calling", "real estate", "audio"],
    response: "Chinmay engineers AI-powered voice calling agents for real estate customer conversations at PitchX AI. The system handles inbound inquiries, qualifies buyer intent, schedules follow-ups, and performs automated CRM handoffs."
  },
  {
    keywords: ["experience", "work", "job", "pitchx", "company", "pyspiders", "history"],
    response: "Chinmay is currently a Junior AI Developer at PitchX AI in Bangalore since September 2026, building voice agents and automation. Previously in 2026, he was a Data Science Intern at PySpiders working with RAG pipelines, LangChain, ChromaDB, and Hugging Face."
  },
  {
    keywords: ["project", "projects", "built", "portfolio", "what did he build", "systems"],
    response: "His key projects include an AI Voice Agent for real estate customer engagement, an LLM-powered marketing automation system that generates structured campaigns, and an AI agent for exploratory data analysis with Python workflows."
  },
  {
    keywords: ["skills", "tech", "technologies", "stack", "languages", "tools", "python"],
    response: "Chinmay specializes in Python, Generative AI, LLMs, RAG, Hugging Face, Prompt Engineering, local deployment with Ollama and GPU hardware, n8n, Composio, Voice AI (STT/TTS), SQL, and Docker."
  },
  {
    keywords: ["education", "college", "degree", "cgpa", "university", "vtu", "marks", "grade"],
    response: "Chinmay holds a Bachelor of Engineering in Computer Science & Engineering with specialization in AI & ML from VTU — R.L. Jalappa Institute of Technology (2022–2026), graduating with a CGPA of 8.34."
  },
  {
    keywords: ["certification", "certificates", "courses", "nxtwave", "nptel", "iit"],
    response: "Chinmay holds 6 certifications: Generative AI & Prompt Engineering (NxtWave, 2025), Generative AI Model Workshop (NxtWave, 2025), NPTEL Cloud Computing (IIT, 2024), Mobile App Dev with AI (RLJIT, 2024), Network Design (Internet Society), and SJBIT 24-Hour Hackathon."
  },
  {
    keywords: ["local", "ollama", "gpu", "hardware", "open source", "offline"],
    response: "Chinmay has hands-on experience deploying and benchmarking open-source LLMs locally on GPU hardware using Ollama for low-latency inference, model experimentation, and data privacy."
  },
  {
    keywords: ["automation", "n8n", "composio", "workflows"],
    response: "He designs multi-agent event workflows using n8n and Composio, connecting business trigger events to automated tool executions, marketing generation, and customer engagement pipelines."
  },
  {
    keywords: ["contact", "email", "reach", "hire", "talk", "linkedin", "phone"],
    response: "You can reach Chinmay directly via email at chinmay72049@gmail.com or connect via LinkedIn at linkedin.com/in/chinmay-a-56209132a. He is based in Bangalore Rural, Karnataka, India."
  }
];

export const FALLBACK_ANSWER = "I don't have that information in my current profile.";
