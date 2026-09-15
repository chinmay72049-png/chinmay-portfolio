import React, { useState } from 'react';
import { MessageSquare, Volume2, VolumeX, Send, X, Radio, Sparkles } from 'lucide-react';
import { useVoice } from './VoiceContext';
import { ZarboLiveModal } from './ZarboLiveModal';
import { askGeminiLive } from '../../services/geminiLiveService';

export const ZarboVoiceWidget: React.FC = () => {
  const {
    soundEnabled,
    toggleSound,
    isWidgetOpen,
    setIsWidgetOpen
  } = useVoice();

  const [typedInput, setTypedInput] = useState('');
  const [isLiveOpen, setIsLiveOpen] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    "Who is Chinmay?",
    "What Voice AI has he built?",
    "Experience at PitchX AI",
    "Education & CGPA",
    "How can I contact him?"
  ];

  const handleAsk = async (question: string) => {
    if (!question.trim()) return;
    setTranscript(question);
    setIsLoading(true);
    setAnswer("Thinking with Gemini 3.1 Flash...");
    try {
      const reply = await askGeminiLive(question);
      setAnswer(reply);
      setIsLoading(false);
    } catch {
      setAnswer("Chinmay A is an AI/ML Engineer specializing in Generative AI, Voice AI, and automation at PitchX AI.");
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedInput.trim()) return;
    handleAsk(typedInput);
    setTypedInput('');
  };

  return (
    <>
      {/* Floating Zarbo System Pill (Bottom-Right) */}
      <aside aria-label="Zarbo Voice Assistant" className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {/* Persistent Sound Mute/Unmute */}
        <button
          onClick={toggleSound}
          className={`p-3 rounded-2xl glass-panel border transition-all shadow-lg cursor-pointer flex items-center gap-2 font-mono text-xs ${
            soundEnabled
              ? 'border-amber-500/50 text-amber-900 bg-amber-500/10 shadow-amber-500/10'
              : 'border-slate-900/10 text-slate-600 hover:text-slate-900'
          }`}
          title={soundEnabled ? "Mute Zarbo Voice" : "Enable Zarbo Voice"}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-amber-600 animate-pulse" />
              <span className="hidden sm:inline font-bold">VOICE ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline font-medium">VOICE OFF</span>
            </>
          )}
        </button>

        {/* Zarbo Trigger Button - Opens Gemini Live Phone Overlay */}
        <button
          onClick={() => setIsLiveOpen(true)}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl glass-panel-glow border transition-all cursor-pointer shadow-xl ${
            isLiveOpen
              ? 'border-amber-500 text-amber-900 shadow-amber-500/20'
              : 'border-amber-500/30 text-slate-900 hover:border-amber-500 hover:text-amber-900'
          }`}
          title="Open Zarbo Live Voice Assistant (Gemini 3.1 Flash)"
        >
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
          </div>

          <span className="font-mono text-xs font-bold tracking-wider">
            ZARBO LIVE
          </span>

          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-900 font-bold">
            GEMINI 3.1
          </span>
        </button>

        {/* Quick Drawer Button */}
        <button
          onClick={() => setIsWidgetOpen(!isWidgetOpen)}
          className="p-3 rounded-2xl glass-panel border border-slate-900/10 text-slate-600 hover:text-slate-900 transition-all shadow-md cursor-pointer"
          title="Open Text Assistant Drawer"
        >
          <MessageSquare className="w-4 h-4" />
        </button>
      </aside>

      {/* Full-Screen Gemini Live Modal Overlay */}
      <ZarboLiveModal isOpen={isLiveOpen} onClose={() => setIsLiveOpen(false)} />

      {/* Interactive Modal / Assistant Drawer */}
      {isWidgetOpen && (
        <div className="fixed inset-x-4 bottom-24 sm:inset-x-auto sm:right-6 sm:w-96 z-50 glass-panel-glow rounded-3xl border border-slate-900/10 p-5 shadow-2xl backdrop-blur-2xl text-left animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-4">
            <div className="flex items-center gap-2 font-mono text-xs">
              <Radio className="w-4 h-4 text-amber-600" />
              <span className="text-slate-900 font-bold">ZARBO ASSISTANT</span>
              <span className="text-[10px] text-slate-500 font-medium">GEMINI 3.1 FLASH</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setIsWidgetOpen(false);
                  setIsLiveOpen(true);
                }}
                className="text-[10px] font-mono px-2 py-1 rounded-lg bg-amber-500/20 text-amber-900 border border-amber-500/30 hover:bg-amber-500/30 transition-colors cursor-pointer font-bold"
              >
                GO LIVE
              </button>
              <button
                onClick={() => setIsWidgetOpen(false)}
                className="text-slate-500 hover:text-slate-900 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Assistant Conversation Area */}
          <div className="space-y-3 mb-4 max-h-56 overflow-y-auto font-mono text-xs">
            {transcript && (
              <div className="bg-cyan-50 p-3 rounded-xl border border-cyan-200 text-slate-800">
                <span className="text-cyan-700 font-bold block text-[10px] uppercase mb-1">YOU:</span>
                <p className="font-sans text-slate-800">{transcript}</p>
              </div>
            )}

            {answer ? (
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-slate-800">
                <span className="text-amber-700 font-bold block text-[10px] uppercase mb-1">ZARBO (GEMINI):</span>
                <p className="font-sans text-slate-800 leading-relaxed text-xs">{answer}</p>
              </div>
            ) : (
              <div className="text-slate-500 text-xs py-2 text-center font-sans">
                Ask anything about Chinmay's Voice AI projects, PitchX AI role, skills, or certifications.
              </div>
            )}
          </div>

          {/* Suggested Prompts */}
          <div className="mb-4">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" /> SUGGESTED QUERIES
            </div>
            <div className="flex flex-wrap gap-1.5">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(q)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-amber-500/50 hover:text-amber-900 transition-colors text-left cursor-pointer font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Typed Input Form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                placeholder="Ask Zarbo anything..."
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !typedInput.trim()}
              className="p-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-bold rounded-xl transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
