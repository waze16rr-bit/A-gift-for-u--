import { useEffect, useRef } from "react";

interface Trail {
  el: HTMLSpanElement;
  bornAt: number;
  life: number;
}

const CustomCursor = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (matchMedia("(hover: none)").matches) return;

    const root = rootRef.current;
    const ring = ringRef.current;
    if (!root || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let lastEmit = 0;
    let rafId = 0;
    const trails: Trail[] = [];

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = (now: number) => {
      // move ring
      ring.style.transform = `translate3d(${mouseX - 14}px, ${mouseY - 14}px, 0)`;

      // emit trail at most every 60ms
      if (now - lastEmit > 60) {
        lastEmit = now;
        const isHeart = Math.random() > 0.5;
        const span = document.createElement("span");
        span.textContent = isHeart ? "💗" : "✨";
        span.className = "cursor-trail";
        const size = 12 + Math.random() * 10;
        span.style.cssText = `position:absolute;left:0;top:0;font-size:${size}px;will-change:transform,opacity;transform:translate3d(${
          mouseX - size / 2
        }px,${mouseY - size / 2}px,0) rotate(${Math.random() * 360}deg);pointer-events:none;`;
        root.appendChild(span);
        trails.push({ el: span, bornAt: now, life: 800 });
      }

      // age trails
      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i];
        const age = (now - t.bornAt) / t.life;
        if (age >= 1) {
          t.el.remove();
          trails.splice(i, 1);
        } else {
          t.el.style.opacity = String(1 - age);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      trails.forEach((t) => t.el.remove());
    };
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={ringRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 28,
          height: 28,
          borderRadius: "9999px",
          border: "2px solid hsl(43 90% 70%)",
          boxShadow:
            "0 0 20px hsla(43, 90%, 70%, 0.9), 0 0 40px hsla(340, 82%, 60%, 0.5)",
          background:
            "radial-gradient(circle, hsla(340, 82%, 60%, 0.5) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default CustomCursor;
