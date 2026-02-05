
import React from 'react';
import { PlayerData } from '../types';

interface RaceTrackProps {
  p1: PlayerData;
  p2: PlayerData;
}

const RaceTrack: React.FC<RaceTrackProps> = ({ p1, p2 }) => {
  const TOTAL_QUESTIONS = 20;

  const getPosition = (score: number) => {
    // Mobil maju dari kiri (0%) ke kanan (100%)
    // Gunakan margin yang lebih aman untuk mobile
    return (score / TOTAL_QUESTIONS) * 80; 
  };

  return (
    <div className="relative w-full h-full bg-[#050b18] overflow-hidden flex flex-col justify-center px-4 sm:px-8">
      {/* Cyber Grid Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1e293b 1px, transparent 1px),
            linear-gradient(to bottom, #1e293b 1px, transparent 1px)
          `,
          backgroundSize: 'clamp(40px, 10vw, 80px) clamp(40px, 10vw, 80px)'
        }}
      ></div>

      {/* Track Lane 1 - Tim Biru */}
      <div className="relative h-16 sm:h-28 w-full flex items-center mb-4 sm:mb-8">
        <div className="absolute inset-0 bg-blue-900/10 border border-blue-500/30 rounded-l-full rounded-r-lg shadow-[0_0_20px_rgba(59,130,246,0.1)]"></div>
        {/* Glow Line Center */}
        <div className="absolute left-0 right-0 h-0.5 bg-blue-500/20 blur-[1px]"></div>
        
        {/* Finish Line Indicator */}
        <div className="absolute right-0 top-0 bottom-0 w-1 sm:w-2 bg-gradient-to-b from-blue-500/50 via-white/20 to-blue-500/50"></div>

        {/* Player 1 Icon */}
        <div 
          className="absolute transition-all duration-1000 ease-in-out"
          style={{ left: `${getPosition(p1.score)}%`, zIndex: 10 }}
        >
          <div className="relative flex flex-col items-center">
            {/* Speed Glow */}
            <div className="absolute inset-0 bg-blue-500/40 blur-xl sm:blur-2xl rounded-full animate-pulse scale-150"></div>
            
            <div className="animate-bounce">
              <div className="relative text-3xl sm:text-7xl drop-shadow-[0_0_15px_rgba(59,130,246,1)]" style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>
                {p1.avatar}
              </div>
            </div>
            
            {/* Name Tag */}
            <div className="absolute -top-6 sm:-top-12 bg-blue-600/90 border border-blue-400 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded text-[7px] sm:text-[12px] font-black uppercase tracking-tighter whitespace-nowrap shadow-[0_0_15px_rgba(59,130,246,0.5)]">
               {p1.name} {p1.score}
            </div>
          </div>
        </div>
      </div>

      {/* Track Lane 2 - Tim Merah */}
      <div className="relative h-16 sm:h-28 w-full flex items-center">
        <div className="absolute inset-0 bg-red-900/10 border border-red-500/30 rounded-l-full rounded-r-lg shadow-[0_0_20px_rgba(239,68,68,0.1)]"></div>
        {/* Glow Line Center */}
        <div className="absolute left-0 right-0 h-0.5 bg-red-500/20 blur-[1px]"></div>
        
        {/* Finish Line Indicator */}
        <div className="absolute right-0 top-0 bottom-0 w-1 sm:w-2 bg-gradient-to-b from-red-500/50 via-white/20 to-red-500/50"></div>

        {/* Player 2 Icon */}
        <div 
          className="absolute transition-all duration-1000 ease-in-out"
          style={{ left: `${getPosition(p2.score)}%`, zIndex: 10 }}
        >
          <div className="relative flex flex-col items-center">
            {/* Speed Glow */}
            <div className="absolute inset-0 bg-red-500/40 blur-xl sm:blur-2xl rounded-full animate-pulse scale-150"></div>
            
            <div className="animate-bounce">
              <div className="relative text-3xl sm:text-7xl drop-shadow-[0_0_15px_rgba(239,68,68,1)]" style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>
                {p2.avatar}
              </div>
            </div>

            {/* Name Tag */}
            <div className="absolute -top-6 sm:-top-12 bg-red-600/90 border border-red-400 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded text-[7px] sm:text-[12px] font-black uppercase tracking-tighter whitespace-nowrap shadow-[0_0_15px_rgba(239,68,68,0.5)]">
               {p2.name} {p2.score}
            </div>
          </div>
        </div>
      </div>

      {/* Finish Label */}
      <div className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 rotate-90 text-[6px] sm:text-[10px] font-bold text-white/20 tracking-[0.5em] sm:tracking-[1em] uppercase whitespace-nowrap">
        FINISH
      </div>
    </div>
  );
};

export default RaceTrack;
