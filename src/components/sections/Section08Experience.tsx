import React from 'react';
import { Briefcase, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import { experiences } from '../../data/experience';

export const Section08Experience: React.FC = () => {
  return (
    <section id="experience" className="min-h-screen flex flex-col justify-center items-center px-4 py-24 relative z-10">
      <div className="max-w-6xl w-full mx-auto text-left">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-900 uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/30 mb-3">
            <Briefcase className="w-3.5 h-3.5 text-amber-600" />
            <span>08 EXPERIENCE // PROFESSIONAL TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-cyan-600">Journey</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 font-normal leading-relaxed">
            Real-world impact in commercial AI development: engineering client voice agents at PitchX AI and architecting RAG pipelines at PySpiders.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className={`glass-panel p-6 sm:p-10 rounded-3xl border transition-all ${
                exp.isCurrent
                  ? 'border-amber-500/40 bg-white/95 shadow-xl shadow-amber-500/5'
                  : 'border-slate-900/10 bg-white/80 shadow-xs'
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200/80 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {exp.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-900 border border-amber-500/40">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                        CURRENT POSITION
                      </span>
                    )}
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {exp.location}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                    {exp.role}
                  </h3>
                  <p className="text-base sm:text-lg font-mono text-amber-700 font-bold mt-0.5">
                    {exp.company}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80 font-mono text-xs text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal mb-6">
                {exp.summary}
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 mb-6 font-mono text-xs">
                {exp.responsibilities.map((resp, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-3 text-slate-700 bg-slate-50/90 p-3 rounded-xl border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="font-sans text-xs sm:text-sm font-normal leading-relaxed">{resp}</span>
                  </div>
                ))}
              </div>

              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/80">
                {exp.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80 text-[10px] font-mono text-slate-700 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
