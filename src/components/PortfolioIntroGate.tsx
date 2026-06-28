"use client";

import { PropsWithChildren, useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import AutoScrollingPortfolio from "./AutoScrollingPortfolio";
import PortfolioIntro from "./PortfolioIntro";

export default function PortfolioIntroGate({ children }: PropsWithChildren) {
  const [introComplete, setIntroComplete] = useState(false);
  const shouldReduceMotion = Boolean(useReducedMotion());

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!introComplete && (
          <PortfolioIntro
            onComplete={handleIntroComplete}
            reduceMotion={shouldReduceMotion}
          />
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden={!introComplete}
        className={introComplete ? "pointer-events-auto" : "pointer-events-none select-none"}
        initial={false}
        animate={
          introComplete
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: shouldReduceMotion ? 0 : 28, filter: "blur(18px)" }
        }
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <AutoScrollingPortfolio enabled={introComplete}>
          {children}
        </AutoScrollingPortfolio>
      </motion.div>
    </>
  );
}
