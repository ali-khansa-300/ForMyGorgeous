
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootScreenProps {
  onEnter: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onEnter }) => {
  const [lines, setLines] = useState<string[]>([]);
  const fullText = [
    "جارٍ تشغيل بروتوكول غزل...",
    "جارٍ تحميل العدّ التنازلي...",
    "جارٍ استدعاء الذكريات...",
    "الحالة: جاهز ❤️"
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < fullText.length) {
        setLines(prev => [...prev, fullText[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 p-6 overflow-hidden"
    >
      <div className="w-full max-w-md space-y-4 rtl text-center">
        {lines.map((line, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-pink-400 font-mono text-lg md:text-xl leading-relaxed tracking-wider drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]"
          >
            {line}
          </motion.p>
        ))}
      </div>

      {lines.length === fullText.length && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="mt-16 px-8 py-3 rounded-full border border-pink-500 text-pink-500 font-bold tracking-widest uppercase glow-pink hover:bg-pink-500/10 transition-all duration-300"
        >
          Enter Countdown
        </motion.button>
      )}
    </motion.div>
  );
};

export default BootScreen;
