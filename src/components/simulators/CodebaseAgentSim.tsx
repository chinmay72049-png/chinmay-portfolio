import React, { useState } from 'react';
import { GitCommit, FileCode, Terminal, AlertTriangle, ShieldCheck } from 'lucide-react';
import { soundFX } from '../../utils/audio';

export const CodebaseAgentSim: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [diffApplied, setDiffApplied] = useState<boolean>(false);

  const tasks = [
    {
      title: "Migrate Auth Session to Signed JWT with Redis Revocation",
      targetFile: "src/auth/session.ts",
      lines: "4 lines updated",
      diffBefore: [
        "// Legacy in-memory session handling",
        "export function validateSession(req: Request) {",
        "-  const sid = req.cookies['session_id'];",
        "-  return memoryStore.get(sid);",
        "}"
      ],
      diffAfter: [
        "// Surgical modern JWT validation with Redis revocation check",
        "export async function validateSession(req: Request) {",
        "+  const token = req.headers.authorization?.split(' ')[1];",
        "+  if (!token || await redisRevokedList.has(token)) return null;",
        "+  return jwt.verify(token, process.env.JWT_SECRET! as string);",
        "}"
      ]
    },
    {
      title: "Add Self-Healing Circuit Breaker to Webhook Dispatcher",
      targetFile: "src/services/webhook.ts",
      lines: "5 lines updated",
      diffBefore: [
        "export async function dispatchWebhook(url: string, payload: any) {",
        "-  return await fetch(url, { method: 'POST', body: JSON.stringify(payload) });",
        "}"
      ],
      diffAfter: [
        "export async function dispatchWebhook(url: string, payload: any) {",
        "+  return await circuitBreaker.execute(async () => {",
        "+    return await fetch(url, { method: 'POST', body: JSON.stringify(payload), timeout: 3000 });",
        "+  }, { maxRetries: 3, fallbackPolicy: 'queue_to_dlq' });",
        "}"
      ]
    }
  ];

  const handleApplyChange = () => {
    setIsProcessing(true);
    setDiffApplied(false);
    soundFX.playScanSound();

    setTimeout(() => {
      setIsProcessing(false);
      setDiffApplied(true);
      soundFX.playNodePulse();
    }, 1200);
  };

  const current = tasks[selectedTask];

  return (
    <div className="glass-panel-glow rounded-2xl p-6 md:p-8 text-left relative overflow-hidden">
      {/* Glow Accent */}
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Surgical Code Synthesizer</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight mt-1">AI Project Modification Agent</h3>
          <p className="text-slate-400 text-sm mt-1">
            System parses AST, models repo dependencies, understands change intent, and executes precise, non-destructive edits without wholesale file re-writes.
          </p>
        </div>

        <button
          onClick={handleApplyChange}
          disabled={isProcessing}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50 cursor-pointer"
        >
          <GitCommit className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
          {isProcessing ? 'Analyzing AST & Diffing...' : 'Execute Surgical Edit'}
        </button>
      </div>

      {/* Change Request Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tasks.map((task, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedTask(idx);
              setDiffApplied(false);
            }}
            className={`text-xs font-mono px-4 py-2 rounded-lg transition-all text-left flex items-center gap-2 cursor-pointer ${
              selectedTask === idx
                ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200'
                : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>{task.title}</span>
          </button>
        ))}
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono text-xs">
        <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
          <div className="text-slate-500 text-[10px]">REPO COVERAGE</div>
          <div className="text-slate-200 font-bold mt-0.5">48 Files Parsed</div>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
          <div className="text-slate-500 text-[10px]">SURGICAL ACCURACY</div>
          <div className="text-emerald-400 font-bold mt-0.5">100% Target Match</div>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
          <div className="text-slate-500 text-[10px]">TOUCHED LINES</div>
          <div className="text-cyan-400 font-bold mt-0.5">{current.lines}</div>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
          <div className="text-slate-500 text-[10px]">COLLATERAL BLOAT</div>
          <div className="text-emerald-400 font-bold mt-0.5">0 Regressions</div>
        </div>
      </div>

      {/* Code Diff Display */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
        <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-200">{current.targetFile}</span>
            <span className="text-[10px] text-slate-500">AST Refactor Target</span>
          </div>
          <div className="flex items-center gap-2">
            {diffApplied ? (
              <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" /> PATCH CLEANLY MERGED
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1 text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5" /> PENDING REFACTOR
              </span>
            )}
          </div>
        </div>

        <div className="p-4 space-y-1 overflow-x-auto">
          {(!diffApplied || isProcessing) &&
            current.diffBefore.map((line, i) => (
              <div
                key={i}
                className={`py-0.5 px-2 rounded ${
                  line.startsWith('-') ? 'bg-rose-950/40 text-rose-300 font-bold' : 'text-slate-400'
                }`}
              >
                {line}
              </div>
            ))}

          {diffApplied &&
            current.diffAfter.map((line, i) => (
              <div
                key={i}
                className={`py-0.5 px-2 rounded transition-all duration-300 ${
                  line.startsWith('+') ? 'bg-emerald-950/50 text-emerald-300 font-bold' : 'text-slate-400'
                }`}
              >
                {line}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
