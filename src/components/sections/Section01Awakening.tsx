import React from 'react';
import { Terminal, Radio, ArrowDown, Sparkles } from 'lucide-react';

interface SectionProps {
  onExplore: () => void;
}

export const Section01Awakening: React.FC<SectionProps> = ({ onExplore }) => {
  return (
    <section
      id="awakening"
      className="min-h-screen flex flex-col justify-between items-center px-4 py-20 relative z-10 text-center"
    >
      {/* Subtle System Status Header */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] font-mono tracking-widest uppercase">
        <div className="glass-panel px-3 py-1.5 rounded-full border border-slate-900/10 text-slate-700 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="text-slate-500 font-medium">AI SYSTEM:</span>
          <span className="text-emerald-700 font-bold">ONLINE</span>
        </div>

        <div className="glass-panel px-3 py-1.5 rounded-full border border-slate-900/10 text-slate-600 hidden sm:flex items-center gap-2">
          <Radio className="w-3 h-3 text-amber-600 animate-pulse" />
          <span>VOICE CORE: READY</span>
        </div>

        <div className="glass-panel px-3 py-1.5 rounded-full border border-slate-900/10 text-slate-600 hidden md:flex items-center gap-2">
          <Terminal className="w-3 h-3 text-cyan-600" />
          <span>NEURAL INTERFACE: ACTIVE</span>
        </div>
      </div>

      {/* Main Awakening Title */}
      <div className="max-w-4xl mx-auto my-auto space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-900 uppercase bg-amber-500/10 px-3.5 py-1.5 rounded-lg border border-amber-500/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>01 THE AWAKENING // ENTER THE MIND OF AN AI ENGINEER</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-slate-900 uppercase font-sans">
          CHINMAY <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-cyan-600">A</span>
        </h1>

        <div className="space-y-2">
          <p className="text-lg sm:text-2xl font-mono tracking-wide text-slate-800 uppercase font-bold">
            AI/ML ENGINEER
          </p>
          <p className="text-xs sm:text-sm font-mono text-slate-500 tracking-wider">
            GENERATIVE AI • LLM SOLUTIONS • VOICE AI • AUTOMATION
          </p>
        </div>

        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed pt-2">
          Engineering production AI systems that connect deep machine reasoning to operational business workflows and conversational voice telemetries.
        </p>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={onExplore}
        className="group flex flex-col items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors cursor-pointer"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 group-hover:text-amber-600 transition-colors">
          Scroll To Traverse Neural Mind
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce text-slate-400 group-hover:text-amber-600" />
      </button>
    </section>
  );
};
