import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { playYay } from "@/lib/sounds";

const StepMarry = ({ onNext }: { onNext: () => void }) => {
  const [showPoop, setShowPoop] = useState(false);
  const [poopKey, setPoopKey] = useState(0);

  const handleYes = () => {
    playYay();
    confetti({
      particleCount: 220,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#f472b6", "#facc15", "#fde68a", "#ec4899", "#fbbf24"],
    });
    setTimeout(() => onNext(), 1400);
  };

  const handleNo = () => {
    setPoopKey((k) => k + 1);
    setShowPoop(true);
    setTimeout(() => setShowPoop(false), 2200);
  };

  return (
    <motion.div
      key="marry"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="flex min-h-screen items-center justify-center px-4 py-16"
    >
      <div className="glass-card w-full max-w-xl rounded-3xl p-8 md:p-12 text-center">
        <p className="font-cursive text-3xl text-gold text-glow-gold mb-3">Question Two</p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-10">
          Would you <span className="text-gold text-glow-gold italic">marry him?</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleYes}
            className="btn-royal animate-pulse-glow rounded-full px-10 py-4 text-xl"
          >
            YES 💍
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleNo}
            className="btn-rose rounded-full px-10 py-4 text-xl opacity-80"
          >
            NO 😔
          </motion.button>
        </div>

        <p className="mt-6 text-sm text-foreground/60 italic">
          (please pick wisely, my heart is watching 👀)
        </p>
      </div>

      <AnimatePresence>
        {showPoop && (
          <motion.div
            key={poopKey}
            initial={{ y: -300, opacity: 0, rotate: 0 }}
            animate={{
              y: [-300, "70vh", "55vh", "65vh", "60vh"],
              opacity: [0, 1, 1, 1, 1],
              rotate: [0, 180, 360, 380, 360],
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 1.8, times: [0, 0.5, 0.7, 0.85, 1], ease: "easeIn" }}
            className="fixed left-1/2 top-0 z-50 -translate-x-1/2 text-[10rem] md:text-[14rem] pointer-events-none"
            style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))" }}
          >
            💩
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StepMarry;
