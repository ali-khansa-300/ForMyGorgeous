import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient'; // ✅ استيراد Supabase من الملف المُعد مسبقاً

interface EasterEggProps {
  onClose: () => void;
}

const EasterEgg: React.FC<EasterEggProps> = ({ onClose }) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [remoteStartTime, setRemoteStartTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  const lines = [
    'غزل،',
    'لو جربت مرة بحياتي قول هي الكلمة لحدا،',
    'ف رح تكون هي الكلمة الك وحدك:',
    'أنا بحبك ❤️.',
  ];

  // ─────────────────────────────────────────────
  // 1) جلب حالة العداد من Supabase
  // ─────────────────────────────────────────────
  useEffect(() => {
    const fetchCounter = async () => {
      try {
        // استعلام عن آخر صف في الجدول (بناءً على id الأعلى)
        const { data, error } = await supabase
          .from('love_counter')
          .select('start_time')
          .order('id', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // لا يوجد أي صف بعد – هذا طبيعي
            console.log('لا يوجد بداية عداد مسجلة بعد.');
          } else {
            console.error('خطأ في جلب البيانات من Supabase:', error);
          }
        }

        if (data?.start_time) {
          setRemoteStartTime(data.start_time);
          setIsAgreed(true);
        }
      } catch (err) {
        console.error('فشل الاتصال بـ Supabase:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounter();
  }, []);

  // ─────────────────────────────────────────────
  // 2) تشغيل الصوت بأول نقرة (لم يتغير)
  // ─────────────────────────────────────────────
  useEffect(() => {
    const playVoiceOnce = () => {
      voiceAudioRef.current
        ?.play()
        .catch((e) => console.warn('الصوت محجوب من المتصفح:', e));
    };

    document.addEventListener('click', playVoiceOnce, { once: true });
    return () => {
      document.removeEventListener('click', playVoiceOnce);
    };
  }, []);

  // ─────────────────────────────────────────────
  // 3) منطق العداد الزمني (لم يتغير جوهرياً)
  // ─────────────────────────────────────────────
  useEffect(() => {
    let interval: number | undefined;

    if (isAgreed && remoteStartTime) {
      const updateTime = () => {
        const startTimestamp = new Date(remoteStartTime).getTime();
        const now = Date.now();
        const diffInSeconds = Math.floor((now - startTimestamp) / 1000);

        if (diffInSeconds < 0) return;

        const secondsInYear = 365 * 24 * 3600;
        const secondsInDay = 24 * 3600;
        const secondsInHour = 3600;
        const secondsInMinute = 60;

        const years = Math.floor(diffInSeconds / secondsInYear);
        let remaining = diffInSeconds % secondsInYear;

        const days = Math.floor(remaining / secondsInDay);
        remaining %= secondsInDay;

        const hours = Math.floor(remaining / secondsInHour);
        remaining %= secondsInHour;

        const minutes = Math.floor(remaining / secondsInMinute);
        const seconds = remaining % secondsInMinute;

        setTime({ years, days, hours, minutes, seconds });
      };

      updateTime();
      interval = window.setInterval(updateTime, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAgreed, remoteStartTime]);

  // ─────────────────────────────────────────────
  // 4) زر "موافقة" – الإدراج في Supabase فقط أول مرة
  // ─────────────────────────────────────────────
  const handleAgree = async () => {
    const now = new Date().toISOString();

    try {
      // إدراج وقت البدء في Supabase
      const { error } = await supabase
        .from('love_counter')
        .insert({ start_time: now });

      if (error) {
        console.error('فشل حفظ الوقت في Supabase:', error);
        // يمكن عرض رسالة للمستخدم إذا أردت
        return;
      }

      // بعد النجاح، حدّث الحالة المحلية
      setRemoteStartTime(now);
      setIsAgreed(true);
    } catch (err) {
      console.error('استثناء أثناء الإدراج:', err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 1.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2 } },
  };

  if (isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 overflow-hidden"
    >
      {/* 🔊 الصوت بالمسار الصحيح من dist */}
      <audio
        ref={voiceAudioRef}
        src="/media/audio/easteregg_voice.mp3"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="rtl text-center space-y-6 max-w-sm w-full relative z-10"
      >
        {lines.map((line, idx) => (
          <motion.p
            key={idx}
            variants={itemVariants}
            className={`text-xl md:text-2xl font-light tracking-wide leading-relaxed ${
              idx === lines.length - 1
                ? 'text-pink-500 font-bold text-3xl mt-6'
                : 'text-neutral-200'
            }`}
          >
            {line}
          </motion.p>
        ))}

        <motion.div variants={itemVariants} className="flex flex-col items-center pt-12">
          <AnimatePresence mode="wait">
            {!isAgreed ? (
              <motion.div
                key="prompt-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                className="flex flex-col items-center space-y-8"
              >
                <p className="text-pink-100/40 text-lg font-light tracking-widest">
                  وافقتي؟
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAgree}
                  className="px-16 py-4 bg-pink-600 text-white font-bold rounded-full shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:bg-pink-500 transition-all text-xl"
                >
                  موافقة
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="counter-display"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center space-y-4 font-mono w-full min-w-[280px]"
              >
                <div className="text-zinc-600 text-[9px] uppercase tracking-[0.5em] mb-4">
                  Live Heartbeat Sync
                </div>

                <div className="grid grid-cols-1 gap-2 text-center w-full">
                  {[
                    { label: 'Seconds', val: time.seconds },
                    { label: 'Minutes', val: time.minutes },
                    { label: 'Hours', val: time.hours },
                    { label: 'Days', val: time.days },
                    { label: 'Years', val: time.years },
                  ].map((unit) => (
                    <motion.div
                      key={unit.label}
                      className="flex items-center justify-between px-8 border-b border-white/5 py-1.5 group"
                    >
                      <span className="text-zinc-500 text-[10px] uppercase tracking-widest group-hover:text-pink-300 transition-colors">
                        {unit.label}
                      </span>

                      <motion.span
                        key={unit.val}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-pink-500 text-3xl font-bold drop-shadow-[0_0_12px_rgba(236,72,153,0.7)]"
                      >
                        {unit.val}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={onClose}
            className="mt-12 px-10 py-2.5 text-[10px] uppercase tracking-[0.4em] border border-white/10 text-white/20 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all rounded-full"
          >
            Close
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EasterEgg;