import { lazy, Suspense, useState } from "react";
import { AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import FloatingHearts from "@/components/FloatingHearts";
import LoadingScreen from "@/components/LoadingScreen";
import StepWelcome from "@/components/steps/StepWelcome";

const StepLetter = lazy(() => import("@/components/steps/StepLetter"));
const StepLoveTest = lazy(() => import("@/components/steps/StepLoveTest"));
const StepMarry = lazy(() => import("@/components/steps/StepMarry"));
const StepKing = lazy(() => import("@/components/steps/StepKing"));
const StepProposal = lazy(() => import("@/components/steps/StepProposal"));

const Index = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const next = () => setStep((s) => s + 1);

  if (loading) {
    return <LoadingScreen onDone={() => setLoading(false)} />;
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <FloatingHearts />
      <CustomCursor />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {step === 0 && <StepWelcome key="s0" onNext={next} />}
          {step > 0 && (
            <Suspense key={`s${step}`} fallback={null}>
              {step === 1 && <StepLetter onNext={next} />}
              {step === 2 && <StepLoveTest onNext={next} />}
              {step === 3 && <StepMarry onNext={next} />}
              {step === 4 && <StepKing onNext={next} />}
              {step >= 5 && <StepProposal />}
            </Suspense>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Index;
