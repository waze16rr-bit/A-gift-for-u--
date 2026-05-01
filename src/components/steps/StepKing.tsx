import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSparkle } from "@/lib/sounds";

const StepKing = ({ onNext }: { onNext: () => void }) => {
  const [value, setValue] = useState("");
  const [hint, setHint] = useState(false);
  const [reward, setReward] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = value.trim().toLowerCase().replace(/\s+/g, " ");
    if (v.includes("waze ohi") || v === "waze") {
      setHint(false);
      setReward(true);
      playSparkle();
      setTimeout(() => onNext(), 3000);
    } else {
      setHint(true);
    }
  };

  // Generate falling crowns/hearts grid
  const rewards = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    size: 28 + Math.random() * 36,
    emoji: Math.random() > 0.5 ? "👑" : "💖",
    drift: (Math.random() - 0.5) * 100,
  }));

  return (
    <motion.div
      key="king"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="flex min-h-screen items-center justify-center px-4 py-16"
    >
      <div className="glass-card w-full max-w-xl rounded-3xl p-8 md:p-12 text-center">
        <p className="font-cursive text-3xl text-gold text-glow-gold mb-3">Question Three</p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
          Who is your <span className="text-gold text-glow-gold">forever king?</span>
        </h2>
        <p className="font-serif italic text-foreground/80 mb-8">What is his name?</p>

        <form onSubmit={submit} className="space-y-5">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Whisper his name..."
            className="w-full rounded-full border border-border bg-background/40 px-6 py-4 text-center text-lg font-serif italic text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent backdrop-blur-md"
            autoFocus
          />
          {hint && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-cursive text-2xl text-accent"
            >
              Hint: He is the one making this app for you! 💌
            </motion.p>
          )}
          <button type="submit" className="btn-royal rounded-full px-8 py-3 text-base">
            Crown Him 👑
          </button>
        </form>
      </div>

      <AnimatePresence>
        {reward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-hidden bg-background/40 backdrop-blur-sm flex items-center justify-center"
          >
            {rewards.map((r) => (
              <motion.span
                key={r.id}
                initial={{ y: -100, opacity: 0, x: 0 }}
                animate={{ y: "110vh", opacity: [0, 1, 1, 0], x: r.drift }}
                transition={{ duration: 3, delay: r.delay, ease: "easeIn" }}
                className="absolute top-0"
                style={{
                  left: `${r.left}%`,
                  fontSize: r.size,
                  filter: "drop-shadow(0 0 12px hsla(43, 90%, 70%, 0.9))",
                }}
              >
                {r.emoji}
              </motion.span>
            ))}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative z-10 text-center"
            >
              <div className="text-9xl mb-4">👑</div>
              <p className="font-cursive text-5xl md:text-6xl text-gold text-glow-gold">
                Long live my Queen!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StepKing;
