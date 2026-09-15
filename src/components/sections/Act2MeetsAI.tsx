import React, { useState } from 'react';
import { Bot, User, Sparkles, Terminal, Activity, Zap } from 'lucide-react';
import { soundFX } from '../../utils/audio';

export const Act2MeetsAI: React.FC = () => {
  const [activeDialogueIndex, setActiveDialogueIndex] = useState<number>(3);

  const dialogue = [
    {
      sender: "INTELLIGENCE",
      icon: Bot,
      text: "Neural gateway initialized. What are we constructing today?",
      tag: "CORE_AGENT_01"
    },
    {
      sender: "CHINMAY A",
      icon: User,
      text: "Autonomous intelligence with production precision. Zero bloat, strict latency budgets, and surgical tool invocation.",
      tag: "SYSTEM_ARCHITECT"
    },
    {
      sender: "INTELLIGENCE",
      icon: Bot,
      text: "Acoustic pipelines verified. Composio tools mapped across Dograh and LLM routers. Ready to synthesize.",
      tag: "CORE_AGENT_01"
    },
    {
      sender: "CHINMAY A",
      icon: User,
      text: "Execute across all telemetry nodes. Let's demonstrate how real systems think and build.",
      tag: "SYSTEM_ARCHITECT"
    }
  ];

  const handleAdvanceDialogue = () => {
    setActiveDialogueIndex((prev) => (prev < dialogue.length ? prev + 1 : 1));
    soundFX.playNodePulse();
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20 relative z-10">
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/40 px-3 py-1 rounded-md border border-cyan-800/40 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ACT II: CHINMAY MEETS AI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            The Symbiosis of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Architect & Machine</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Where human strategic systems design meets autonomous algorithmic execution.
          </p>
        </div>

        {/* 2-Column Hologram & Conversation Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Cinematic Holographic Portrait of Chinmay */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              {/* Outer Cybernetic Rings */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 to-violet-500/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

              <div className="relative rounded-2xl overflow-hidden border border-cyan-400/40 bg-slate-950/90 shadow-2xl max-w-[340px] sm:max-w-[380px]">
                {/* Holographic Header Bar */}
                <div className="bg-slate-900/90 px-4 py-2 border-b border-cyan-500/30 flex items-center justify-between text-[11px] font-mono text-cyan-300">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>HOLO_FEED: CHINMAY_A</span>
                  </div>
                  <span className="text-slate-500">60 FPS • 8K DEPTH</span>
                </div>

                {/* Portrait Image with Scanline Overlay */}
                <div className="relative aspect-square overflow-hidden bg-slate-900">
                  <img
                    src="/assets/chinmay-portrait.jpg"
                    alt="Chinmay A - AI Developer & Systems Architect"
                    className="w-full h-full object-cover object-center filter contrast-105 brightness-105"
                  />
                  {/* Subtle scanline overlay */}
                  <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-40" />

                  {/* Corner Target Reticles */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />
                </div>

                {/* Portrait Footer Telemetry */}
                <div className="p-3 bg-slate-950/90 border-t border-slate-800 font-mono text-xs text-slate-400 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <Activity className="w-3.5 h-3.5" />
                    <span>NEURAL BIOMETRIC: SYNCHRONIZED</span>
                  </div>
                  <span className="text-[10px] text-slate-500">APTEX CORE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Holographic Conversation Stream */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 text-left relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-violet-400" />
                  <span className="text-white font-bold">SYNAPSE DIALOGUE STREAM</span>
                </div>
                <button
                  onClick={handleAdvanceDialogue}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Cycle Synapse</span>
                </button>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4">
                {dialogue.slice(0, activeDialogueIndex).map((item, index) => {
                  const isUser = item.sender === "CHINMAY A";
                  return (
                    <div
                      key={index}
                      className={`flex gap-3 p-3.5 rounded-xl border transition-all duration-300 ${
                        isUser
                          ? 'bg-slate-900/80 border-cyan-500/30 ml-4 sm:ml-8'
                          : 'bg-violet-950/30 border-violet-500/30 mr-4 sm:mr-8'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg h-fit ${
                          isUser ? 'bg-cyan-500/20 text-cyan-300' : 'bg-violet-500/20 text-violet-300'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between font-mono mb-1">
                          <span className={`font-bold ${isUser ? 'text-cyan-400' : 'text-violet-400'}`}>
                            {item.sender}
                          </span>
                          <span className="text-[10px] text-slate-500">{item.tag}</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed font-sans sm:text-sm">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* System Note */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-emerald-400">● 2-WAY QUANTUM RPC STREAM ACTIVE</span>
                <span className="text-slate-500">ENCRYPTION: AES-GCM-256</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
