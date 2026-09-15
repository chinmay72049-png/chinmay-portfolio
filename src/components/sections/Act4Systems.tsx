import React, { useState } from 'react';
import { Mic, GitCommit, Workflow, Sparkles, Layers } from 'lucide-react';
import { VoiceAgentSim } from '../simulators/VoiceAgentSim';
import { CodebaseAgentSim } from '../simulators/CodebaseAgentSim';
import { AutomationSim } from '../simulators/AutomationSim';
import { GenAISim } from '../simulators/GenAISim';
import { soundFX } from '../../utils/audio';

export const Act4Systems: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState<number>(0);

  const systems = [
    {
      id: 0,
      title: "AI Voice Agent Platform",
      badge: "Dograh + Composio",
      icon: Mic,
      color: "from-cyan-500 to-blue-600",
      desc: "Live acoustic streaming to real-time tool execution pipeline."
    },
    {
      id: 1,
      title: "Codebase Modification Agent",
      badge: "Surgical AST",
      icon: GitCommit,
      color: "from-violet-500 to-purple-600",
      desc: "Zero-bloat, context-aware AST dependency refactoring."
    },
    {
      id: 2,
      title: "Enterprise Automation Chains",
      badge: "Self-Healing Workflows",
      icon: Workflow,
      color: "from-indigo-500 to-violet-600",
      desc: "High-throughput microservice triggers with automatic backoff."
    },
    {
      id: 3,
      title: "GenAI Lab & Kiera",
      badge: "RAG & Creative Co-Pilot",
      icon: Sparkles,
      color: "from-pink-500 to-amber-500",
      desc: "Hybrid semantic vector retrieval & expressive multi-modal synthesis."
    }
  ];

  const handleSelect = (id: number) => {
    setActiveSystem(id);
    soundFX.playNodePulse();
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20 relative z-10">
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/40 px-3 py-1 rounded-md border border-cyan-800/40 mb-3">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>ACT IV: SYSTEMS I BUILD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400">System Simulators</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Explore live, interactive simulations of production architectures. Test pipelines, inspect AST diffs, and witness self-healing execution.
          </p>
        </div>

        {/* System Tabs Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {systems.map((sys) => {
            const Icon = sys.icon;
            const isSelected = activeSystem === sys.id;

            return (
              <button
                key={sys.id}
                onClick={() => handleSelect(sys.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900/90 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    0{sys.id + 1}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white line-clamp-1">{sys.title}</div>
                <div className="text-[11px] text-cyan-400 font-mono mt-0.5">{sys.badge}</div>
              </button>
            );
          })}
        </div>

        {/* Active Simulator Display */}
        <div className="transition-all duration-500">
          {activeSystem === 0 && <VoiceAgentSim />}
          {activeSystem === 1 && <CodebaseAgentSim />}
          {activeSystem === 2 && <AutomationSim />}
          {activeSystem === 3 && <GenAISim />}
        </div>
      </div>
    </section>
  );
};
