import React from 'react';
import { Briefcase, CheckCircle2, Server, Cpu, Flame, Layers } from 'lucide-react';

export const Act3Experience: React.FC = () => {
  const highlights = [
    {
      company: "Aptex",
      role: "AI Developer & Systems Architect",
      period: "Core AI Engineering",
      summary: "Engineered scalable, mission-critical AI agent ecosystems, autonomous voice call orchestration, and enterprise tool integrations.",
      achievements: [
        "Architected sub-280ms end-to-end voice pipelines integrating Dograh acoustic pipelines with Composio tool suites.",
        "Deployed autonomous codebase modification agents capable of parsing multi-thousand file ASTs for zero-bloat surgical edits.",
        "Created self-healing workflow automation pipelines handling high-throughput webhooks and fault-tolerant retry policies."
      ]
    }
  ];

  const coreDomains = [
    {
      title: "AI Voice Agent Architecture",
      icon: Cpu,
      desc: "Low-latency streaming ASR, semantic intent classification, real-time function execution, and neural speech synthesis."
    },
    {
      title: "Codebase & AST Agents",
      icon: Server,
      desc: "Deterministic dependency analysis, surgical code refactoring, context-aware AST manipulation, and regression-free patches."
    },
    {
      title: "Enterprise Automation",
      icon: Layers,
      desc: "Distributed event-driven microservices, Composio API hubs, idempotent queues, and self-healing error recovery."
    },
    {
      title: "Generative AI & RAG",
      icon: Flame,
      desc: "Hybrid semantic vector retrieval, BM25 re-ranking, token cost optimization, and structured output guarantees."
    }
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20 relative z-10">
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-violet-400 uppercase bg-violet-950/40 px-3 py-1 rounded-md border border-violet-800/40 mb-3">
            <Briefcase className="w-3.5 h-3.5 text-violet-400" />
            <span>ACT III: CHINMAY A — AI DEVELOPER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Proven Track Record at <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Aptex & Beyond</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-2">
            Engineering robust production intelligence where reliability, latency budgets, and system architecture take precedence.
          </p>
        </div>

        {/* Aptex Featured Experience Card */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 mb-10 text-left relative overflow-hidden border border-violet-500/30">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">ENTERPRISE DEPLOYMENTS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">Aptex</h3>
              <p className="text-violet-300 font-medium text-sm">AI Developer & Systems Architect</p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-violet-950/60 border border-violet-700/50 text-right">
              <div className="text-[10px] font-mono text-slate-400">IMPACT METRIC</div>
              <div className="text-base font-mono font-bold text-emerald-400">Sub-300ms Voice • Zero-Touch Bloat</div>
            </div>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Leading the research, design, and deployment of complex AI agent architectures. From designing acoustic-to-tool loops to engineering self-healing enterprise workflow pipelines, the focus is always on bulletproof uptime, mathematical precision, and frictionless developer ergonomics.
          </p>

          <div className="space-y-3 font-mono text-xs sm:text-sm">
            {highlights[0].achievements.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-slate-300 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="font-sans leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {coreDomains.map((domain, i) => (
            <div key={i} className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-violet-500/40 transition-all">
              <div className="p-3 w-fit rounded-xl bg-violet-950/60 border border-violet-800/40 text-violet-400 mb-3">
                <domain.icon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">{domain.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{domain.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
