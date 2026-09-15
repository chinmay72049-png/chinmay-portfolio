import React, { useState } from 'react';
import { Network, ShieldCheck, Gauge, GitBranch, Cpu, CornerDownRight } from 'lucide-react';
import { soundFX } from '../../utils/audio';

export const Act5Mindset: React.FC = () => {
  const [activePrinciple, setActivePrinciple] = useState<number>(0);

  const principles = [
    {
      id: 0,
      title: "Deterministic State Guards",
      tagline: "Never trust raw LLM outputs with unconstrained side-effects",
      icon: ShieldCheck,
      color: "text-cyan-400",
      details: [
        "Wrap probabilistic model responses in strict Pydantic/Zod schema validators.",
        "Formal finite-state machines (FSM) control agent transitions—models propose actions, state engines approve them.",
        "Idempotent database transactions prevent duplicate tool invocations during network retries."
      ],
      blueprint: {
        in: "Probabilistic Model (LLM/Diffusion)",
        guard: "Deterministic Schema & Security Guard",
        out: "Safe Atomic Production State"
      }
    },
    {
      id: 1,
      title: "Strict 280ms Latency Budgeting",
      tagline: "Voice agent immersion breaks if response exceeds human conversational pause",
      icon: Gauge,
      color: "text-violet-400",
      details: [
        "Acoustic VAD & ASR Stream: 60ms budget with chunked WebSocket framing.",
        "Speculative LLM Prefill: 110ms budget using speculative token decoding.",
        "Composio Tool Execution: 40ms budget using pre-warmed connection pools.",
        "TTS Streaming Synthesis: 70ms budget delivering first audio packet under 280ms total."
      ],
      blueprint: {
        in: "60ms Acoustic Ingestion",
        guard: "110ms Speculative Reasoning + 40ms Tool",
        out: "70ms First-Chunk Audio Stream"
      }
    },
    {
      id: 2,
      title: "Surgical AST Diffs vs Whole-File Rewrites",
      tagline: "Wholesale AI rewrites introduce silent regressions into codebases",
      icon: GitBranch,
      color: "text-indigo-400",
      details: [
        "Parse full repository ASTs (Abstract Syntax Trees) to map type hierarchies and call sites.",
        "Isolate target nodes without modifying surrounding formatting or unrelated business logic.",
        "Verify type safety and lint rules before emitting unified patch format."
      ],
      blueprint: {
        in: "Full Repo AST Graph",
        guard: "Symbol Isolation & Dependency Analysis",
        out: "Zero-Bloat Unified Diff Patch"
      }
    },
    {
      id: 3,
      title: "Resilient Multi-Agent Consensus",
      tagline: "Autonomous systems must self-heal when external APIs degrade",
      icon: Cpu,
      color: "text-pink-400",
      details: [
        "Specialized role division: Architect Planner, Surgical Worker, Deterministic Critic.",
        "Circuit breakers automatically degrade to cached fallbacks when third-party endpoints timeout.",
        "Dead-letter queues (DLQ) preserve failed transactions for human-in-the-loop review."
      ],
      blueprint: {
        in: "Multi-Agent Task Proposal",
        guard: "Critic Validation & Circuit Breaker",
        out: "Self-Healing Distributed Execution"
      }
    }
  ];

  const handleSelect = (idx: number) => {
    setActivePrinciple(idx);
    soundFX.playNodePulse();
  };

  const current = principles[activePrinciple];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20 relative z-10">
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-violet-400 uppercase bg-violet-950/40 px-3 py-1 rounded-md border border-violet-800/40 mb-3">
            <Network className="w-3.5 h-3.5 text-violet-400" />
            <span>ACT V: HOW I THINK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Architectural <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400">First Principles</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Not just writing code, but architecting bulletproof, resilient systems that survive real-world production conditions.
          </p>
        </div>

        {/* 2-Column Blueprint Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Principle Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              const isSelected = activePrinciple === idx;

              return (
                <button
                  key={p.id}
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex items-start gap-3.5 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900/90 border-violet-400 shadow-xl shadow-violet-500/10 scale-[1.02]'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? 'bg-violet-500/20 text-violet-300' : 'bg-slate-900 text-slate-500'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {p.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">0{idx + 1}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {p.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Architectural Blueprint Visualizer */}
          <div className="lg:col-span-7">
            <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 h-full flex flex-col justify-between text-left relative overflow-hidden border border-violet-500/30">
              {/* Isometric Grid Background */}
              <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <current.icon className={`w-5 h-5 ${current.color}`} />
                    <h3 className="text-xl font-bold text-white tracking-tight">{current.title}</h3>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-violet-950/60 border border-violet-800/50 text-violet-300">
                    BLUEPRINT SPEC
                  </span>
                </div>

                <p className="text-sm text-slate-300 italic mb-6">
                  "{current.tagline}"
                </p>

                {/* Blueprint Flow Diagram */}
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl mb-6">
                  <div className="text-[10px] font-mono text-slate-500 mb-3 uppercase tracking-wider">
                    SYSTEM CONTROL FLOW
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center text-center font-mono text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                      {current.blueprint.in}
                    </div>
                    <div className="p-3 rounded-xl bg-violet-950/40 border border-violet-500/40 text-violet-200 font-bold shadow-sm">
                      {current.blueprint.guard}
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 font-bold">
                      {current.blueprint.out}
                    </div>
                  </div>
                </div>

                {/* Architectural Rigor Checkpoints */}
                <div className="space-y-2.5">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                    ENGINEERING SAFEGUARDS
                  </div>
                  {current.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-sans">
                      <CornerDownRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>PARADIGM: RESILIENT DISTRIBUTED AI</span>
                <span className="text-cyan-400">FAULT TOLERANCE: MAXIMUM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
