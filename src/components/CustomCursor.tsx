import { useEffect, useRef, useState } from "react";

interface Trail {
  id: number;
  x: number;
  y: number;
  type: "heart" | "sparkle";
  size: number;
  rotation: number;
}

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trails, setTrails] = useState<Trail[]>([]);
  const lastEmit = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const now = performance.now();
      if (now - lastEmit.current > 40) {
        lastEmit.current = now;
        const type: "heart" | "sparkle" = Math.random() > 0.5 ? "heart" : "sparkle";
        const id = idRef.current++;
        setTrails((prev) => [
          ...prev.slice(-22),
          {
            id,
            x: e.clientX + (Math.random() - 0.5) * 16,
            y: e.clientY + (Math.random() - 0.5) * 16,
            type,
            size: 12 + Math.random() * 10,
            rotation: Math.random() * 360,
          },
        ]);
        setTimeout(() => {
          setTrails((prev) => prev.filter((t) => t.id !== id));
        }, 900);
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Main cursor: gold ring with rose dot */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{ left: pos.x, top: pos.y }}
      >
        <div
          className="w-7 h-7 rounded-full border-2"
          style={{
            borderColor: "hsl(43 90% 70%)",
            boxShadow: "0 0 20px hsla(43, 90%, 70%, 0.9), 0 0 40px hsla(340, 82%, 60%, 0.5)",
            background: "radial-gradient(circle, hsla(340, 82%, 60%, 0.5) 0%, transparent 70%)",
          }}
        />
      </div>
      {trails.map((t) => (
        <span
          key={t.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
          style={{
            left: t.x,
            top: t.y,
            fontSize: t.size,
            transform: `translate(-50%, -50%) rotate(${t.rotation}deg)`,
            animation: "cursorTrailFade 0.9s ease-out forwards",
            filter: t.type === "heart"
              ? "drop-shadow(0 0 6px hsla(340, 90%, 70%, 0.9))"
              : "drop-shadow(0 0 6px hsla(43, 90%, 75%, 0.95))",
          }}
        >
          {t.type === "heart" ? "💗" : "✨"}
        </span>
      ))}
      <style>{`
        @keyframes cursorTrailFade {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -120%) scale(0.4); }
        }
      `}</style>
    </div>
  );
};

export default CustomCursor;
