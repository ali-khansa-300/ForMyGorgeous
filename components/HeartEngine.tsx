
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeartEngineProps {
  onComplete: () => void;
}

const HeartEngine: React.FC<HeartEngineProps> = ({ onComplete }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isStarted) {
      const timers = [
        setTimeout(() => setStep(1), 1500),
        setTimeout(() => setStep(2), 3500),
        setTimeout(() => setStep(3), 5500),
        setTimeout(() => setStep(4), 8000),
      ];
      return () => timers.forEach(t => clearTimeout(t));
    }
  }, [isStarted]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 space-y-16 relative overflow-hidden"
    >
      <h2 className="text-pink-500 font-bold tracking-[0.4em] text-sm uppercase opacity-60">
        HEART ENGINE
      </h2>

      {/* Core Engine Visual */}
      <div className="relative flex items-center justify-center">
        {/* Pulsating Core */}
        <motion.div
          animate={{
            scale: isStarted ? [1, 1.2, 1] : [1, 1.05, 1],
            boxShadow: isStarted 
              ? [
                  "0 0 40px rgba(236,72,153,0.6)",
                  "0 0 80px rgba(236,72,153,0.9)",
                  "0 0 40px rgba(236,72,153,0.6)"
                ] 
              : "0 0 20px rgba(236,72,153,0.3)",
          }}
          transition={{
            duration: isStarted ? 0.6 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-32 h-32 md:w-48 md:h-48 bg-pink-500 rounded-full z-10"
        />

        {/* Emitted Rings */}
        <AnimatePresence>
          {isStarted && [1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeOut"
              }}
              className="absolute w-32 h-32 md:w-48 md:h-48 border border-pink-500/50 rounded-full pointer-events-none"
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Status Messages */}
      <div className="h-32 flex flex-col items-center justify-start space-y-4 rtl text-center">
        <AnimatePresence mode="popLayout">
          {step >= 1 && (
            <motion.p
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-pink-200/80 font-light text-lg"
            >
              تشغيل محرك الذكريات…
            </motion.p>
          )}
          {step >= 2 && (
            <motion.p
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-pink-200/80 font-light text-lg"
            >
              مزامنة اللحظات مع غزل…
            </motion.p>
          )}
          {step >= 3 && (
            <motion.p
              key="step3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-pink-200/80 font-light text-lg"
            >
              تعزيز الإحساس بالوقت…
            </motion.p>
          )}
          {step >= 4 && (
            <motion.div
              key="final-step"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="pt-6"
            >
              <p className="text-white text-xl md:text-2xl font-bold glow-pink-text">
                علي رح يضل معك كل يوم و للأبد وعد❤️.
              </p>
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={onComplete}
                className="mt-12 text-zinc-500 text-xs tracking-widest uppercase hover:text-white transition-colors underline underline-offset-8"
              >
                Access Final Protocol
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Button */}
      <div className="fixed bottom-20 left-0 right-0 px-8 flex justify-center">
        <motion.button
          onClick={() => !isStarted && setIsStarted(true)}
          disabled={isStarted && step < 4}
          whileHover={!isStarted ? { scale: 1.05 } : {}}
          whileTap={!isStarted ? { scale: 0.95 } : {}}
          className={`
            px-12 py-4 rounded-full font-bold tracking-[0.2em] uppercase transition-all duration-500
            ${isStarted 
              ? 'bg-transparent border border-pink-500/50 text-pink-500' 
              : 'bg-pink-600 text-white shadow-[0_0_30px_rgba(236,72,153,0.4)]'}
          `}
        >
          {isStarted ? (step < 4 ? 'Processing...' : 'Engine Running ✔') : 'Start Engine'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HeartEngine;
