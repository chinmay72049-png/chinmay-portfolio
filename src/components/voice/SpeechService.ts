import { groundedKnowledge, FALLBACK_ANSWER, sectionNarrations } from '../../data/zarboKnowledge';

// Type definitions for Web Speech API
interface SpeechRecognitionEventLike {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: { new (): SpeechRecognitionLike };
    webkitSpeechRecognition?: { new (): SpeechRecognitionLike };
  }
}

export class SpeechService {
  private recognition: SpeechRecognitionLike | null = null;
  private isSpeaking = false;
  private isListening = false;
  private soundEnabled = false;
  private spokenSections: Set<string> = new Set();
  private audioLevelCallback: ((level: number) => void) | null = null;
  private animationFrameId: number | null = null;

  constructor() {
    this.initRecognition();
  }

  private initRecognition() {
    if (typeof window === 'undefined') return;

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
      } catch {
        this.recognition = null;
      }
    }
  }

  public setAudioLevelCallback(cb: (level: number) => void) {
    this.audioLevelCallback = cb;
  }

  public isRecognitionSupported(): boolean {
    return this.recognition !== null;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (!enabled) {
      this.stopSpeaking();
    }
  }

  public getSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  // Speak contextual section narration (strictly only once per section)
  public narrateSection(sectionId: string, onStart?: () => void, onEnd?: () => void) {
    if (!this.soundEnabled || this.spokenSections.has(sectionId)) return;

    const line = sectionNarrations[sectionId];
    if (!line) return;

    this.spokenSections.add(sectionId);
    this.speak(line, onStart, onEnd);
  }

  // Text-to-speech with audio wave displacement envelope
  public speak(text: string, onStart?: () => void, onEnd?: () => void) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      onEnd?.();
      return;
    }

    // Cancel current speech if any
    window.speechSynthesis.cancel();
    this.stopAudioLevelLoop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 0.95; // Slightly deeper, intelligent tone

    // Try finding a clean natural English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Daniel'))
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.startAudioLevelLoop();
      onStart?.();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.stopAudioLevelLoop();
      onEnd?.();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.stopAudioLevelLoop();
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.stopAudioLevelLoop();
  }

  // Synthesize realistic speech ripple envelope
  private startAudioLevelLoop() {
    let phase = 0;
    const update = () => {
      if (!this.isSpeaking) {
        this.audioLevelCallback?.(0);
        return;
      }
      phase += 0.18;
      // Speech envelope: syllable cadence with random micro-peaks
      const syllable = Math.sin(phase) * Math.cos(phase * 1.5);
      const level = Math.max(0, Math.min(1, Math.abs(syllable) * 0.75 + Math.random() * 0.25));
      this.audioLevelCallback?.(level);
      this.animationFrameId = requestAnimationFrame(update);
    };
    update();
  }

  private stopAudioLevelLoop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.audioLevelCallback?.(0);
  }

  // Start Speech Recognition
  public startListening(
    onResult: (transcript: string, answer: string) => void,
    onError: (err: string) => void,
    onEnd: () => void
  ) {
    if (!this.recognition) {
      onError("Speech recognition not supported in this browser.");
      return;
    }

    if (this.isListening) return;

    this.stopSpeaking();
    this.isListening = true;

    this.recognition.onresult = (event: SpeechRecognitionEventLike) => {
      const transcript = event.results[0][0].transcript;
      const answer = this.queryKnowledge(transcript);
      this.isListening = false;
      onResult(transcript, answer);
    };

    this.recognition.onerror = (e) => {
      this.isListening = false;
      onError(e.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd();
    };

    try {
      this.recognition.start();
    } catch {
      this.isListening = false;
      onError("Microphone error");
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // Resume-grounded question-answer matching
  public queryKnowledge(question: string): string {
    const q = question.toLowerCase().trim();

    for (const item of groundedKnowledge) {
      const match = item.keywords.some(kw => q.includes(kw));
      if (match) {
        return item.response;
      }
    }

    return FALLBACK_ANSWER;
  }
}

export const speechService = new SpeechService();
