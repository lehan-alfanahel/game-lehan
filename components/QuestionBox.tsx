
import React, { useState, useEffect } from 'react';
import { PlayerData } from '../types';

interface QuestionBoxProps {
  player: PlayerData;
  onAnswer: (idx: number) => void;
  playerNum: 1 | 2;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ player, onAnswer, playerNum }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [player.currentQuestionIndex]);

  if (player.finished) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-green-500/10 rounded-2xl sm:rounded-3xl border-2 border-green-500/40 p-4 sm:p-6 animate-pulse">
        <div className="text-3xl sm:text-5xl mb-2 sm:mb-4">🏁</div>
        <h3 className="text-lg sm:text-3xl font-black text-green-400">FINISH!</h3>
        <p className="text-[10px] sm:text-sm text-slate-400 font-bold uppercase tracking-widest mt-1 sm:mt-2 text-center">Menunggu lawan...</p>
      </div>
    );
  }

  const currentQ = player.questions[player.currentQuestionIndex];
  if (!currentQ) return null;

  const accentColor = playerNum === 1 ? 'blue' : 'red';
  const borderClass = playerNum === 1 ? 'border-blue-500/40' : 'border-red-500/40';
  const bgGradient = playerNum === 1 
    ? 'from-blue-600 to-blue-800' 
    : 'from-red-600 to-red-800';
  const labelColorClass = playerNum === 1 ? 'text-blue-400' : 'text-red-400';
  const dotColorClass = playerNum === 1 ? 'bg-blue-500' : 'bg-red-500';

  return (
    <div className={`h-full flex flex-col bg-slate-900/60 backdrop-blur-sm rounded-xl sm:rounded-[2.5rem] border-2 ${borderClass} p-3 sm:p-8 transition-all duration-300 shadow-xl overflow-hidden ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
      <div className="flex justify-between items-center mb-2 sm:mb-6">
        <span className={`text-[8px] sm:text-sm font-black uppercase tracking-widest ${labelColorClass}`}>
          S{player.currentQuestionIndex + 1}/20
        </span>
        <div className="flex gap-0.5 sm:gap-1.5 overflow-hidden">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i} 
                    className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full transition-all duration-500 flex-shrink-0 ${i < player.currentQuestionIndex ? dotColorClass : 'bg-slate-800'}`}
                />
            ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="mb-2 sm:mb-8 p-2 sm:p-6 bg-white/5 rounded-lg sm:rounded-3xl w-full border border-white/5 shadow-inner min-h-[60px] sm:min-h-[140px] flex items-center justify-center overflow-y-auto">
            <h4 className="text-xs sm:text-2xl md:text-3xl font-bold text-white leading-tight px-1">
            "{currentQ.text}"
            </h4>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-6">
        {currentQ.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(idx)}
            className={`
              relative group py-3 sm:py-8 rounded-lg sm:rounded-[1.5rem] font-black text-base sm:text-3xl transition-all active:scale-90 overflow-hidden
              bg-gradient-to-br ${bgGradient} 
              shadow-[0_5px_10px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)]
              hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]
              hover:-translate-y-1
              text-white
            `}
          >
            {/* Glossy Overlay */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 pointer-events-none rounded-t-lg sm:rounded-t-[1.5rem]"></div>
            
            <span className="relative z-10 tracking-wider text-xs sm:text-3xl">{opt.toUpperCase()}</span>

            {/* Shine animation on hover */}
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 transition-all duration-1000 group-hover:left-full"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionBox;
