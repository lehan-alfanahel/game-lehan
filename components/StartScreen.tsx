
import React from 'react';

interface StartScreenProps {
  onNext: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 sm:p-8 overflow-y-auto">
      <div className="mb-4 sm:mb-8 p-2 sm:p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
        <h2 className="text-xs sm:text-lg font-bold text-blue-400 uppercase tracking-widest">Kelas 5 SD Negeri 2 Sendang Ayu</h2>
      </div>
      
      <h1 className="text-4xl sm:text-7xl md:text-8xl font-black mb-4 leading-tight">
        BALAP <span className="text-yellow-400">PINTAR</span>
        <br />
        <span className="text-3xl sm:text-6xl text-blue-500">FAKTA VS OPINI</span>
      </h1>
      
      <p className="max-w-xl text-slate-300 text-sm sm:text-lg mb-8 sm:mb-12 px-4">
        Ayo uji kemampuanmu membedakan kenyataan dan pendapat! Jadilah yang tercepat mencapai garis finish di lintasan balap mobil.
      </p>

      <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
        <div className="flex flex-col items-center">
          <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">🏁</div>
          <span className="text-[8px] sm:text-xs font-bold text-slate-400 uppercase">Race Mode</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">👥</div>
          <span className="text-[8px] sm:text-xs font-bold text-slate-400 uppercase">2 Players</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">🧠</div>
          <span className="text-[8px] sm:text-xs font-bold text-slate-400 uppercase">Quiz Edu</span>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="group relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl font-black text-xl sm:text-3xl shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] transition-all hover:scale-105 active:scale-95"
      >
        <div className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        MULAI PETUALANGAN
      </button>
    </div>
  );
};

export default StartScreen;
