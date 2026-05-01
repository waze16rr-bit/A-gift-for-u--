import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { playYay } from "@/lib/sounds";

const StepProposal = () => {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const fireworksRef = useRef<number | null>(null);

  const teleportNo = () => {
    const padding = 80;
    const w = window.innerWidth - padding * 2;
    const h = window.innerHeight - padding * 2;
    const x = Math.random() * w - w / 2;
    const y = Math.random() * h - h / 2;
    setNoPos({ x, y });
  };

  const handleYes = () => {
    setAccepted(true);
    playYay();
  };

  // Endless fireworks loop after YES
  useEffect(() => {
    if (!accepted) return;
    const colors = ["#f472b6", "#facc15", "#fde68a", "#ec4899", "#fbbf24", "#f9a8d4"];
    const fire = () => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 60,
        startVelocity: 55,
        spread: 360,
        origin: { x: Math.random(), y: Math.random() * 0.4 + 0.1 },
        colors,
        scalar: 1.2,
      });
    };
    fire();
    const id = window.setInterval(fire, 900);
    fireworksRef.current = id;
    return () => {
      if (fireworksRef.current) window.clearInterval(fireworksRef.current);
    };
  }, [accepted]);

  return (
    <motion.div
      key="proposal"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex min-h-screen items-center justify-center px-4 py-16 text-center"
    >
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-card w-full max-w-2xl rounded-3xl p-8 md:p-14"
          >
            <p className="font-cursive text-3xl md:text-4xl text-gold text-glow-gold mb-4">
              And so, my love...
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-4">
              <span className="text-gold text-glow-gold">I LOVE YOU!</span>
            </h1>
            <h2 className="font-serif italic text-2xl md:text-4xl text-foreground mb-10">
              Will you be my <span className="text-gold text-glow-gold">Queen</span> forever?
            </h2>

            <div className="relative flex items-center justify-center gap-6 min-h-[100px]">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="btn-royal animate-pulse-glow rounded-full px-12 py-5 text-2xl"
              >
                YES ❤️
              </motion.button>

              {/* The runaway NO button */}
              <motion.button
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                onMouseEnter={teleportNo}
                onTouchStart={teleportNo}
                onFocus={teleportNo}
                onClick={teleportNo}
                className="btn-rose rounded-full px-12 py-5 text-2xl opacity-90"
                style={{ position: "relative" }}
              >
                NO
              </motion.button>
            </div>
            <p className="mt-8 font-cursive text-2xl text-foreground/70">
              ~ choose carefully, my love ~
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="accepted"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 14, duration: 1 }}
            className="relative z-10 px-4"
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-7xl md:text-9xl mb-6">🎆💍🎆</div>
              <h1 className="font-serif font-black text-5xl md:text-8xl leading-tight text-gold text-glow-gold">
                SHE SAID YES!
              </h1>
              <div className="text-6xl md:text-8xl mt-4">💖✨💖</div>
              <p className="mt-8 font-cursive text-4xl md:text-6xl text-gold text-glow-gold">
                Forever begins today.
              </p>
              <p className="mt-4 font-serif italic text-lg md:text-xl text-foreground/85">
                — Waze Ohi & his Queen 👑
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StepProposal;
