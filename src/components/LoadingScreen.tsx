import { useEffect, useRef } from "react";
import loadingAudio from "@/FBDownloader.to-1552983689146798-(128kbps).mp3";

interface LoadingScreenProps {
  onDone: () => void;
}

const LoadingScreen = ({ onDone }: LoadingScreenProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(onDone, 9000);

    if (audioRef.current) {
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // ignore autoplay block, audio will still be attempted
        });
      }
    }

    return () => {
      window.clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 text-white">
      <div className="relative mx-4 w-full max-w-4xl overflow-hidden rounded-[2rem] border border-pink-400/50 bg-slate-900/95 shadow-2xl shadow-pink-500/20">
        <img
          src="/image-360563-1770965245.jpg"
          alt="Loading artwork"
          className="h-[520px] w-full object-cover opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/30 via-transparent to-slate-950/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span className="text-sm uppercase tracking-[0.32em] text-pink-200/90">go to read !</span>
          <h1 className="mt-4 text-5xl font-semibold uppercase tracking-[0.12em] text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.45)]">
            go to read !
          </h1>
          <p className="mt-3 max-w-xl text-sm text-pink-100/85">
            Please wait while your story opens with music and image.
          </p>
          <div className="mt-8 h-3 w-full max-w-lg overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-0 rounded-full bg-pink-400 animate-loadingProgress" />
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={loadingAudio} preload="auto" autoPlay playsInline />
    </div>
  );
};

export default LoadingScreen;
