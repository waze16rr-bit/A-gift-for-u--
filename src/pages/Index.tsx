import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import FloatingHearts from "@/components/FloatingHearts";
import StepWelcome from "@/components/steps/StepWelcome";
import StepLetter from "@/components/steps/StepLetter";
import StepLoveTest from "@/components/steps/StepLoveTest";
import StepMarry from "@/components/steps/StepMarry";
import StepKing from "@/components/steps/StepKing";
import StepProposal from "@/components/steps/StepProposal";

const Index = () => {
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => s + 1);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <FloatingHearts />
      <CustomCursor />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {step === 0 && <StepWelcome key="s0" onNext={next} />}
          {step === 1 && <StepLetter key="s1" onNext={next} />}
          {step === 2 && <StepLoveTest key="s2" onNext={next} />}
          {step === 3 && <StepMarry key="s3" onNext={next} />}
          {step === 4 && <StepKing key="s4" onNext={next} />}
          {step >= 5 && <StepProposal key="s5" />}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Index;
