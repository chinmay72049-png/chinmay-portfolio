import React, { useState, useEffect, useRef } from 'react';
import { Mic, Play, CheckCircle2, Cpu, Wrench, Volume2, Sparkles, Activity } from 'lucide-react';
import { soundFX } from '../../utils/audio';

export const VoiceAgentSim: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string>(
    "Book an executive AI sync for tomorrow at 3 PM and update CRM status."
  );
  const [latency, setLatency] = useState<number>(240);
  const [logs, setLogs] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const steps = [
    { id: 0, label: "Client Audio Input", icon: Mic, color: "text-cyan-400" },
    { id: 1, label: "Dograh Engine (ASR / Acoustic)", icon: Activity, color: "text-indigo-400" },
    { id: 2, label: "LLM Decision Router", icon: Cpu, color: "text-violet-400" },
    { id: 3, label: "Composio Real-Time Tools", icon: Wrench, color: "text-amber-400" },
    { id: 4, label: "Low-Latency TTS Output", icon: Volume2, color: "text-emerald-400" }
  ];

  // Audio wave canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const renderWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = isRunning ? '#06b6d4' : '#475569';
      ctx.beginPath();

      const sliceWidth = canvas.width / 50;
      let x = 0;

      for (let i = 0; i < 50; i++) {
        const amplitude = isRunning ? Math.sin(i * 0.2 + phase) * 14 + (Math.random() * 4) : Math.sin(i * 0.1 + phase) * 3;
        const y = canvas.height / 2 + amplitude;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.stroke();
      phase += isRunning ? 0.15 : 0.03;
      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [isRunning]);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
    setLogs(["[00ms] Client speech received: '" + selectedPrompt + "'"]);
    soundFX.playNodePulse();

    const sequence = [
      { step: 1, delay: 500, log: "[65ms] Dograh VAD + Deepgram Nova-2 ASR stream decoded with 99.4% confidence." },
      { step: 2, delay: 1100, log: "[140ms] LLM Router classified intent: 'calendar.schedule_event' & 'crm.update_lead'." },
      { step: 3, delay: 1800, log: "[210ms] Composio tool triggered: Google Calendar OAuth + HubSpot CRM patch successfully dispatched." },
      { step: 4, delay: 2500, log: "[278ms] TTS Cartesia stream synthesizer streaming audio reply back to caller." }
    ];

    sequence.forEach(({ step, delay, log }) => {
      setTimeout(() => {
        setActiveStep(step);
        soundFX.playNodePulse();
        setLogs(prev => [log, ...prev]);
        if (step === 4) {
          setIsRunning(false);
          setLatency(Math.floor(230 + Math.random() * 50));
        }
      }, delay);
    });
  };

  return (
    <div className="glass-panel-glow rounded-2xl p-6 md:p-8 text-left relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono tracking-widest text-violet-400 uppercase">Live Pipeline Architecture</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight mt-1">Autonomous AI Voice Agent Platform</h3>
          <p className="text-slate-400 text-sm mt-1">
            End-to-end conversational voice loop: Acoustic stream ➔ Decision reasoning ➔ Real-time Composio tool execution ➔ Ultra-low latency voice reply.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900/80 border border-slate-700/60 px-3 py-1.5 rounded-lg text-right">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Stream Latency</div>
            <div className="text-base font-mono font-bold text-emerald-400">{latency}ms</div>
          </div>
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-violet-500/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Processing Flow...' : 'Simulate Voice Call'}
          </button>
        </div>
      </div>

      {/* Interactive Prompt Selector */}
      <div className="mb-6 bg-slate-950/60 border border-white/5 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 w-full md:w-auto">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Client Voice Intent:</span>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {[
            "Book an executive AI sync for tomorrow at 3 PM and update CRM status.",
            "Verify flight status, reschedule to 7 PM, and alert customer via WhatsApp.",
            "Diagnose fleet server outage and invoke restart tool."
          ].map((prompt, idx) => (
            <button
              key={idx}
              disabled={isRunning}
              onClick={() => setSelectedPrompt(prompt)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-all text-left ${
                selectedPrompt === prompt
                  ? 'bg-violet-600/30 border border-violet-500 text-violet-200'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Preset {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Pipeline Flow Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative my-6">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = activeStep === idx;
          const isPassed = activeStep > idx;

          return (
            <div
              key={step.id}
              className={`relative rounded-xl p-4 transition-all duration-300 flex flex-col items-center text-center ${
                isActive
                  ? 'bg-violet-950/50 border-2 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105'
                  : isPassed
                  ? 'bg-slate-900/80 border border-emerald-500/50'
                  : 'bg-slate-900/40 border border-slate-800/80 opacity-60'
              }`}
            >
              <div className={`p-2.5 rounded-lg mb-2 ${isActive ? 'bg-cyan-500/20 text-cyan-300' : isPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                {isPassed ? <CheckCircle2 className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
              </div>
              <div className="text-xs font-semibold text-white tracking-wide">{step.label}</div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">Node 0{idx + 1}</div>

              {/* Step indicator arrow for desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-slate-600 z-10 font-mono text-xs">
                  ➔
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Waveform and Live Logs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-center">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>ACOUSTIC WAVEFORM</span>
            <span className={isRunning ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}>
              {isRunning ? 'TRANSMITTING' : 'IDLE'}
            </span>
          </div>
          <canvas ref={canvasRef} width={280} height={60} className="w-full h-14 rounded-lg bg-black/40" />
        </div>

        <div className="md:col-span-2 bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 font-mono text-xs overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2 mb-2">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              SYSTEM EXECUTION LOGS
            </span>
            <span className="text-[10px] text-slate-500">DOGRAH + COMPOSIO TELEMETRY</span>
          </div>
          <div className="space-y-1.5 max-h-24 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-slate-500 italic">Click 'Simulate Voice Call' to observe real-time agent choreography...</div>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="text-slate-300 leading-relaxed">
                  <span className="text-cyan-400">❯</span> {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
