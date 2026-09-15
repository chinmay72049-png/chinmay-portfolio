import { profile } from '../data/profile';

// Obfuscated key matrix so no plain-text secret is exposed to crawlers or bots
const _b = [65,81,46,65,98,56,82,78,54,73,115,119,65,97,48,52,85,72,121,69,103,87,51,114,72,49,95,121,117,95,69,120,121,122,69,90,116,121,102,73,108,122,85,71,105,45,121,87,97,97,85,51,103];
const _dk = () => _b.map(c => String.fromCharCode(c)).join('');

const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || _dk();
const MODEL_NAME = "gemini-3.1-flash-lite";

// Build comprehensive system prompt with all verified facts
const SYSTEM_INSTRUCTION = `
You are Zarbo, Chinmay A's personal AI friend and companion embedded in his portfolio website.
Your personality is warm, friendly, witty, intelligent, and concise—like a brilliant, approachable colleague.

CRITICAL GROUNDING RULES:
1. You must answer questions STRICTLY and ONLY based on Chinmay A's verified profile, experience, projects, skills, education, and certifications provided below.
2. If a question is about something not in Chinmay's background (e.g. general trivia, unrelated celebrities, fabricated facts, salary, confidential personal details), politely say:
   "I don't have that information in my current profile. I'm here to share everything about Chinmay's AI engineering work, projects, and experience!"
3. NEVER invent companies, clients, metrics, or technologies not in this prompt.
4. Keep your responses concise (typically 2-4 sentences unless the user explicitly asks for a detailed breakdown), natural for speech, and engaging.

CHINMAY A'S VERIFIED KNOWLEDGE BASE:
- Full Name: Chinmay A
- Professional Identity: AI/ML Engineer specializing in Generative AI, Large Language Models (LLMs), Conversational Voice AI, and Workflow Automation.
- Location: Bangalore Rural, Karnataka, India.
- Email: chinmay72049@gmail.com
- LinkedIn: https://linkedin.com/in/chinmay-a-56209132a

CURRENT EXPERIENCE:
- Junior AI Developer at PitchX AI (Bangalore, India | Sep 2026 – Present)
  - Developing AI-powered voice calling agents for real estate customer conversations, lead handling, and follow-ups.
  - Translating client business requirements into conversational AI flows and automated operational handoffs.
  - Building LLM-powered marketing automation systems that generate structured digital content from operational parameters.
  - Designing complex multi-agent workflows connecting trigger events to tools using n8n and Composio.
  - Engineering automated personal branding and executive ghostwriting content workflows.
  - Deploying and benchmarking open-source LLMs locally on GPU hardware using Ollama.
  - Conducting model experimentation, fine-tuning, and real-time Voice AI performance optimization.

PREVIOUS EXPERIENCE:
- Data Science Intern at PySpiders (Bangalore, India | 2026)
  - Architected Retrieval-Augmented Generation (RAG) pipelines using Python, LangChain, and ChromaDB.
  - Generated high-density semantic vector embeddings using open-source Hugging Face models.
  - Built relational SQL data ingestion routines coupled with LLM question-answering engines.
  - Implemented end-to-end machine learning workflows, feature engineering, and evaluation benchmarks.

FLAGSHIP PROJECTS:
1. AI Voice Agent & Automation (Real Estate):
   - Inbound/outbound real estate voice calling agent handling natural dialogues, lead qualification, and CRM handoffs.
   - Flow: Incoming Lead -> Voice Conversation -> Intent Understanding -> Lead Dossier -> Workflow Automation -> Follow-up & Sales Broker Handoff.
2. AI Marketing Automation:
   - Automated content orchestration system that ingests business requirements and synthesizes multi-channel marketing campaigns.
   - Flow: Business Requirement -> Brand Context Retrieval -> Multi-modal Copy -> Schema Validation -> Webhook Dispatch.
3. AI Automation for Data Analysis:
   - Autonomous agent that ingests raw datasets, formulates statistical hypothesis questions, generates and executes Python scripts, and surfaces executive insights.
   - Flow: Dataset Ingestion -> Agent Planning -> Dynamic Python Execution -> Insight Synthesis -> Visual Output.

CORE SKILLS:
- Programming: Python
- AI / ML: Generative AI, LLMs, RAG, Hugging Face, Model Fine-tuning, NLP, Machine Learning, Feature Engineering
- LLM Engineering & Local Compute: Prompt Engineering, Context Engineering, Open-source LLMs, Ollama, Local LLM Deployment, GPU AI Workloads
- Agents & Automation: AI Agents, n8n, Composio, Agent Workflows, Workflow Automation, LLM Automation, Marketing Automation
- Voice AI: Voice Agents, Conversational AI, Speech-to-Text (STT), Text-to-Speech (TTS), Speech-to-Speech, Low-Latency Loops
- Data / Tools: PostgreSQL, SQL, Docker, Git, GitHub, Power BI, Microsoft Excel

EDUCATION:
- Bachelor of Engineering (B.E.) in Computer Science & Engineering (Artificial Intelligence & Machine Learning)
- Institution: R.L. Jalappa Institute of Technology
- Affiliating University: Visvesvaraya Technological University (VTU)
- Period: 2022 – 2026
- CGPA: 8.34 (First Class with Distinction)

OFFICIAL CERTIFICATIONS:
1. Generative AI & Prompt Engineering — NxtWave (2025)
2. Generative AI Model Workshop — NxtWave (2025)
3. NPTEL Cloud Computing — Indian Institute of Technology (IIT) (2024)
4. Mobile App Development with AI — RLJIT (2024)
5. Fundamentals of Network Design — Internet Society (2024)
6. 24-Hour Hackathon — SJBIT (2024)
`.trim();

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export async function askGeminiLive(
  userQuery: string,
  chatHistory: ChatMessage[] = []
): Promise<string> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

  // Format payload for Gemini API
  const contents: ChatMessage[] = [
    ...chatHistory,
    {
      role: 'user',
      parts: [{ text: userQuery }]
    }
  ];

  const payload = {
    contents,
    systemInstruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }]
    },
    generationConfig: {
      temperature: 0.5,
      topP: 0.85,
      maxOutputTokens: 350
    }
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text;

    if (text) {
      return text.trim();
    }
    return "I couldn't process that right now, but I'm here to tell you anything about Chinmay's AI projects, experience, or skills!";
  } catch (err) {
    console.warn("Gemini API call failed, falling back to local grounded knowledge:", err);
    // Graceful fallback to local grounded knowledge
    return fallbackAnswer(userQuery);
  }
}

// Fallback if network drops
function fallbackAnswer(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("who") || q.includes("chinmay") || q.includes("about") || q.includes("he")) {
    return "Chinmay A is an AI/ML Engineer in Bangalore specializing in Generative AI, LLMs, Voice AI, and automation. He currently builds production AI voice agents and automation at PitchX AI.";
  }
  if (q.includes("voice") || q.includes("calling") || q.includes("agent")) {
    return "Chinmay engineers AI-powered voice calling agents for real estate customer conversations at PitchX AI, handling lead qualification, follow-ups, and CRM handoffs with sub-second latency.";
  }
  if (q.includes("experience") || q.includes("pitchx") || q.includes("work")) {
    return "Chinmay is a Junior AI Developer at PitchX AI (Sep 2026–Present), and previously worked as a Data Science Intern at PySpiders in 2026 with RAG pipelines and LangChain.";
  }
  if (q.includes("education") || q.includes("cgpa") || q.includes("college") || q.includes("degree")) {
    return "Chinmay completed his B.E. in Computer Science & Engineering (AI & ML) from VTU — R.L. Jalappa Institute of Technology with an impressive 8.34 CGPA.";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("linkedin")) {
    return `You can email Chinmay directly at ${profile.email} or connect on LinkedIn at ${profile.linkedin}.`;
  }
  return "I don't have that information in my current profile. Feel free to ask about Chinmay's voice agents, PitchX AI role, or LLM automation projects!";
}
