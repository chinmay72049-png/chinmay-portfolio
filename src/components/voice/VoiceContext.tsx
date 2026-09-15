import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { speechService } from './SpeechService';
import type { ZarboState } from '../3d/ZarboCanvas';

interface VoiceContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  zarboState: ZarboState;
  audioLevel: number;
  currentTranscript: string;
  currentAnswer: string;
  isWidgetOpen: boolean;
  setIsWidgetOpen: (open: boolean) => void;
  askZarbo: (question: string) => void;
  startVoiceQuery: () => void;
  narrateSection: (sectionId: string) => void;
  isRecognitionAvailable: boolean;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [zarboState, setZarboState] = useState<ZarboState>('IDLE');
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [currentTranscript, setCurrentTranscript] = useState<string>('');
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);
  const [isRecognitionAvailable, setIsRecognitionAvailable] = useState<boolean>(false);

  useEffect(() => {
    setIsRecognitionAvailable(speechService.isRecognitionSupported());
    speechService.setAudioLevelCallback((level) => {
      setAudioLevel(level);
    });
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    speechService.setSoundEnabled(next);
    if (next) {
      speechService.speak(
        "Zarbo voice core online. Ask anything grounded in Chinmay's background.",
        () => setZarboState('RESPONDING'),
        () => setZarboState('IDLE')
      );
    }
  };

  const narrateSection = (sectionId: string) => {
    if (!soundEnabled) return;
    speechService.narrateSection(
      sectionId,
      () => setZarboState('RESPONDING'),
      () => setZarboState('IDLE')
    );
  };

  const askZarbo = (question: string) => {
    if (!question.trim()) return;

    setCurrentTranscript(question);
    setZarboState('PROCESSING');

    setTimeout(() => {
      const answer = speechService.queryKnowledge(question);
      setCurrentAnswer(answer);

      if (soundEnabled) {
        setZarboState('RESPONDING');
        speechService.speak(
          answer,
          () => setZarboState('RESPONDING'),
          () => setZarboState('IDLE')
        );
      } else {
        setZarboState('IDLE');
      }
    }, 450);
  };

  const startVoiceQuery = () => {
    setIsWidgetOpen(true);
    setZarboState('LISTENING');
    setCurrentTranscript("Listening for your voice...");
    setCurrentAnswer("");

    speechService.startListening(
      (transcript, answer) => {
        setCurrentTranscript(transcript);
        setCurrentAnswer(answer);
        if (soundEnabled) {
          setZarboState('RESPONDING');
          speechService.speak(
            answer,
            () => setZarboState('RESPONDING'),
            () => setZarboState('IDLE')
          );
        } else {
          setZarboState('IDLE');
        }
      },
      (error) => {
        setCurrentTranscript(`Microphone error: ${error}`);
        setZarboState('IDLE');
      },
      () => {
        if (zarboState === 'LISTENING') {
          setZarboState('IDLE');
        }
      }
    );
  };

  return (
    <VoiceContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        zarboState,
        audioLevel,
        currentTranscript,
        currentAnswer,
        isWidgetOpen,
        setIsWidgetOpen,
        askZarbo,
        startVoiceQuery,
        narrateSection,
        isRecognitionAvailable
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};
