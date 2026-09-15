export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  summary: string;
  responsibilities: string[];
  techStack: string[];
}

export const experiences: ExperienceItem[] = [
  {
    role: "Junior AI Developer",
    company: "PitchX AI",
    location: "Bangalore, India",
    period: "Sep 2026 – Present",
    isCurrent: true,
    summary: "Engineering production AI voice calling systems, automated marketing pipelines, and local GPU-accelerated LLM architectures for commercial clients.",
    responsibilities: [
      "Developing AI-powered voice calling agents for real estate customer conversations, lead handling, and follow-ups.",
      "Translating client business requirements into conversational AI flows and automated operational handoffs.",
      "Building LLM-powered marketing automation systems that generate structured digital content from operational parameters.",
      "Designing complex multi-agent workflows connecting trigger events to tools using n8n and Composio.",
      "Engineering automated personal branding and executive ghostwriting content workflows.",
      "Deploying and benchmarking open-source LLMs locally on GPU hardware using Ollama.",
      "Conducting model experimentation, fine-tuning, and real-time Voice AI performance optimization."
    ],
    techStack: ["Voice AI", "LLMs", "n8n", "Composio", "Ollama", "GPU Workloads", "Prompt Engineering"]
  },
  {
    role: "Data Science Intern",
    company: "PySpiders",
    location: "Bangalore, India",
    period: "2026",
    isCurrent: false,
    summary: "Built semantic information retrieval systems, RAG pipelines, and automated data processing workflows.",
    responsibilities: [
      "Architected Retrieval-Augmented Generation (RAG) pipelines using Python, LangChain, and ChromaDB.",
      "Generated high-density semantic vector embeddings using open-source Hugging Face models.",
      "Built relational SQL data ingestion routines coupled with LLM question-answering engines.",
      "Implemented end-to-end machine learning workflows, feature engineering, and evaluation benchmarks."
    ],
    techStack: ["Python", "LangChain", "ChromaDB", "Hugging Face", "SQL", "RAG Pipelines", "Machine Learning"]
  }
];
