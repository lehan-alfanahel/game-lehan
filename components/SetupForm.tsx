
import React from 'react';
import { PlayerData, AVATARS } from '../types';

interface SetupFormProps {
  p1: PlayerData;
  p2: PlayerData;
  setP1: React.Dispatch<React.SetStateAction<PlayerData>>;
  setP2: React.Dispatch<React.SetStateAction<PlayerData>>;
  onStart: () => void;
}

const SetupForm: React.FC<SetupFormProps> = ({ p1, p2, setP1, setP2, onStart }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 space-y-6 sm:space-y-12 overflow-y-auto pt-10 sm:pt-6">
      <h2 className="text-2xl sm:text-4xl font-black text-white/90">SIAPKAN PEMAIN</h2>
      
      <div className="flex flex-col md:flex-row w-full max-w-5xl gap-4 sm:gap-8">
        {/* Player 1 Setup - Tim Biru */}
        <div className="flex-1 bg-slate-800/50 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-base sm:text-xl text-white">1</div>
            <h3 className="text-lg sm:text-2xl font-bold text-blue-400">Tim Biru</h3>
          </div>
          
          <input 
            type="text" 
            value={p1.name}
            onChange={(e) => setP1(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Nama Pemain 1"
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-lg mb-4 sm:mb-6 focus:outline-none focus:border-blue-500 transition-colors text-white"
          />
          
          <label className="block text-slate-400 text-[10px] sm:text-sm font-bold uppercase mb-2 sm:mb-4">Pilih Mobil:</label>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {AVATARS.map(a => (
              <button
                key={a}
                onClick={() => setP1(prev => ({ ...prev, avatar: a }))}
                className={`text-xl sm:text-3xl p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all ${p1.avatar === a ? 'border-blue-500 bg-blue-500/20 scale-110' : 'border-transparent bg-slate-900/50 hover:bg-slate-700'}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Player 2 Setup - Tim Merah */}
        <div className="flex-1 bg-slate-800/50 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center font-bold text-base sm:text-xl text-white">2</div>
            <h3 className="text-lg sm:text-2xl font-bold text-red-400">Tim Merah</h3>
          </div>
          
          <input 
            type="text" 
            value={p2.name}
            onChange={(e) => setP2(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Nama Pemain 2"
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-lg mb-4 sm:mb-6 focus:outline-none focus:border-red-500 transition-colors text-white"
          />
          
          <label className="block text-slate-400 text-[10px] sm:text-sm font-bold uppercase mb-2 sm:mb-4">Pilih Mobil:</label>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {AVATARS.map(a => (
              <button
                key={a}
                onClick={() => setP2(prev => ({ ...prev, avatar: a }))}
                className={`text-xl sm:text-3xl p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all ${p2.avatar === a ? 'border-red-500 bg-red-500/20 scale-110' : 'border-transparent bg-slate-900/50 hover:bg-slate-700'}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={onStart}
        className="px-8 sm:px-16 py-3 sm:py-5 bg-yellow-500 text-black font-black text-lg sm:text-2xl rounded-full shadow-[0_10px_30px_rgba(234,179,8,0.3)] hover:scale-105 active:scale-95 transition-all mb-4"
      >
        BALAP SEKARANG!
      </button>
    </div>
  );
};

export default SetupForm;
