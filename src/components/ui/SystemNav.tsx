import React from 'react';
import { Radio } from 'lucide-react';
import { useVoice } from '../voice/VoiceContext';

interface SystemNavProps {
  activeSectionId: string;
  onNavigate: (sectionId: string) => void;
}

export const SystemNav: React.FC<SystemNavProps> = ({ activeSectionId, onNavigate }) => {
  const { zarboState } = useVoice();

  const navItems = [
    { id: 'awakening', label: 'Awakening', code: '01' },
    { id: 'engineer', label: 'Engineer', code: '02' },
    { id: 'voice-ai', label: 'Voice AI', code: '03' },
    { id: 'projects', label: 'Projects', code: '04' },
    { id: 'intelligence-layer', label: 'Intelligence', code: '05' },
    { id: 'local-intelligence', label: 'Local GPU', code: '06' },
    { id: 'automation', label: 'Automation', code: '07' },
    { id: 'experience', label: 'Experience', code: '08' },
    { id: 'skills', label: 'Skills', code: '09' },
    { id: 'education', label: 'Education', code: '10' },
    { id: 'connection', label: 'Connection', code: '11' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between pointer-events-none">
      {/* Brand Watermark */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={() => onNavigate('awakening')}
          className="glass-panel px-3.5 py-1.5 rounded-xl border border-slate-900/10 flex items-center gap-2 cursor-pointer text-left hover:border-amber-500/40 transition-colors"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </div>
          <span className="font-mono text-xs font-bold tracking-wider text-slate-900">
            CHINMAY A
          </span>
          <span className="hidden sm:inline font-mono text-[10px] text-slate-500">
            // AI/ML ENGINEER
          </span>
        </button>
      </div>

      {/* Center Nav Link Indicators */}
      <nav className="hidden xl:flex items-center gap-1 glass-panel px-3 py-1.5 rounded-xl border border-slate-900/10 pointer-events-auto font-mono text-[11px]">
        {navItems.map((item) => {
          const isActive = activeSectionId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500/15 text-amber-900 border border-amber-500/40 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="text-[9px] opacity-60 mr-1">{item.code}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right Telemetry Chip */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <div className="glass-panel px-3 py-1.5 rounded-xl border border-slate-900/10 flex items-center gap-2 font-mono text-[11px] text-slate-600">
          <Radio className="w-3 h-3 text-amber-500 animate-pulse" />
          <span className="text-slate-800 font-bold">ZARBO:</span>
          <span className="text-amber-600 font-semibold">{zarboState}</span>
        </div>
      </div>
    </header>
  );
};
