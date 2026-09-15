import { useState, useEffect } from 'react';
import { VoiceProvider, useVoice } from './components/voice/VoiceContext';
import { ZarboCanvas } from './components/3d/ZarboCanvas';
import { ZarboVoiceWidget } from './components/voice/ZarboVoiceWidget';
import { SystemNav } from './components/ui/SystemNav';

import { Section01Awakening } from './components/sections/Section01Awakening';
import { Section02Engineer } from './components/sections/Section02Engineer';
import { Section03VoiceAI } from './components/sections/Section03VoiceAI';
import { Section04Projects } from './components/sections/Section04Projects';
import { Section05IntelligenceLayer } from './components/sections/Section05IntelligenceLayer';
import { Section06LocalIntelligence } from './components/sections/Section06LocalIntelligence';
import { Section07Automation } from './components/sections/Section07Automation';
import { Section08Experience } from './components/sections/Section08Experience';
import { Section09Skills } from './components/sections/Section09Skills';
import { Section10EducationCerts } from './components/sections/Section10EducationCerts';
import { Section11Connection } from './components/sections/Section11Connection';

function PortfolioMain() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSectionId, setActiveSectionId] = useState<string>('awakening');
  const { zarboState, audioLevel, narrateSection } = useVoice();

  // Scroll tracking and section observation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Section intersection observer for clean section detection and Zarbo contextual narration
    const sectionIds = [
      'awakening',
      'engineer',
      'voice-ai',
      'projects',
      'intelligence-layer',
      'local-intelligence',
      'automation',
      'experience',
      'skills',
      'education',
      'connection'
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSectionId(id);
            narrateSection(id);
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [narrateSection]);

  // Anti-Copy, Anti-Scrape & Inspection Key Lock
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Prevent context menu (right click) to protect design and copy
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's'))
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fafafa] text-[#1d1d1f] selection:bg-amber-500/20 selection:text-amber-950">
      {/* 3D Background Zarbo Orb Centerpiece */}
      <ZarboCanvas
        scrollProgress={scrollProgress}
        activeSectionId={activeSectionId}
        state={zarboState}
        audioLevel={audioLevel}
      />

      {/* Subtle Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-slate-200/80 z-50">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-500 transition-all duration-75"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Top System Navigation */}
      <SystemNav activeSectionId={activeSectionId} onNavigate={scrollToSection} />

      {/* Main Narrative Container (11 Sections) */}
      <main className="relative z-10">
        <Section01Awakening onExplore={() => scrollToSection('engineer')} />
        <Section02Engineer />
        <Section03VoiceAI />
        <Section04Projects />
        <Section05IntelligenceLayer />
        <Section06LocalIntelligence />
        <Section07Automation />
        <Section08Experience />
        <Section09Skills />
        <Section10EducationCerts />
        <Section11Connection />
      </main>

      {/* Floating Zarbo Voice Assistant Hub */}
      <ZarboVoiceWidget />
    </div>
  );
}

export function App() {
  return (
    <VoiceProvider>
      <PortfolioMain />
    </VoiceProvider>
  );
}

export default App;
