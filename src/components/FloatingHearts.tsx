import { useMemo } from "react";

const FloatingHearts = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 28,
        duration: 12 + Math.random() * 18,
        delay: Math.random() * 20,
        drift: (Math.random() - 0.5) * 200,
        emoji: ["💖", "💗", "💝", "🌸", "✨"][Math.floor(Math.random() * 5)],
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* soft ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 80%, hsla(340, 82%, 50%, 0.18) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsla(43, 90%, 60%, 0.12) 0%, transparent 50%)",
        }}
      />
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-[-40px] animate-float-up"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            ["--drift" as string]: `${h.drift}px`,
            textShadow: "0 0 12px hsla(340, 90%, 70%, 0.7)",
            willChange: "transform, opacity",
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
