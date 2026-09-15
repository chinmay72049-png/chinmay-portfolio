import React from 'react';
import { Cpu, Brain, Network, Radio, Workflow, Database, Terminal } from 'lucide-react';
import { profile } from '../../data/profile';

export const Section02Engineer: React.FC = () => {
  const capabilities = [
    {
      code: "CAP_01",
      name: "Generative AI & LLMs",
      desc: "Architecting domain-specific LLM workflows, context window management, and structured generation.",
      icon: Brain,
      color: "text-amber-400"
    },
    {
      code: "CAP_02",
      name: "Conversational Voice AI",
      desc: "Sub-second speech-to-speech loops with real-time acoustic stream processing and tool dispatching.",
      icon: Radio,
      color: "text-cyan-400"
    },
    {
      code: "CAP_03",
      name: "Autonomous AI Agents",
      desc: "Multi-agent choreography, goal-directed planning, and deterministic error fallback systems.",
      icon: Network,
      color: "text-violet-400"
    },
    {
      code: "CAP_04",
      name: "Workflow Automation",
      desc: "Zero-latency integration of n8n and Composio hubs connecting models to business tools.",
      icon: Workflow,
      color: "text-emerald-400"
    },
    {
      code: "CAP_05",
      name: "RAG & Vector Retrieval",
      desc: "Hybrid semantic search, ChromaDB vector spaces, and Hugging Face embedding pipelines.",
      icon: Database,
      color: "text-amber-300"
    },
    {
      code: "CAP_06",
      name: "Local LLMs & GPU Compute",
      desc: "On-premises model execution using Ollama on dedicated GPU hardware for privacy and speed.",
      icon: Cpu,
      color: "text-slate-200"
    }
  ];

  return (
    <section id="engineer" className="min-h-screen flex flex-col justify-center items-center px-4 py-24 relative z-10">
      <div className="max-w-6xl w-full mx-auto text-left">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-900 uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/30 mb-3">
            <Terminal className="w-3.5 h-3.5 text-amber-600" />
            <span>02 THE ENGINEER // CAPABILITY ENVIRONMENT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-cyan-600">Intelligent Digital Systems</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 font-normal leading-relaxed">
            {profile.bio}
          </p>
        </div>

        {/* Capability Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="glass-panel p-6 rounded-2xl border border-slate-900/10 hover:border-amber-500/50 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-800 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-colors">
                  <cap.icon className={`w-5 h-5 ${cap.color}`} />
                </div>
                <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                  {cap.code}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight group-hover:text-amber-700 transition-colors">
                {cap.name}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>

        {/* System Footnote */}
        <div className="mt-8 pt-4 border-t border-slate-900/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
          <span>PARADIGM: RESILIENT ARCHITECTURES OVER UNCONSTRAINED PROMPTS</span>
          <span className="text-amber-700 font-semibold">LOCATION: {profile.location.toUpperCase()}</span>
        </div>
      </div>
    </section>
  );
};
