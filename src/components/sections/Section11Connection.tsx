import React, { useState } from 'react';
import { Mail, Copy, Check, Terminal, Radio, Send, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { profile } from '../../data/profile';
import { askGeminiLive } from '../../services/geminiLiveService';

export const Section11Connection: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [cmdInput, setCmdInput] = useState<string>('');
  const [consoleLog, setConsoleLog] = useState<string[]>([
    "Zarbo Gateway [Core Protocol v4.2.0]",
    "Connection channel initialized. Type 'help' or execute direct actions below."
  ]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.85 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = cmdInput.trim();
    if (!query) return;

    const c = query.toLowerCase();
    setCmdInput('');

    if (c === "clear") {
      setConsoleLog([]);
      return;
    }

    if (c === "help") {
      setConsoleLog(prev => [
        ...prev,
        `> ${query}`,
        "Quick commands: 'email', 'linkedin', 'status', 'clear', or simply ask any question about Chinmay's background, voice AI, or projects!"
      ]);
      return;
    }

    if (c === "email") {
      handleCopyEmail();
      setConsoleLog(prev => [...prev, `> ${query}`, `Email copied: ${profile.email}`]);
      return;
    }

    if (c === "linkedin") {
      window.open(profile.linkedin, "_blank");
      setConsoleLog(prev => [...prev, `> ${query}`, `Opening LinkedIn: ${profile.linkedin}`]);
      return;
    }

    if (c === "status") {
      setConsoleLog(prev => [...prev, `> ${query}`, "SYSTEM READY // PITCHX AI • Available for high-impact AI engineering."]);
      return;
    }

    // Pass any question to Gemini 3.1 Flash Live (grounded strictly in Chinmay's content)
    setConsoleLog(prev => [...prev, `> ${query}`, "Thinking..."]);
    try {
      const reply = await askGeminiLive(query);
      setConsoleLog(prev => {
        const next = [...prev];
        next[next.length - 1] = `Zarbo: ${reply}`;
        return next;
      });
    } catch {
      setConsoleLog(prev => {
        const next = [...prev];
        next[next.length - 1] = `Zarbo: Chinmay A is an AI/ML Engineer specializing in Generative AI, Voice AI, and automation at PitchX AI. Reach out directly at ${profile.email}!`;
        return next;
      });
    }
  };

  return (
    <section id="connection" className="min-h-screen flex flex-col justify-center items-center px-4 py-24 relative z-10 text-center">
      <div className="max-w-4xl w-full mx-auto space-y-12">
        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-900 uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/30">
          <Radio className="w-3.5 h-3.5 text-amber-600" />
          <span>11 CONNECTION // INITIATE SYSTEM HANDSHAKE</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight uppercase">
            BUILD SOMETHING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-cyan-600">
              INTELLIGENT.
            </span>
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl font-normal max-w-xl mx-auto">
            Have a problem worth solving? Let's connect and architect real AI solutions.
          </p>
        </div>

        {/* Primary Contact Action Cards */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
          {/* Email Copy Card */}
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl glass-panel-glow border border-amber-500/40 text-amber-900 hover:text-amber-950 transition-all shadow-xl hover:shadow-amber-500/10 cursor-pointer group"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Mail className="w-5 h-5 text-amber-600" />}
            <span className="font-mono text-sm sm:text-base font-bold">
              {copied ? "COPIED TO CLIPBOARD" : profile.email}
            </span>
            <Copy className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors ml-1" />
          </button>

          {/* LinkedIn Direct Link */}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl glass-panel border border-slate-900/10 text-slate-800 hover:text-slate-950 hover:border-cyan-500/60 transition-all shadow-md cursor-pointer"
          >
            <svg className="w-5 h-5 fill-current text-cyan-600" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.62.72-1.62 1.62 0 .89.72 1.62 1.62 1.62.89 0 1.62-.73 1.62-1.62 0-.9-.73-1.62-1.62-1.62z" />
            </svg>
            <span className="font-mono text-sm sm:text-base font-bold">LINKEDIN PROFILE</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* Minimal Terminal Gateway */}
        <div className="max-w-2xl mx-auto text-left bg-slate-950/95 border border-slate-800 rounded-2xl overflow-hidden font-mono text-xs shadow-2xl">
          <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-200 font-bold">SYSTEM_CONNECTION_GATEWAY</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            </div>
          </div>

          <div className="p-4 space-y-1.5 max-h-36 overflow-y-auto">
            {consoleLog.map((line, idx) => (
              <div key={idx} className={line.startsWith('>') ? 'text-amber-300 font-bold' : 'text-slate-300'}>
                {line}
              </div>
            ))}
          </div>

          <form onSubmit={handleCommand} className="border-t border-slate-800 p-2.5 bg-slate-900/40 flex items-center gap-2">
            <span className="text-amber-400 pl-2">❯</span>
            <input
              type="text"
              value={cmdInput}
              onChange={(e) => setCmdInput(e.target.value)}
              placeholder="Type 'email', 'linkedin', 'status', 'help'..."
              className="flex-1 bg-transparent border-none outline-none text-slate-200 font-mono text-xs"
            />
            <button type="submit" className="text-slate-400 hover:text-amber-400 p-1 cursor-pointer">
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="text-slate-500 font-mono text-xs pt-12 space-y-1">
          <div>CHINMAY A • AI/ML ENGINEER • BANGALORE RURAL, KARNATAKA, INDIA</div>
          <div className="text-slate-400 text-[10px]">PROPRIETARY 3D ZARBO ENGINE • POWERED BY GEMINI 3.1 FLASH</div>
        </div>
      </div>
    </section>
  );
};
