import React, { useState } from 'react';
import { Terminal, Code, Cpu, Workflow, Radio, Database, Check } from 'lucide-react';
import { skillCategories } from '../../data/skills';

export const Section09Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const icons = [Code, Cpu, Terminal, Workflow, Radio, Database];

  const currentCategory = skillCategories[activeCategory];
  const CurrentIcon = icons[activeCategory % icons.length];

  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center items-center px-4 py-24 relative z-10">
      <div className="max-w-6xl w-full mx-auto text-left">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-900 uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/30 mb-3">
            <Terminal className="w-3.5 h-3.5 text-amber-600" />
            <span>09 SKILLS // INTERACTIVE CAPABILITY MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-cyan-600">Competencies</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 font-normal leading-relaxed">
            A structured domain matrix spanning core model engineering, agent orchestration, hardware acceleration, and voice telemetries.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {skillCategories.map((cat, idx) => {
            const Icon = icons[idx % icons.length];
            const isSelected = activeCategory === idx;

            return (
              <button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white/95 border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : 'bg-white/70 border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-600' : 'text-slate-400'}`} />
                  <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
                </div>
                <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                  {cat.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Category Capability Grid */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-900/10 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-600">
                <CurrentIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight uppercase">
                  {currentCategory.title}
                </h3>
                <span className="text-[10px] font-mono text-amber-700 font-medium">
                  CODE: {currentCategory.categoryCode}
                </span>
              </div>
            </div>

            <span className="text-xs font-mono text-slate-500 hidden sm:inline">
              {currentCategory.skills.length} VERIFIED CAPABILITIES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
            {currentCategory.skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  skill.highlight
                    ? 'bg-white/95 border-amber-500/40 shadow-xs text-slate-900'
                    : 'bg-white/80 border-slate-200/80 text-slate-700'
                }`}
              >
                <div>
                  <div className="font-bold text-sm text-slate-900">{skill.name}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{skill.level}</div>
                </div>

                {skill.highlight ? (
                  <span className="p-1 rounded bg-amber-500/15 text-amber-900 border border-amber-500/30 text-[9px] uppercase tracking-wider shrink-0 font-bold">
                    CORE
                  </span>
                ) : (
                  <Check className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
