import React, { useState } from 'react';
import { Workflow, CheckCircle, ShieldCheck } from 'lucide-react';

export const Section07Automation: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(2);

  const steps = [
    {
      name: "Business Request",
      tool: "Inbound Trigger",
      desc: "Incoming webhook or lead inquiry received with structured parameters."
    },
    {
      name: "AI Reasoning",
      tool: "LLM Context Evaluator",
      desc: "Agent evaluates intent, verifies constraints, and selects appropriate tool chain."
    },
    {
      name: "Agent Orchestration",
      tool: "n8n Workflow Hub",
      desc: "Directs flow across conditional paths, handles retries, and maintains state."
    },
    {
      name: "Tool Connection",
      tool: "Composio Hub",
      desc: "Authenticated API gateways securely execute mutations across CRM, email, and databases."
    },
    {
      name: "Automated Output",
      tool: "Operational Handshake",
      desc: "Downstream delivery completed with audit log and real-time stakeholder alert."
    }
  ];

  return (
    <section id="automation" className="min-h-screen flex flex-col justify-center items-center px-4 py-24 relative z-10">
      <div className="max-w-6xl w-full mx-auto text-left">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-900 uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/30 mb-3">
            <Workflow className="w-3.5 h-3.5 text-amber-600" />
            <span>07 AUTOMATION // N8N & COMPOSIO WORKFLOW ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
            Connected <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-cyan-600">Agent Workflows</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 font-normal leading-relaxed">
            Eliminating human glue work by linking reasoning models directly to production tool hubs using n8n and Composio without friction.
          </p>
        </div>

        {/* Workflow Chain Visualizer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 my-8">
          {steps.map((step, idx) => {
            const isCurrent = activeStep === idx;
            const isCompleted = activeStep > idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-white/95 border-amber-500/60 shadow-lg shadow-amber-500/15 scale-105'
                    : isCompleted
                    ? 'bg-white/90 border-emerald-500/40 shadow-xs'
                    : 'bg-white/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-slate-400">NODE 0{idx + 1}</span>
                    {isCompleted ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                    ) : null}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">{step.name}</h3>
                  <p className="text-[10px] font-mono text-amber-700 mt-0.5 font-medium">{step.tool}</p>
                </div>

                <p className="text-slate-600 text-[11px] font-normal leading-relaxed mt-4 pt-3 border-t border-slate-200/80">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Technical Callout */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-900/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3 text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>IDEMPOTENT WEBHOOK HANDLING WITH DETERMINISTIC CIRCUIT BREAKERS</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>PLATFORMS: <strong className="text-slate-800">n8n • Composio</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
};
