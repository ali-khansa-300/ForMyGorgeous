
import React from 'react';
import { motion } from 'framer-motion';

const FinalMessage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center py-20 px-8 relative overflow-hidden"
    >
      <div className="w-full max-w-lg space-y-12 z-10 flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="w-full max-w-2xl rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-neutral-900"
        >
          <img 
            src="/media/images/final.jpg" 
            alt="Final Memory" 
            className="w-full h-auto object-contain block max-h-[70vh]"
          />
        </motion.div>

        <div className="space-y-8 rtl text-center w-full max-w-md">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-pink-100 text-xl leading-[2] font-light"
          >
            غزل،
          </motion.p>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-pink-100 text-lg leading-[2] font-light"
          >
            ما كنت عم عد الايام بس… كنت عم أتعلم حبك بهدوء أكبر وصدق أعمق
            <br />
            بعيد ميلادك وعيد الحب سوا ، بدي قولها و مارح اتأخر فيها اكتر :
          </motion.p>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-pink-400 text-2xl font-bold leading-[1.8] glow-pink-text"
          >
            انا بحبك ، مو متل اي حدا انتي اختياري يلي اخترتو بعد كتير تفكير و تجارب ،اختياري الوحيد و الثابت
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="text-center pt-8 border-t border-white/5 w-full max-w-md"
        >
          <p className="text-zinc-500 font-mono tracking-widest">— Ali</p>
        </motion.div>
      </div>

      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[100%] bg-pink-900/10 blur-[120px] rounded-full -z-10" />
    </motion.div>
  );
};

export default FinalMessage;
