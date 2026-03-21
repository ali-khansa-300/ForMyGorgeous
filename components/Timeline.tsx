import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

interface TimelineItem {
  id: number;
  title: string;
  type: 'image' | 'video';
  embedUrl: string;
  isSpecial?: boolean;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 1,
    title: "First Chat",
    type: "image",
    embedUrl: "/media/images/first_chat.jpg"
  },

  {
    id: 2,
    title: "8 Days Left",
    type: "video",
    embedUrl:
      "https://player.vimeo.com/video/1163881913?h=ea37a06b91&badge=0&portrait=0&title=0&byline=0&controls=0&muted=1"
  },

  {
    id: 3,
    title: "7 Days Left",
    type: "video",
    embedUrl:
      "https://player.vimeo.com/video/1163882179?h=6931a45339&badge=0&portrait=0&title=0&byline=0&controls=0&muted=1"
  },

  {
    id: 4,
    title: "6 Days Left",
    type: "video",
    embedUrl:
      "https://player.vimeo.com/video/1163882293?h=5e7ed01818&badge=0&portrait=0&title=0&byline=0&controls=0&muted=1"
  },

  {
    id: 5,
    title: "5 Days Left",
    type: "video",
    embedUrl:
      "https://player.vimeo.com/video/1163882491?h=d97a55739b&badge=0&portrait=0&title=0&byline=0&controls=0&muted=1"
  },

  {
    id: 6,
    title: "4 Days Left",
    type: "video",
    embedUrl:
      "https://player.vimeo.com/video/1163883530?h=e1176c3dd1&badge=0&portrait=0&title=0&byline=0&controls=0&muted=1"
  },

  {
    id: 7,
    title: "3 Days Left",
    type: "video",
    embedUrl:
      "https://player.vimeo.com/video/1163882859?h=973ca39885&badge=0&portrait=0&title=0&byline=0&controls=0&muted=1"
  },

  {
    id: 8,
    title: "2 Days Left",
    type: "video",
    embedUrl:
      "https://player.vimeo.com/video/1164165056?h=51f1335ab0&badge=0&portrait=0&title=0&byline=0&controls=0&muted=1"
  },

  {
    id: 9,
    title: "1 Day Left",
    type: "video",
    embedUrl:
      "https://player.vimeo.com/video/1164568755?h=5938e518de&badge=0&portrait=0&title=0&byline=0&controls=0&muted=1"
  },

  {
    id: 10,
    title: "Her Birthday & Valentine’s Day",
    type: "video",
    embedUrl:
      "https://player.vimeo.com/video/1163881092?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;muted=1&amp;loop=1",
    isSpecial: true
  }
];

interface TimelineProps {
  onComplete: () => void;
}

const Timeline: React.FC<TimelineProps> = ({ onComplete }) => {
  const [activeMedia, setActiveMedia] = useState<TimelineItem | null>(null);

  // ======= التعديل الوحيد الذي أضفته لك =======
  const openMedia = (item: TimelineItem) => {
    if (item.type === "video" && !item.isSpecial) {
      setActiveMedia({
        ...item,
        embedUrl: item.embedUrl + "&autoplay=1"
      });
    } else {
      setActiveMedia(item);
    }
  };
  // ===========================================

  return (
    <div className="relative min-h-screen py-24 px-6 md:px-0 flex flex-col items-center">
      <div className="absolute left-1/2 top-24 bottom-24 w-[1px] bg-pink-500/20 -translate-x-1/2 md:block hidden" />

      <div className="w-full max-w-lg space-y-24">
        {TIMELINE_DATA.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`relative flex flex-col ${
              item.isSpecial ? "items-center" : "items-center md:items-start"
            } gap-6`}
          >
            <h3
              className={`text-xl font-bold tracking-widest text-pink-400 uppercase ${
                item.isSpecial ? "text-3xl text-center glow-pink" : ""
              }`}
            >
              {item.title}
            </h3>

            {!item.isSpecial ? (
              <div
                onClick={() => openMedia(item)}
                className="group relative w-full aspect-[9/16] max-w-[200px] bg-neutral-900/80 rounded-2xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all duration-500 cursor-pointer"
              >
                {item.type === "image" ? (
                  <img
                    src={item.embedUrl}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                  />
                ) : (
                  <div className="w-full h-full relative">
                    <iframe
                      src={item.embedUrl}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                      <Play
                        className="text-white fill-white opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all"
                        size={32}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full space-y-8 flex flex-col items-center">
                <div className="relative w-full aspect-[9/16] max-w-sm rounded-3xl overflow-hidden border-2 border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                  <iframe
                    src={item.embedUrl}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onComplete}
                  className="px-10 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-full shadow-lg glow-pink"
                >
                  Open your gift
                </motion.button>

                <p className="rtl text-neutral-300 text-lg text-center leading-relaxed mt-4 max-w-xs font-light">
                  "هذا اليوم ما كان صدفة بالتقويم او يوم عابر هدا اليوم لحظة
                  نطرتها كتيير ."
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-8 right-8 text-white z-[110]"
            >
              <X size={32} />
            </button>

            <div className="w-full max-w-[400px] aspect-[9/16] bg-neutral-900 rounded-3xl overflow-hidden relative">
             {activeMedia.type === "video" ? (
  <div className="w-full h-full relative">
    <iframe
      src={`${activeMedia.embedUrl}&background=1&transparent=0`}
      className="w-full h-full"
      allow="autoplay; fullscreen; picture-in-picture"
    />
  </div>
) : (
  <img
    src={activeMedia.embedUrl}
    className="w-full h-full object-cover"
  />
)}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
