import { motion } from "framer-motion";
import { initAudio } from "@/lib/sounds";

const StepWelcome = ({ onNext }: { onNext: () => void }) => {
  const handleOpen = () => {
    initAudio();
    onNext();
  };

  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="mb-4 text-5xl"
      >
        👑
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="font-cursive text-3xl text-glow-rose mb-2"
        style={{ color: "hsl(var(--blush))" }}
      >
        for the only one
      </motion.p>
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
        className="font-serif text-6xl md:text-8xl font-bold leading-tight"
      >
        <span className="text-gold text-glow-gold">Hello,</span>
        <br />
        <span className="text-gold text-glow-gold italic">My Princess.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-8 max-w-xl font-serif italic text-lg md:text-xl text-foreground/85"
      >
        Something magical awaits you... a little world built only for your heart.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleOpen}
        className="btn-royal animate-pulse-glow mt-12 rounded-full px-10 py-5 text-lg md:text-xl"
      >
        Open My Heart 💖
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="mt-6 text-sm text-foreground/60 font-cursive text-xl"
      >
        ~ tap when you're ready ~
      </motion.p>
    </motion.div>
  );
};

export default StepWelcome;
