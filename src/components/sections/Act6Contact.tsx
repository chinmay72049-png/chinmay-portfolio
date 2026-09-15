import React, { useState } from 'react';
import { Mail, Download, Check, Send, Terminal as TerminalIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../../utils/audio';

export const Act6Contact: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Chinmay A Intelligence Gateway [Version 2.4.0]",
    "Type 'help' for available commands or click actions below."
  ]);

  const email = "chinmay.ai.architect@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    soundFX.playNodePulse();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.85 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadResume = () => {
    soundFX.playChime(700, 'sine', 0.2, 0.08);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 }
    });

    // Generate executive resume summary document download
    const resumeContent = `# CHINMAY A
AI Systems Architect & Senior Developer
Contact: ${email}
Specialties: Autonomous Voice Agents, Codebase Modification Agents, Enterprise Automation, Generative AI & RAG

## EXECUTIVE SUMMARY
Experienced AI Systems Architect specializing in production-grade AI agent choreography, ultra-low latency voice pipelines (Dograh + Composio), context-aware AST codebase modification, and resilient distributed workflows.

## TRACK RECORD & IMPACT (APTEX)
- Architected sub-280ms end-to-end voice pipelines integrating Dograh acoustic pipelines with Composio tool suites.
- Deployed autonomous codebase modification agents capable of parsing multi-thousand file ASTs for zero-bloat surgical edits.
- Created self-healing workflow automation pipelines handling high-throughput webhooks and fault-tolerant retry policies.

## CORE CAPABILITIES
- Voice & Audio: Dograh, Cartesia, Deepgram Nova-2, VAD streaming, WebSockets
- Agentic Tooling: Composio, Function Calling, Pydantic Schema Guards, Finite State Machines
- Code Synthesis: Abstract Syntax Tree (AST) parsing, unified diff generation, dependency graphing
- GenAI & Search: Hybrid RAG, BM25 reranking, Vector DBs (Pinecone, Qdrant, Redis), Prompt Engineering
- Creative AI: Multi-modal creative synthesis (Kiera)

Available for high-impact AI architecture, full-time engineering leadership, and strategic contracts.
`;

    const blob = new Blob([resumeContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Chinmay_A_AI_Architect_Resume.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    soundFX.playScanSound();
    let reply = "";

    switch (cmd) {
      case "help":
        reply = "Commands: 'about', 'experience', 'systems', 'contact', 'resume', 'skills', 'clear'";
        break;
      case "about":
        reply = "Chinmay A: AI Systems Architect building continuous 3D worlds, voice agents, and autonomous AST codegen.";
        break;
      case "experience":
        reply = "Aptex: Spearheading enterprise AI agent infrastructure and low-latency voice pipelines.";
        break;
      case "systems":
        reply = "1. AI Voice Agent Platform | 2. Codebase Mod Agent | 3. Automation Chains | 4. GenAI Lab & Kiera.";
        break;
      case "skills":
        reply = "Python, TypeScript, Dograh, Composio, Three.js, WebSockets, RAG, AST Diffing, PyTorch, LangChain.";
        break;
      case "contact":
        reply = `Email: ${email} | Ready for high-impact AI engineering.`;
        break;
      case "resume":
        handleDownloadResume();
        reply = "Initiating resume download...";
        break;
      case "clear":
        setTerminalOutput([]);
        setTerminalInput('');
        return;
      default:
        reply = `Command not recognized: '${cmd}'. Type 'help' for options.`;
    }

    setTerminalOutput(prev => [...prev, `> ${terminalInput}`, reply]);
    setTerminalInput('');
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20 relative z-10 text-center">
      <div className="max-w-4xl w-full mx-auto space-y-10">
        {/* The Core Transformation Portal */}
        <div className="relative group inline-block">
          {/* Pulsing Aura */}
          <div className="absolute -inset-8 bg-gradient-to-r from-violet-600/30 via-cyan-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse-glow" />

          <div className="relative inline-flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/60 px-4 py-1.5 rounded-full border border-emerald-500/40 mb-4 shadow-lg shadow-emerald-500/10">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>CORE TRANSFORMATION COMPLETE • GATEWAY OPEN</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase">
            CHINMAY A
          </h2>
          <p className="text-xl sm:text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-300 to-indigo-300 mt-2">
            Let's build something intelligent.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl shadow-violet-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-300" /> : <Mail className="w-5 h-5" />}
            <span>{copied ? "Email Copied to Clipboard!" : "Initiate Contact"}</span>
          </button>

          <button
            onClick={handleDownloadResume}
            className="flex items-center gap-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-semibold text-sm sm:text-base px-8 py-4 rounded-2xl transition-all shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Download className="w-5 h-5 text-cyan-400" />
            <span>Download Executive Resume</span>
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center gap-4 text-slate-400">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-400 hover:text-cyan-400 transition-all"
            title="GitHub"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-violet-400 hover:text-violet-400 transition-all"
            title="LinkedIn"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.62.72-1.62 1.62 0 .89.72 1.62 1.62 1.62.89 0 1.62-.73 1.62-1.62 0-.9-.73-1.62-1.62-1.62z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-400 hover:text-cyan-400 transition-all"
            title="Twitter / X"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        {/* Interactive CLI Terminal Console */}
        <div className="max-w-2xl mx-auto text-left bg-slate-950/90 border border-slate-800 rounded-2xl overflow-hidden font-mono text-xs shadow-2xl">
          <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-slate-400">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-200">CHINMAY_AI_CLI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
          </div>

          <div className="p-4 space-y-1.5 max-h-40 overflow-y-auto">
            {terminalOutput.map((line, idx) => (
              <div key={idx} className={line.startsWith('>') ? 'text-cyan-400 font-bold' : 'text-slate-300'}>
                {line}
              </div>
            ))}
          </div>

          <form onSubmit={handleCommand} className="border-t border-slate-800 p-2.5 bg-slate-900/40 flex items-center gap-2">
            <span className="text-emerald-400 pl-2">❯</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Type 'help', 'skills', 'experience', 'resume'..."
              className="flex-1 bg-transparent border-none outline-none text-slate-200 font-mono text-xs"
            />
            <button type="submit" className="text-slate-400 hover:text-cyan-400 p-1 cursor-pointer">
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Footer Credit */}
        <div className="text-slate-600 font-mono text-xs pt-8">
          Continuous 3D WebGL Portfolio • Engineered by Chinmay A • Powered by Antigravity
        </div>
      </div>
    </section>
  );
};
