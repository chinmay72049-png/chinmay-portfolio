import React from 'react';
import { Database, Brain } from 'lucide-react';

export const Section05IntelligenceLayer: React.FC = () => {
  const modelLayers = [
    {
      stage: "STAGE 01",
      name: "Input & Context Tokenizer",
      type: "Context Engineering",
      desc: "Raw customer query tokenization, system instructions injection, dynamic few-shot exemplars, and token budget pruning."
    },
    {
      stage: "STAGE 02",
      name: "Semantic Vector RAG Space",
      type: "ChromaDB & Hugging Face",
      desc: "Cosine similarity search across high-density vector embeddings, BM25 keyword reranking, and chunk relevance scoring."
    },
    {
      stage: "STAGE 03",
      name: "Reasoning & Inference Engine",
      type: "LLM / Open-Source Models",
      desc: "Multi-step reasoning chain with constrained decoding and structured JSON schema output enforcement."
    },
    {
      stage: "STAGE 04",
      name: "Safety & Output Validation",
      type: "Deterministic Guards",
      desc: "Strict post-processing validation, hallucination detection, schema conformance verification, and downstream dispatch."
    }
  ];

  return (
    <section id="intelligence-layer" className="min-h-screen flex flex-col justify-center items-center px-4 py-24 relative z-10">
      <div className="max-w-6xl w-full mx-auto text-left">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-indigo-900 uppercase bg-indigo-500/10 px-3 py-1 rounded-md border border-indigo-500/30 mb-3">
            <Brain className="w-3.5 h-3.5 text-indigo-600" />
            <span>05 INTELLIGENCE LAYER // MODEL ARCHITECTURES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
            Grounded <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-600 to-amber-600">Generative Reasoning</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 font-normal leading-relaxed">
            Eliminating model hallucinations through hybrid retrieval architectures, strict context engineering, and deterministic output boundaries.
          </p>
        </div>

        {/* Model Architecture Flow Cards */}
        <div className="space-y-4">
          {modelLayers.map((layer, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-slate-900/10 hover:border-indigo-500/40 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200/80 text-indigo-700 shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-indigo-700 mb-1 font-semibold">
                    <span>{layer.stage}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 font-normal">{layer.type}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">{layer.name}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl font-normal leading-relaxed">
                    {layer.desc}
                  </p>
                </div>
              </div>

              <div className="font-mono text-[11px] text-slate-500 shrink-0 md:text-right">
                <span>STAGE INTEGRITY: </span>
                <strong className="text-emerald-700">VERIFIED</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 font-mono text-xs">
          <div className="bg-white/80 border border-slate-200/80 p-4 rounded-xl shadow-xs">
            <div className="text-slate-500 text-[10px]">EMBEDDING ENGINE</div>
            <div className="text-slate-900 font-bold mt-1">Hugging Face Transformers</div>
          </div>
          <div className="bg-white/80 border border-slate-200/80 p-4 rounded-xl shadow-xs">
            <div className="text-slate-500 text-[10px]">VECTOR INDEXING</div>
            <div className="text-slate-900 font-bold mt-1">ChromaDB Semantic Storage</div>
          </div>
          <div className="bg-white/80 border border-slate-200/80 p-4 rounded-xl shadow-xs">
            <div className="text-slate-500 text-[10px]">OUTPUT GUARANTEE</div>
            <div className="text-emerald-700 font-bold mt-1">Pydantic / Zod Structured</div>
          </div>
        </div>
      </div>
    </section>
  );
};
