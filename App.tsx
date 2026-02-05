
import React, { useState, useCallback, useEffect } from 'react';
import { GameState, PlayerData, AVATARS, Question } from './types';
import { QUESTION_POOL } from './questions';
import { audioManager } from './utils/audio';

// Components
import StartScreen from './components/StartScreen';
import SetupForm from './components/SetupForm';
import RaceTrack from './components/RaceTrack';
import QuestionBox from './components/QuestionBox';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [player1, setPlayer1] = useState<PlayerData>({
    name: 'Tim Biru',
    avatar: '🏎️',
    score: 0,
    currentQuestionIndex: 0,
    questions: [],
    finished: false
  });
  const [player2, setPlayer2] = useState<PlayerData>({
    name: 'Tim Merah',
    avatar: '🚗',
    score: 0,
    currentQuestionIndex: 0,
    questions: [],
    finished: false
  });

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    setPlayer1(prev => ({ ...prev, questions: shuffleArray(QUESTION_POOL), score: 0, currentQuestionIndex: 0, finished: false }));
    setPlayer2(prev => ({ ...prev, questions: shuffleArray(QUESTION_POOL), score: 0, currentQuestionIndex: 0, finished: false }));
    setGameState(GameState.PLAYING);
  };

  const handleAnswer = (playerNum: 1 | 2, answerIndex: number) => {
    const player = playerNum === 1 ? player1 : player2;
    const setPlayer = playerNum === 1 ? setPlayer1 : setPlayer2;

    if (player.finished) return;

    const currentQuestion = player.questions[player.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.answer;

    if (isCorrect) {
      audioManager.playCorrect();
      audioManager.playMove();
      setPlayer(prev => {
        const nextIndex = prev.currentQuestionIndex + 1;
        const isFinished = nextIndex >= 20;
        return {
          ...prev,
          score: prev.score + 1,
          currentQuestionIndex: nextIndex,
          finished: isFinished
        };
      });
    } else {
      audioManager.playWrong();
      setPlayer(prev => {
        const nextIndex = prev.currentQuestionIndex + 1;
        const isFinished = nextIndex >= 20;
        return {
          ...prev,
          currentQuestionIndex: nextIndex,
          finished: isFinished
        };
      });
    }
  };

  useEffect(() => {
    if (player1.finished && player2.finished) {
      setGameState(GameState.FINISHED);
    }
  }, [player1.finished, player2.finished]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => console.error(e));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#050b18] text-white overflow-hidden font-sans flex flex-col">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-black pointer-events-none"></div>

      {gameState === GameState.START && (
        <StartScreen onNext={() => setGameState(GameState.SETUP)} />
      )}

      {gameState === GameState.SETUP && (
        <SetupForm 
          p1={player1} 
          p2={player2} 
          setP1={setPlayer1} 
          setP2={setPlayer2} 
          onStart={startGame} 
        />
      )}

      {gameState === GameState.PLAYING && (
        <div className="flex flex-col h-full w-full overflow-hidden">
          {/* Race Track Area - Scaled for different heights */}
          <div className="flex-grow min-h-[30%] max-h-[45%] relative w-full overflow-hidden">
            <RaceTrack p1={player1} p2={player2} />
          </div>

          {/* Question Areas - Side by side for 2 players */}
          <div className="h-[55%] flex w-full px-2 sm:px-4 gap-2 sm:gap-4 pb-4">
            <div className="w-1/2 h-full">
              <QuestionBox 
                player={player1} 
                onAnswer={(idx) => handleAnswer(1, idx)} 
                playerNum={1}
              />
            </div>
            <div className="w-1/2 h-full">
              <QuestionBox 
                player={player2} 
                onAnswer={(idx) => handleAnswer(2, idx)} 
                playerNum={2}
              />
            </div>
          </div>
        </div>
      )}

      {gameState === GameState.FINISHED && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4 sm:p-8">
          <h2 className="text-3xl sm:text-5xl font-black mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 animate-bounce">
            BALAPAN SELESAI!
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-12 w-full max-w-4xl">
            <div className="bg-slate-800/50 p-4 sm:p-8 rounded-3xl border-2 border-blue-500 flex flex-col items-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <div className="text-5xl sm:text-8xl mb-4">{player1.avatar}</div>
              <div className="text-xl sm:text-2xl font-bold text-center truncate w-full">{player1.name}</div>
              <div className="text-4xl sm:text-6xl font-black text-blue-400 mt-2 sm:mt-4">{player1.score}</div>
              <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mt-1 sm:mt-2">Poin Benar</div>
            </div>
            <div className="bg-slate-800/50 p-4 sm:p-8 rounded-3xl border-2 border-red-500 flex flex-col items-center shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="text-5xl sm:text-8xl mb-4">{player2.avatar}</div>
              <div className="text-xl sm:text-2xl font-bold text-center truncate w-full">{player2.name}</div>
              <div className="text-4xl sm:text-6xl font-black text-red-400 mt-2 sm:mt-4">{player2.score}</div>
              <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mt-1 sm:mt-2">Poin Benar</div>
            </div>
          </div>
          <button 
            onClick={() => setGameState(GameState.START)}
            className="mt-10 sm:mt-16 px-8 sm:px-12 py-3 sm:py-4 bg-white text-black font-black rounded-full text-xl sm:text-2xl hover:scale-105 active:scale-95 transition-transform shadow-xl"
          >
            MAIN LAGI
          </button>
        </div>
      )}

      {/* Floating UI Elements */}
      <button 
        onClick={toggleFullScreen}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-[100] bg-white/10 hover:bg-white/20 p-2 rounded-lg text-[10px] sm:text-xs font-bold transition-colors backdrop-blur-md"
      >
        FULLSCREEN
      </button>
    </div>
  );
};

export default App;
