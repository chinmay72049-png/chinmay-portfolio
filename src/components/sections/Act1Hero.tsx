import { ChevronDown, Cpu } from 'lucide-react';

interface ActProps {
  onScrollToNext: () => void;
}

export const Act1Hero: React.FC<ActProps> = ({ onScrollToNext }) => {
  return (
    <section className="min-h-screen flex flex-col justify-between items-center px-4 py-16 relative z-10 text-center">
      {/* Top telemetry pill */}
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-violet-500/30 text-xs font-mono text-slate-300 shadow-lg shadow-violet-500/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="text-cyan-400">STATUS:</span> NEURAL CORE ONLINE
        <span className="text-slate-600">|</span>
        <span className="text-violet-400">LATENCY:</span> 38MS
      </div>

      {/* Main Title Hero */}
      <div className="max-w-4xl mx-auto my-auto space-y-6">
        <div className="inline-flex items-center gap-2 text-xs md:text-sm font-mono tracking-widest text-violet-400 uppercase bg-violet-950/40 px-3 py-1 rounded-md border border-violet-800/40">
          <Cpu className="w-4 h-4 text-violet-400" />
          <span>ACT I: THE VOID & NEURAL AWAKENING</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white uppercase">
          CHINMAY <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-indigo-300">A</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl font-light text-slate-300 max-w-2xl mx-auto leading-relaxed">
          AI Systems Architect & Engineer. Crafting continuous 3D intelligence, autonomous voice pipelines, and surgical agentic systems.
        </p>

        {/* Quick Capabilities Badges */}
        <div className="flex flex-wrap justify-center gap-2.5 pt-4 text-xs font-mono">
          <span className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300">
            Autonomous Voice Agents
          </span>
          <span className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300">
            Codebase AST Agents
          </span>
          <span className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300">
            Dograh & Composio Tooling
          </span>
          <span className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300">
            Generative AI & RAG
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={onScrollToNext}
        className="group flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
      >
        <span className="text-[11px] font-mono tracking-widest uppercase text-slate-500 group-hover:text-cyan-400 transition-colors">
          Scroll To Traverse 3D Space
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce text-slate-400 group-hover:text-cyan-400" />
      </button>
    </section>
  );
};
