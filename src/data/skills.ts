export interface SkillCategory {
  title: string;
  categoryCode: string;
  skills: { name: string; level: string; highlight?: boolean }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    categoryCode: "LANG_CORE",
    skills: [
      { name: "Python", level: "Primary Language", highlight: true }
    ]
  },
  {
    title: "AI & Machine Learning",
    categoryCode: "MODEL_DEEP",
    skills: [
      { name: "Generative AI", level: "Production", highlight: true },
      { name: "LLMs (Large Language Models)", level: "Production", highlight: true },
      { name: "RAG (Retrieval-Augmented Gen)", level: "Architecture", highlight: true },
      { name: "Hugging Face", level: "Embeddings & Models" },
      { name: "Model Fine-tuning", level: "Experimentation" },
      { name: "NLP (Natural Language Processing)", level: "Advanced" },
      { name: "Machine Learning", level: "Core Foundations" },
      { name: "Feature Engineering", level: "Applied" }
    ]
  },
  {
    title: "LLM Engineering & Local Compute",
    categoryCode: "GPU_LOCAL",
    skills: [
      { name: "Prompt Engineering", level: "Expert", highlight: true },
      { name: "Context Engineering", level: "Advanced", highlight: true },
      { name: "Open-source LLMs", level: "Deployment & Benchmarking" },
      { name: "Ollama", level: "Local Inference Engine", highlight: true },
      { name: "Local LLM Deployment", level: "On-Premises / Offline" },
      { name: "GPU AI Workloads", level: "Hardware Acceleration" },
      { name: "Model Experimentation", level: "Benchmarking & Evaluation" }
    ]
  },
  {
    title: "Agents & Workflow Automation",
    categoryCode: "AGENT_ORCH",
    skills: [
      { name: "AI Agents", level: "Autonomous Multi-Agent", highlight: true },
      { name: "n8n", level: "Event Workflows", highlight: true },
      { name: "Composio", level: "Tool Connection Hub", highlight: true },
      { name: "Agent Workflows", level: "Production Architecture" },
      { name: "Workflow Automation", level: "Operational Systems" },
      { name: "LLM Automation", level: "End-to-End Orchestration" },
      { name: "Marketing Automation", level: "Content Pipelines" }
    ]
  },
  {
    title: "Voice AI & Conversational Systems",
    categoryCode: "AUDIO_VOICE",
    skills: [
      { name: "Voice Agents", level: "Real-time Telephony", highlight: true },
      { name: "Conversational AI", level: "Turn-Taking & Dialogue", highlight: true },
      { name: "Speech-to-Text (STT)", level: "Streaming Transcriptions" },
      { name: "Text-to-Speech (TTS)", level: "Neural Synthesis" },
      { name: "Speech-to-Speech", level: "Low-Latency Loops", highlight: true }
    ]
  },
  {
    title: "Data Systems & Infrastructure",
    categoryCode: "DATA_INFRA",
    skills: [
      { name: "PostgreSQL", level: "Relational Data" },
      { name: "SQL", level: "Query Optimization" },
      { name: "Docker", level: "Containerization" },
      { name: "Git & GitHub", level: "Version Control" },
      { name: "Power BI", level: "Business Intelligence" },
      { name: "Microsoft Excel", level: "Data Modeling" }
    ]
  }
];
