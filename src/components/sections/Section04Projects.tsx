import React, { useState } from 'react';
import { Layers, CheckCircle2, Sparkles } from 'lucide-react';
import { projects } from '../../data/projects';

export const Section04Projects: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);

  const current = projects[activeProjectIndex];

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center items-center px-4 py-24 relative z-10">
      <div className="max-w-6xl w-full mx-auto text-left">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-900 uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/30 mb-3">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>04 PROJECTS // ANIMATED FLOW SEQUENCES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
            Production <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-cyan-600">Intelligent Systems</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 font-normal leading-relaxed">
            Real-world systems engineered to solve operational bottlenecks: client voice calling, automated marketing synthesis, and autonomous dataset analytics.
          </p>
        </div>

        {/* Project Selector Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {projects.map((p, idx) => {
            const isSelected = activeProjectIndex === idx;
            return (
              <button
                key={p.id}
                onClick={() => setActiveProjectIndex(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-white/95 border-amber-500/60 shadow-lg shadow-amber-500/10 scale-[1.02]'
                    : 'bg-white/70 border-slate-200/80 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400">SYSTEM 0{idx + 1}</span>
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />}
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight line-clamp-1">{p.title}</h3>
                <p className="text-[11px] font-mono text-amber-700 mt-0.5 font-medium">{p.category}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Project Interactive Showcase Card */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-900/10 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-6 mb-8">
            <div>
              <span className="text-[10px] font-mono text-amber-700 font-semibold uppercase tracking-widest block">
                {current.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 uppercase tracking-tight">
                {current.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {current.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80 text-[10px] font-mono text-slate-700 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal mb-8 max-w-3xl">
            {current.description}
          </p>

          {/* Workflow Sequence Progression */}
          <div className="mb-8">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>END-TO-END OPERATIONAL WORKFLOW FLOW</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {current.workflowSteps.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-amber-700 font-bold block mb-1">
                      STAGE {step.step}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 tracking-wide">{step.label}</h4>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-normal mt-2">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200/80 font-mono text-xs">
            {current.features.map((feat, fIdx) => (
              <div key={fIdx} className="flex items-center gap-2.5 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-sans text-xs sm:text-sm font-normal">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
