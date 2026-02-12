
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import BootScreen from './components/BootScreen';
import Timeline from './components/Timeline';
import HeartEngine from './components/HeartEngine';
import FinalMessage from './components/FinalMessage';
import StarField from './components/StarField';
import EasterEgg from './components/EasterEgg';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'boot' | 'timeline' | 'engine' | 'final'>('boot');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [heartClicks, setHeartClicks] = useState(0);
  
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (heartClicks >= 3) {
      setShowEasterEgg(true);
      setHeartClicks(0);
    }
    const timer = setTimeout(() => setHeartClicks(0), 1000);
    return () => clearTimeout(timer);
  }, [heartClicks]);

  // Handle music pause/resume based on Easter Egg visibility
  useEffect(() => {
    if (!bgMusicRef.current) return;

    if (showEasterEgg) {
      bgMusicRef.current.pause();
    } else if (currentPage !== 'boot') {
      bgMusicRef.current.play().catch(e => console.log("Autoplay blocked or failed", e));
    }
  }, [showEasterEgg, currentPage]);

  const startGlobalMusic = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.play().catch(e => console.log("Music play failed", e));
    }
  };

  const handleHeartClick = () => {
    setHeartClicks(prev => prev + 1);
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-pink-500 selection:text-white overflow-x-hidden">
      <StarField />
      
      {/* Global Background Music */}
      <audio 
        ref={bgMusicRef}
        src="/media/audio/musicforallwebsite.mp3"
        loop
      />

      <AnimatePresence mode="wait">
        {currentPage === 'boot' && (
          <BootScreen onEnter={() => {
            setCurrentPage('timeline');
            startGlobalMusic();
          }} />
        )}
        {currentPage === 'timeline' && (
          <Timeline onComplete={() => setCurrentPage('engine')} />
        )}
        {currentPage === 'engine' && (
          <HeartEngine onComplete={() => setCurrentPage('final')} />
        )}
        {currentPage === 'final' && (
          <FinalMessage />
        )}
      </AnimatePresence>

      {/* Persistent Easter Egg Trigger */}
      <button 
        onClick={handleHeartClick}
        className="fixed bottom-6 right-6 z-50 p-2 opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-default"
      >
        <Heart size={16} className="text-pink-500/50" />
      </button>

      {/* Easter Egg Screen Overlay */}
      <AnimatePresence>
        {showEasterEgg && (
          <EasterEgg onClose={() => setShowEasterEgg(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
