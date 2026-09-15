import React, { useState, useEffect } from 'react';
import { Cpu, Server, HardDrive, Zap, Activity } from 'lucide-react';

export const Section06LocalIntelligence: React.FC = () => {
  const [tokenIndex, setTokenIndex] = useState<number>(0);
  const sampleTokens = [
    "LOCAL_INFERENCE_INITIALIZED",
    "WEIGHTS_LOADED_INTO_VRAM",
    "CONTEXT_WINDOW_PRUNED",
    "ATTENTION_HEADS_STREAMING",
    "TOKEN_OUTPUT_ZERO_LATENCY"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTokenIndex((prev) => (prev + 1) % sampleTokens.length);
    }, 1200);
    return () => clearInterval(timer);
  }, [sampleTokens.length]);

  return (
    <section id="local-intelligence" className="min-h-screen flex flex-col justify-center items-center px-4 py-24 relative z-10">
      <div className="max-w-6xl w-full mx-auto text-left">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-900 uppercase bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/30 mb-3">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span>06 LOCAL INTELLIGENCE // OLLAMA & GPU COMPUTE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
            On-Premises <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-600">GPU Inference</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 font-normal leading-relaxed">
            Deploying open-source language models directly on local GPU hardware with Ollama—guaranteeing air-gapped data privacy, zero API throttling, and continuous operational uptime.
          </p>
        </div>

        {/* Local Compute Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Local Compute Capabilities */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass-panel p-6 rounded-2xl border border-slate-900/10 hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 font-mono text-xs text-emerald-700 mb-2 font-semibold">
                <HardDrive className="w-4 h-4" />
                <span>HARDWARE ACCELERATION // GPU VRAM</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1.5">Ollama Model Orchestration</h3>
              <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                Deploying, quantizing, and serving open-source foundation models locally on dedicated GPU infrastructure. Managing memory bandwidth allocations and concurrency queues.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-900/10 hover:border-cyan-500/40 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 font-mono text-xs text-cyan-700 mb-2 font-semibold">
                <Server className="w-4 h-4" />
                <span>BENCHMARKING & EXPERIMENTATION</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1.5">Model Evaluation Frameworks</h3>
              <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                Evaluating parameter quantization trade-offs, token generation rates, and reasoning quality on local tasks before promoting models into production pipelines.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-900/10 hover:border-amber-500/40 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 font-mono text-xs text-amber-700 mb-2 font-semibold">
                <Zap className="w-4 h-4" />
                <span>AIR-GAPPED PRIVACY</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1.5">Zero Cloud Egress</h3>
              <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                Strict compliance for sensitive corporate datasets and client proprietary interactions. Data remains strictly contained on local physical hardware.
              </p>
            </div>
          </div>

          {/* Right Column: Simulated Local Telemetry Monitor */}
          <div className="lg:col-span-5">
            <div className="glass-panel-glow p-6 rounded-3xl border border-emerald-500/30 h-full flex flex-col justify-between font-mono text-xs">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <Activity className="w-4 h-4 animate-pulse" />
                    <span>LOCAL_NODE_MONITOR</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">ENGINE: OLLAMA</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-[10px] text-slate-500">STREAMING TOKEN BUS</div>
                    <div className="text-emerald-800 font-bold mt-1 text-sm">
                      &gt; {sampleTokens[tokenIndex]}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                      <span className="text-slate-500 block text-[10px]">INFERENCE MODE</span>
                      <span className="text-slate-900 font-bold">GPU ACCELERATED</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                      <span className="text-slate-500 block text-[10px]">CLOUD DEPENDENCY</span>
                      <span className="text-emerald-700 font-bold">0% (OFFLINE)</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Quantization:</span> <span className="text-slate-900 font-medium">GGUF / Q4_K_M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Server Gateway:</span> <span className="text-slate-900 font-medium">Local REST / WebSockets</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Health Status:</span> <span className="text-emerald-700 font-bold">NOMINAL</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500">
                <span>PITCHX AI GPU INFRASTRUCTURE</span>
                <span className="text-emerald-700 font-bold">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
