import { motion } from "framer-motion";

// Photo placeholders — easy to swap. Replace src URLs with your own later.
const photos = [
  "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?w=600&q=80",
  "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=600&q=80",
];

const StepLetter = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div
      key="letter"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.7 }}
      className="flex min-h-screen items-center justify-center px-4 py-16"
    >
      <div className="glass-card relative w-full max-w-3xl rounded-3xl p-8 md:p-14">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl">💌</div>

        <p className="text-center font-cursive text-4xl md:text-5xl text-gold text-glow-gold">
          A letter, from me to you
        </p>

        <div className="my-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
              className="gold-frame aspect-square overflow-hidden rounded-2xl"
            >
              <img
                src={src}
                alt={`Memory ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        <div className="space-y-4 font-serif text-lg leading-relaxed text-foreground/95 md:text-xl">
          <p>My dearest love,</p>
          <p>
            From the very first moment my world tilted toward yours, I knew nothing
            would ever be ordinary again. You are the soft music in my quiet
            mornings, the laughter in my long days, the warmth when the world feels cold.
          </p>
          <p>
            Every dream I dare to dream now wears your name. Every plan I make
            secretly hopes to find you waiting at the end of it. You are not just
            a chapter of my story — you are the whole reason I write.
          </p>
          <p>
            So I built this little kingdom of pixels just for you... with hearts
            and gold and questions only your heart can answer.
          </p>
          <p className="font-cursive text-3xl md:text-4xl text-gold text-glow-gold pt-4">
            Forever Yours, Waze Ohi
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onNext}
            className="btn-royal rounded-full px-8 py-4 text-base md:text-lg"
          >
            Answer Some Questions 💌
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default StepLetter;
