import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playKiss, playSparkle } from "@/lib/sounds";

type Reveal = "ring" | "kiss" | null;

const StepLoveTest = ({ onNext }: { onNext: () => void }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [reveal, setReveal] = useState<Reveal>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = value.trim().toLowerCase();
    if (v.length < 3) {
      setError("Tell me a little more, my love... 💗");
      return;
    }
    setError("");
    if (v.includes("more than my life")) {
      playSparkle();
      setReveal("ring");
    } else {
      playKiss();
      setReveal("kiss");
    }
    setTimeout(() => onNext(), 3200);
  };

  return (
    <motion.div
      key="lovetest"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="flex min-h-screen items-center justify-center px-4 py-16"
    >
      <div className="glass-card w-full max-w-xl rounded-3xl p-8 md:p-12 text-center">
        <p className="font-cursive text-3xl text-gold text-glow-gold mb-3">Question One</p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
          How much do u love <span className="text-gold text-glow-gold">WAZE OHI?</span>
        </h2>

        <form onSubmit={submit} className="space-y-5">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Tell me from your heart..."
            className="w-full rounded-full border border-border bg-background/40 px-6 py-4 text-center text-lg font-serif italic text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent backdrop-blur-md"
            autoFocus
          />
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-accent"
            >
              {error}
            </motion.p>
          )}
          <button type="submit" className="btn-royal rounded-full px-8 py-3 text-base">
            Send My Love 💗
          </button>
        </form>
      </div>

      <AnimatePresence>
        {reveal === "ring" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              className="text-center"
              style={{ filter: "drop-shadow(0 0 80px hsla(43, 90%, 70%, 0.95))" }}
            >
              <div className="text-9xl md:text-[12rem] animate-pulse-glow rounded-full">💍</div>
              <div className="text-7xl md:text-8xl mt-2">🌹</div>
              <p className="mt-4 font-cursive text-4xl text-gold text-glow-gold">
                I knew it, my queen.
              </p>
            </motion.div>
          </motion.div>
        )}
        {reveal === "kiss" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: [0.4, 1.3, 1, 1.2, 0.9], opacity: [0, 1, 1, 1, 0] }}
              transition={{ duration: 2.8, times: [0, 0.2, 0.5, 0.8, 1] }}
              className="text-[14rem] md:text-[20rem]"
              style={{ filter: "drop-shadow(0 0 60px hsla(340, 90%, 60%, 0.9))" }}
            >
              💋
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StepLoveTest;
