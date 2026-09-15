import React, { useState } from 'react';
import { Volume2, VolumeX, Radio } from 'lucide-react';
import { soundFX } from '../../utils/audio';

interface HUDHeaderProps {
  currentAct: number; // 1 to 6
  onNavigateToAct: (actIndex: number) => void;
}

export const HUDHeader: React.FC<HUDHeaderProps> = ({ currentAct, onNavigateToAct }) => {
  const [isMuted, setIsMuted] = useState<boolean>(soundFX.getIsMuted());

  const handleToggleSound = () => {
    const unmuted = soundFX.toggleMute();
    setIsMuted(!unmuted);
  };

  const acts = [
    { num: 1, label: "Awakening" },
    { num: 2, label: "Meets AI" },
    { num: 3, label: "Track Record" },
    { num: 4, label: "Systems" },
    { num: 5, label: "Mindset" },
    { num: 6, label: "Transformation" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between pointer-events-none">
      {/* Left: Brand / Telemetry */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="glass-panel px-3.5 py-1.5 rounded-xl border border-white/10 flex items-center gap-2.5">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </div>
          <span className="font-mono text-xs font-bold tracking-wider text-white">
            CHINMAY A
          </span>
          <span className="hidden sm:inline font-mono text-[10px] text-slate-500">
            // AI SYSTEMS ARCHITECT
          </span>
        </div>
      </div>

      {/* Center: Act Quick Navigation Dots */}
      <nav className="hidden md:flex items-center gap-1.5 glass-panel px-3 py-1.5 rounded-xl border border-white/10 pointer-events-auto font-mono text-xs">
        {acts.map((act) => {
          const isActive = currentAct === act.num;
          return (
            <button
              key={act.num}
              onClick={() => {
                soundFX.playNodePulse();
                onNavigateToAct(act.num);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                isActive
                  ? 'bg-violet-600/40 text-cyan-300 border border-violet-500/50 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-[10px] opacity-60 mr-1">0{act.num}</span>
              {act.label}
            </button>
          );
        })}
      </nav>

      {/* Right: Sound FX and Status */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        <div className="hidden lg:flex items-center gap-2 glass-panel px-3 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono text-emerald-400">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>SYS_60FPS</span>
        </div>

        <button
          onClick={handleToggleSound}
          className={`glass-panel p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono ${
            !isMuted
              ? 'border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20 bg-cyan-950/40'
              : 'border-white/10 text-slate-400 hover:text-white'
          }`}
          title={isMuted ? "Unmute Cybernetic Ambient Audio" : "Mute Audio"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          <span className="hidden sm:inline">{isMuted ? "Audio Off" : "Audio On"}</span>
        </button>
      </div>
    </header>
  );
};
