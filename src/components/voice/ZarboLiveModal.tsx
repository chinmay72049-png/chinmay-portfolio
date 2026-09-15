import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Send, Sparkles, Radio } from 'lucide-react';
import { askGeminiLive, type ChatMessage } from '../../services/geminiLiveService';

interface ZarboLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZarboLiveModal: React.FC<ZarboLiveModalProps> = ({ isOpen, onClose }) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('Zarbo is ready');
  const [userTranscript, setUserTranscript] = useState<string>('');
  const [latestResponse, setLatestResponse] = useState<string>(
    "Hey! I'm Zarbo, Chinmay's AI friend and companion. What would you like to know about his AI engineering, voice calling agents, or projects?"
  );
  const [typedInput, setTypedInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        const rec = new SpeechRec();
        rec.continuous = false;
        rec.interimResults = true;
        rec.lang = 'en-US';

        rec.onstart = () => {
          setIsListening(true);
          setStatusText('Listening to your voice...');
        };

        rec.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((r: any) => r[0].transcript)
            .join('');
          setUserTranscript(transcript);

          if (event.results[0].isFinal) {
            handleUserMessage(transcript);
          }
        };

        rec.onerror = (e: any) => {
          console.warn('Speech error:', e.error);
          setIsListening(false);
          setStatusText('Ready • Click mic to speak or type below');
        };

        rec.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = rec;
      } catch (e) {
        console.warn('Recognition init failed:', e);
      }
    }
  }, []);

  // When modal opens, speak initial greeting
  useEffect(() => {
    if (isOpen) {
      speakResponse(
        "Hey! I'm Zarbo, Chinmay's AI companion. Ask me anything about his real-world AI projects, voice calling agents, or skills!"
      );
    } else {
      stopAllAudio();
    }
    return () => {
      stopAllAudio();
    };
  }, [isOpen]);

  const stopAllAudio = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    setIsSpeaking(false);
    setIsListening(false);
    setIsThinking(false);
  };

  const startListening = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setUserTranscript('');

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch {
        // Restart if already started
        recognitionRef.current.stop();
        setTimeout(() => recognitionRef.current.start(), 100);
      }
    } else {
      setStatusText('Microphone unavailable in this browser. Please type below.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // Process message through Gemini 3.1 Flash Live
  const handleUserMessage = async (msgText: string) => {
    if (!msgText.trim()) return;

    setUserTranscript(msgText);
    setIsListening(false);
    setIsThinking(true);
    setStatusText('Zarbo is thinking with Gemini 3.1 Flash...');

    try {
      const reply = await askGeminiLive(msgText, chatHistory);

      setLatestResponse(reply);
      setIsThinking(false);

      // Update chat history for conversation continuity
      setChatHistory(prev => [
        ...prev,
        { role: 'user', parts: [{ text: msgText }] },
        { role: 'model', parts: [{ text: reply }] }
      ]);

      speakResponse(reply);
    } catch (err) {
      setIsThinking(false);
      setStatusText('Ready');
      speakResponse("I had trouble reaching the cloud, but I'm here to tell you about Chinmay's projects and skills!");
    }
  };

  // Speak response and animate audio wave
  const speakResponse = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setStatusText('Ready');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const friendlyVoice = voices.find(
      v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))
    );
    if (friendlyVoice) utterance.voice = friendlyVoice;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setStatusText('Zarbo is speaking...');
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setStatusText('Listening or waiting for question...');
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setStatusText('Ready');
    };

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Canvas Animation: Wavy Circle Orb (Directly inspired by reference image 1527.jpg)
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) * 0.28;

      ctx.clearRect(0, 0, width, height);

      // Calculate audio pulse factor
      const pulse = isSpeaking ? 0.35 + Math.sin(phase * 4) * 0.15 + (Math.random() * 0.1) : isListening ? 0.2 + Math.sin(phase * 6) * 0.08 : 0.05;

      // Draw undulating concentric wavy rings
      const ringCount = 28;
      const pointsPerRing = 140;

      for (let r = 0; r < ringCount; r++) {
        const ringProgress = r / ringCount;
        const currentRadius = baseRadius * (0.45 + ringProgress * 0.75);

        // Color gradient matching reference: amber/gold rim to cool cyan/white crown
        const alpha = Math.max(0.12, 1 - Math.abs(ringProgress - 0.5) * 1.5) * (isSpeaking ? 0.9 : 0.6);
        ctx.strokeStyle = ringProgress > 0.6
          ? `rgba(245, 158, 11, ${alpha})` // Warm amber rim
          : `rgba(56, 189, 248, ${alpha})`; // Cool cyan crown
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        for (let p = 0; p <= pointsPerRing; p++) {
          const angle = (p / pointsPerRing) * Math.PI * 2;

          // Undulating waves (matching 1527.jpg)
          const wave =
            Math.sin(angle * 5 + phase + r * 0.3) * (8 + pulse * 25) +
            Math.cos(angle * 3 - phase * 0.8) * 6;

          const rad = currentRadius + wave;
          const x = centerX + Math.cos(angle) * rad;
          const y = centerY + Math.sin(angle) * rad;

          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Draw subtle core particle dust
      for (let i = 0; i < 40; i++) {
        const dotAngle = (i / 40) * Math.PI * 2 + phase * 0.2;
        const dotRadius = baseRadius * 0.25 + Math.sin(dotAngle * 3 + phase) * 15;
        const dx = centerX + Math.cos(dotAngle) * dotRadius;
        const dy = centerY + Math.sin(dotAngle) * dotRadius;

        ctx.fillStyle = isSpeaking ? '#fef08a' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(dx, dy, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      phase += isSpeaking ? 0.05 : isListening ? 0.07 : 0.02;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isOpen, isSpeaking, isListening]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Zarbo Live AI Conversation"
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-6 bg-slate-950/85 backdrop-blur-3xl animate-in fade-in duration-300 text-white"
    >
      {/* Top Header: Status & Close */}
      <div className="w-full max-w-4xl flex items-center justify-between z-10 pt-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-wider text-slate-200">
              ZARBO LIVE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              GEMINI 3.1 FLASH
            </span>
          </div>

          <span className="hidden sm:inline font-mono text-xs text-slate-400 flex items-center gap-1.5">
            {isThinking && <span className="animate-spin text-amber-400">⚡</span>}
            {statusText}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg"
          title="Exit Zarbo Live"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Centerpiece: The Wavy Lines Orb & Active Conversation Bubble */}
      <div className="relative w-full max-w-2xl flex-1 flex flex-col items-center justify-center my-auto text-center px-4">
        {/* The Wavy Animated Circle Canvas */}
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="w-full h-full filter drop-shadow-[0_0_40px_rgba(245,158,11,0.25)]"
          />

          {/* Central Pulsing Heart */}
          <div
            className={`absolute w-12 h-12 rounded-full pointer-events-none transition-all duration-300 ${
              isSpeaking
                ? 'bg-amber-400/40 blur-md scale-125'
                : isListening
                ? 'bg-cyan-400/40 blur-md scale-110'
                : 'bg-white/10 blur-sm scale-90'
            }`}
          />
        </div>

        {/* Live Subtitle Transcript & Response Box */}
        <div className="w-full max-w-xl mt-4 space-y-2">
          {userTranscript && (
            <div className="text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-4 py-2 rounded-xl inline-block max-w-md">
              <span className="text-cyan-400 font-bold mr-1.5">You:</span> {userTranscript}
            </div>
          )}

          <div className="bg-slate-900/80 border border-white/10 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-2xl text-slate-100 text-sm sm:text-base font-light leading-relaxed">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-amber-400 font-bold uppercase mb-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Zarbo Live (Grounded in Chinmay's Resume)</span>
            </div>
            {latestResponse}
          </div>
        </div>
      </div>

      {/* Bottom Controls: Suggestion Chips, Mic, & Typed Input */}
      <div className="w-full max-w-2xl space-y-3 z-10 pb-4">
        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "Who is Chinmay?",
            "What Voice AI has he built?",
            "What did he do at PitchX AI?",
            "How can I contact him?"
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleUserMessage(prompt)}
              className="text-xs font-sans px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-amber-500/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Action Bar: Mic Toggle & Typed Query */}
        <div className="flex items-center gap-2 sm:gap-3 bg-slate-900/90 border border-white/15 p-2 rounded-3xl backdrop-blur-2xl shadow-2xl">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-3.5 rounded-2xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
              isListening
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 animate-pulse'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-lg shadow-amber-500/20'
            }`}
            title={isListening ? "Stop listening" : "Speak to Zarbo"}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={typedInput}
            onChange={(e) => setTypedInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUserMessage(typedInput);
                setTypedInput('');
              }
            }}
            placeholder="Ask Zarbo anything about Chinmay's background..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-500 px-2 font-sans"
          />

          <button
            onClick={() => {
              handleUserMessage(typedInput);
              setTypedInput('');
            }}
            disabled={!typedInput.trim()}
            className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white rounded-2xl transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
