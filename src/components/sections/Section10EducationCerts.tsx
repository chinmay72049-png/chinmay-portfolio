import React from 'react';
import { Award, GraduationCap, CheckCircle2, ShieldCheck } from 'lucide-react';
import { education, certifications } from '../../data/certifications';

export const Section10EducationCerts: React.FC = () => {
  return (
    <section id="education" className="min-h-screen flex flex-col justify-center items-center px-4 py-24 relative z-10">
      <div className="max-w-6xl w-full mx-auto text-left">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-900 uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/30 mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
            <span>10 EDUCATION & CERTS // FOUNDATIONAL CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
            Academic & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-cyan-600">Technical Rigor</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 font-normal leading-relaxed">
            Rigorous undergraduate training in computer science, machine learning mathematics, and cloud architectures, validated by industry credentials.
          </p>
        </div>

        {/* 2-Column Grid: Education & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Education Card */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-900/10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-6">
                  <div className="flex items-center gap-2 font-mono text-xs text-amber-700 font-bold">
                    <GraduationCap className="w-4 h-4" />
                    <span>UNDERGRADUATE DEGREE</span>
                  </div>
                  <div className="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/40 font-mono text-xs text-amber-900 font-bold">
                    CGPA {education.cgpa}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                  {education.degree}
                </h3>
                <p className="text-sm font-mono text-amber-700 font-semibold mt-1">
                  {education.specialization}
                </p>
                <div className="text-slate-700 text-sm mt-3 font-normal">
                  {education.institution}
                </div>
                <div className="text-slate-500 text-xs font-mono mt-0.5">
                  Affiliated with {education.affiliatingUniversity} • {education.period}
                </div>

                <div className="space-y-2.5 mt-6 font-mono text-xs text-slate-700">
                  {education.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-slate-50/90 p-3 rounded-xl border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span className="font-sans font-normal leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/80 text-[11px] font-mono text-slate-500 flex justify-between">
                <span>VTU ACCREDITED</span>
                <span className="text-emerald-700 font-bold">FIRST CLASS DISTINCTION</span>
              </div>
            </div>
          </div>

          {/* Right: Certifications List */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-900/10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-6">
                  <div className="flex items-center gap-2 font-mono text-xs text-cyan-700 font-bold">
                    <Award className="w-4 h-4" />
                    <span>OFFICIAL CERTIFICATIONS</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">6 VERIFIED CERTS</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {certifications.map((cert, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 flex items-center justify-between gap-3 hover:border-amber-500/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-sans">{cert.name}</h4>
                          <span className="text-[11px] text-slate-500">{cert.issuer}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                          {cert.year}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/80 text-[11px] font-mono text-slate-500 flex justify-between">
                <span>CREDENTIAL STATUS</span>
                <span className="text-emerald-700 font-bold">AUTHENTICATED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
