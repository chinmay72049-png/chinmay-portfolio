import React, { useState } from 'react';
import { Database, Sparkles, Brain, Search, Cpu, Compass, Radio } from 'lucide-react';
import { soundFX } from '../../utils/audio';

export const GenAISim: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rag' | 'kiera'>('rag');
  const [searchQuery, setSearchQuery] = useState<string>("autonomous voice latency optimization");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const ragChunks = [
    {
      score: 0.942,
      tag: "CHUNK_081",
      content: "Dograh acoustic frame buffering: Stream raw PCM chunks directly into low-latency VAD to trim round-trip silences under 75ms."
    },
    {
      score: 0.887,
      tag: "CHUNK_142",
      content: "Composio OpenAPI spec caching: Pre-compute JSON schemas in-memory to prevent tool definition overhead during LLM function calling."
    },
    {
      score: 0.835,
      tag: "CHUNK_019",
      content: "Semantic cache layer: Redis vector similarity index reduces repeated LLM reasoning trips by 38% with sub-15ms response."
    }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    soundFX.playScanSound();
    setTimeout(() => {
      setIsSearching(false);
      soundFX.playNodePulse();
    }, 700);
  };

  return (
    <div className="glass-panel-glow rounded-2xl p-6 md:p-8 text-left relative overflow-hidden">
      {/* Tab Selector */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveTab('rag');
              soundFX.playChime(440, 'sine', 0.1, 0.04);
            }}
            className={`flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'rag'
                ? 'bg-violet-600/30 border border-violet-500 text-violet-200 shadow-md shadow-violet-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-violet-400" />
            <span>GenAI & RAG Semantic Lab</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('kiera');
              soundFX.playChime(660, 'sine', 0.1, 0.04);
            }}
            className={`flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'kiera'
                ? 'bg-gradient-to-r from-pink-600/30 to-amber-600/30 border border-pink-500 text-pink-200 shadow-md shadow-pink-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Kiera • Creative AI Co-Pilot</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
          MODELS: GEMINI 1.5 PRO / CLAUDE 3.5 / LLAMA 3
        </div>
      </div>

      {/* Content: Tab 1 - RAG & Prompt Engineering */}
      {activeTab === 'rag' ? (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-xl font-bold text-white">Hybrid Retrieval-Augmented Generation</h4>
              <p className="text-slate-400 text-sm mt-0.5">
                Vector semantic embeddings paired with BM25 lexical reranking for halluncination-free AI responses.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Vector search query..."
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-violet-500"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-violet-600 hover:bg-violet-500 text-white p-2 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
              >
                <Search className={`w-4 h-4 ${isSearching ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Vector Chunks Display */}
          <div className="space-y-3">
            {ragChunks.map((chunk, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 transition-all hover:border-violet-500/50"
              >
                <div className="flex items-center justify-between mb-1.5 font-mono text-[11px]">
                  <span className="text-violet-400 font-bold">{chunk.tag}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">COSINE SIMILARITY:</span>
                    <span className="text-emerald-400 font-bold">{chunk.score}</span>
                  </div>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed font-sans">{chunk.content}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Content: Tab 2 - Kiera Creative Vibe */
        <div className="relative rounded-xl p-6 bg-gradient-to-br from-pink-950/20 via-purple-950/20 to-amber-950/20 border border-pink-500/30 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40">
                  CREATIVE INTELLIGENCE
                </span>
                <span className="text-xs font-mono text-amber-300">KIERA CORE v2.4</span>
              </div>
              <h4 className="text-2xl font-bold text-white mt-1">Multi-Modal Creative Co-Pilot</h4>
              <p className="text-slate-300 text-sm mt-1 max-w-xl">
                Where engineering rigor meets organic aesthetic intuition. Kiera fuses generative language, design direction, dynamic sound generation, and emotional resonance.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-pink-300">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-black/40 border border-pink-500/20 p-4 rounded-xl">
              <div className="text-pink-400 font-bold flex items-center gap-1.5 mb-1">
                <Brain className="w-3.5 h-3.5" /> Conceptual Synthesis
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Transforms abstract product vision into concrete UX wireframes, architectural blueprints, and production specs.
              </p>
            </div>

            <div className="bg-black/40 border border-purple-500/20 p-4 rounded-xl">
              <div className="text-purple-400 font-bold flex items-center gap-1.5 mb-1">
                <Compass className="w-3.5 h-3.5" /> Expressive Tone Engine
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Dynamic temperature and top-p tuning based on domain context: strict mathematical logic vs evocative storytelling.
              </p>
            </div>

            <div className="bg-black/40 border border-amber-500/20 p-4 rounded-xl">
              <div className="text-amber-400 font-bold flex items-center gap-1.5 mb-1">
                <Cpu className="w-3.5 h-3.5" /> Multi-Agent Harmony
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Acts as the creative orchestrator harmonizing specialized analytical agents into unified human-grade delivery.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
