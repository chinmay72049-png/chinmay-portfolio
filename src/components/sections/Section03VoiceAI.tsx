import React, { useState } from 'react';
import { Mic, Radio, Cpu, Wrench, Volume2, Play, Zap } from 'lucide-react';

export const Section03VoiceAI: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number>(0);
  const [simulating, setSimulating] = useState<boolean>(false);

  const pipeline = [
    {
      id: "VOICE",
      label: "Acoustic Voice",
      sub: "Inbound Audio Stream",
      metric: "<45ms VAD Framing",
      icon: Mic,
      desc: "Live audio frames captured over WebSockets with voice activity detection."
    },
    {
      id: "STT",
      label: "Streaming STT",
      sub: "Acoustic Transcription",
      metric: "99.4% Accuracy",
      icon: Radio,
      desc: "Deepgram / Whisper neural models convert acoustic stream to tokens."
    },
    {
      id: "LLM",
      label: "Reasoning LLM",
      sub: "Intent Classification",
      metric: "Speculative Decode",
      icon: Cpu,
      desc: "Language models evaluate conversation context and resolve customer intent."
    },
    {
      id: "CONTEXT",
      label: "Context & Tools",
      sub: "Composio / CRM Relay",
      metric: "Deterministic FSM",
      icon: Wrench,
      desc: "Deterministic state machine queries CRM data and schedules calendar appointments."
    },
    {
      id: "TTS",
      label: "Neural TTS",
      sub: "Low-Latency Audio",
      metric: "Sub-280ms Turn-Around",
      icon: Volume2,
      desc: "First audio chunk streamed back to customer before natural conversational pause expires."
    }
  ];

  const triggerSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    let curr = 0;
    setActiveNode(0);

    const interval = setInterval(() => {
      curr++;
      if (curr < pipeline.length) {
        setActiveNode(curr);
      } else {
        clearInterval(interval);
        setSimulating(false);
      }
    }, 600);
  };

  return (
    <section id="voice-ai" className="min-h-screen flex flex-col justify-center items-center px-4 py-24 relative z-10">
      <div className="max-w-6xl w-full mx-auto text-left">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-900 uppercase bg-cyan-500/10 px-3 py-1 rounded-md border border-cyan-500/30 mb-3">
              <Radio className="w-3.5 h-3.5 text-cyan-600" />
              <span>03 VOICE AI // CONVERSATIONAL PIPELINE ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
              Sub-Second <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-500 to-amber-600">Speech-to-Speech Loops</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 font-normal leading-relaxed">
              Engineering real-time telephony architectures where conversational turn-taking, intent parsing, and tool execution happen within natural human pause budgets.
            </p>
          </div>

          <button
            onClick={triggerSimulation}
            disabled={simulating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-cyan-600/30 text-cyan-800 hover:bg-cyan-50 hover:border-cyan-600/50 transition-all font-mono text-xs cursor-pointer shadow-sm disabled:opacity-50 font-semibold"
          >
            <Play className={`w-3.5 h-3.5 ${simulating ? 'animate-spin text-cyan-600' : ''}`} />
            <span>{simulating ? 'TRANSMITTING STREAM...' : 'SIMULATE VOICE TURN'}</span>
          </button>
        </div>

        {/* Spatial Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 my-6">
          {pipeline.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeNode === idx;
            const isPassed = activeNode > idx;

            return (
              <div
                key={step.id}
                onClick={() => setActiveNode(idx)}
                className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'bg-white/95 border-cyan-500 shadow-lg shadow-cyan-500/15 scale-105'
                    : isPassed
                    ? 'bg-white/90 border-emerald-500/40 shadow-xs'
                    : 'bg-white/70 border-slate-200/80 hover:bg-white/95 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl ${isActive ? 'bg-cyan-500/15 text-cyan-700' : 'bg-slate-100 text-slate-600'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 tracking-tight">{step.label}</div>
                  <div className="text-[11px] font-mono text-cyan-700 mt-0.5 font-medium">{step.sub}</div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/80">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    {step.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Node Telemetry Callout */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-900/10 mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 font-mono text-xs text-slate-700">
            <Zap className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <span className="text-slate-900 font-bold">{pipeline[activeNode].label}:</span> {pipeline[activeNode].desc}
            </div>
          </div>
          <div className="text-[11px] font-mono text-slate-500 shrink-0">
            SYSTEM LATENCY BUDGET: <strong className="text-slate-800">&lt;280MS TOTAL</strong>
          </div>
        </div>
      </div>
    </section>
  );
};
