import React, { useState } from 'react';
import { Workflow, Play, Layers, ShieldAlert, CheckCircle, ArrowRight } from 'lucide-react';
import { soundFX } from '../../utils/audio';

export const AutomationSim: React.FC = () => {
  const [injectFailure, setInjectFailure] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [healingTriggered, setHealingTriggered] = useState<boolean>(false);

  const chainNodes = [
    { name: "Webhook Ingestion", desc: "Signed HMAC Payload" },
    { name: "Schema Normalizer", desc: "Pydantic / Zod parse" },
    { name: "Composio Hub Tool", desc: "API Gateway Relay" },
    { name: "Persistent State DB", desc: "ACID Transaction" },
    { name: "Slack / Email Broadcast", desc: "Stakeholder Ping" }
  ];

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
    setHealingTriggered(false);
    soundFX.playScanSound();

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current === 2 && injectFailure) {
        // Trigger self-healing
        setHealingTriggered(true);
        soundFX.playChime(300, 'sawtooth', 0.2, 0.08);
        setActiveStep(2);
        setTimeout(() => {
          // Healed
          soundFX.playChime(600, 'sine', 0.2, 0.06);
          setActiveStep(3);
        }, 1000);
      } else if (current >= chainNodes.length) {
        clearInterval(interval);
        setActiveStep(chainNodes.length);
        setIsRunning(false);
        soundFX.playNodePulse();
      } else {
        setActiveStep(current);
        soundFX.playNodePulse();
      }
    }, 600);
  };

  return (
    <div className="glass-panel-glow rounded-2xl p-6 md:p-8 text-left relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-400" />
            <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">Distributed Orchestration</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight mt-1">Enterprise Automation Chains</h3>
          <p className="text-slate-400 text-sm mt-1">
            Visual workflow chain connecting microservices, automated schema validation, dynamic Composio tool hubs, and self-healing error recovery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-950/80 border border-slate-800 px-3 py-2 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={injectFailure}
              onChange={(e) => setInjectFailure(e.target.checked)}
              className="accent-rose-500 w-3.5 h-3.5 rounded"
            />
            <span className={injectFailure ? 'text-rose-400 font-bold' : 'text-slate-400'}>
              Simulate Network Dropout
            </span>
          </label>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Executing Chain...' : 'Trigger Workflow'}
          </button>
        </div>
      </div>

      {/* Visual Chain Progression */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 my-8">
        {chainNodes.map((node, i) => {
          const isNodeActive = activeStep === i;
          const isCompleted = activeStep > i;
          const isFailing = i === 2 && healingTriggered;

          return (
            <React.Fragment key={i}>
              <div
                className={`flex-1 w-full md:w-auto p-4 rounded-xl border transition-all duration-300 relative ${
                  isFailing
                    ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-500/20 animate-pulse'
                    : isNodeActive
                    ? 'bg-indigo-950/50 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105'
                    : isCompleted
                    ? 'bg-slate-900/90 border-emerald-500/50'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Node 0{i + 1}</span>
                  {isCompleted ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isFailing ? (
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </div>
                <div className="text-xs font-bold text-white tracking-wide">{node.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{node.desc}</div>

                {isFailing && (
                  <div className="mt-2 text-[10px] font-mono bg-rose-900/60 text-rose-200 px-1.5 py-0.5 rounded">
                    Exponential Backoff Retry Triggered
                  </div>
                )}
              </div>

              {i < chainNodes.length - 1 && (
                <div className="hidden md:block text-slate-600 font-mono text-xs px-1">
                  <ArrowRight className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-slate-700'}`} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Telemetry Status Bar */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-indigo-400" />
          <span className="text-slate-400">STATUS:</span>
          <span className="text-slate-200">
            {activeStep === -1
              ? 'Standby • Ready for incoming trigger'
              : isRunning
              ? 'Active Pipeline Processing'
              : 'Pipeline Run Completed with 100% Delivery'}
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-slate-400">Idempotency: <strong className="text-emerald-400">Enabled</strong></span>
          <span className="text-slate-400">Circuit Breaker: <strong className="text-cyan-400">Zero-Loss</strong></span>
        </div>
      </div>
    </div>
  );
};
