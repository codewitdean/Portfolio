"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

type PortfolioIntroProps = {
  onComplete: () => void;
  reduceMotion: boolean;
};

const nameLetters = ["D", "e", "a", "n"];

export default function PortfolioIntro({
  onComplete,
  reduceMotion,
}: PortfolioIntroProps) {
  useEffect(() => {
    const introDuration = reduceMotion ? 900 : 3600;
    const timer = window.setTimeout(onComplete, introDuration);

    return () => window.clearTimeout(timer);
  }, [onComplete, reduceMotion]);

  const letterDelay = reduceMotion ? 0 : 0.32;
  const welcomeDelay = reduceMotion ? 0.15 : 1.9;

  return (
    <motion.section
      aria-label="Welcome intro"
      className="fixed inset-0 z-[999] isolate flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: reduceMotion ? 0 : -24,
        filter: reduceMotion ? "blur(0px)" : "blur(18px)",
      }}
      transition={{ duration: reduceMotion ? 0.2 : 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: reduceMotion ? 0.24 : 0.4 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.18),transparent_44%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_34%,rgba(59,130,246,0.12))]"
        initial={{ opacity: 0 }}
        animate={{ opacity: reduceMotion ? 0.5 : [0.4, 0.68, 0.5] }}
        transition={{ duration: 3.2, ease: "easeInOut" }}
      />

      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent" />

      <motion.div
        className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="mb-7 h-px w-24 bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent sm:w-36"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.35, duration: 0.7, ease: "easeOut" }}
        />

        <div className="flex items-center justify-center gap-[clamp(0.65rem,3.8vw,2rem)] font-mono text-[clamp(3.75rem,15vw,9.5rem)] font-semibold leading-none tracking-[0]">
          {nameLetters.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              className="inline-block bg-gradient-to-b from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(45,212,191,0.24)]"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 22, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: reduceMotion ? 0 : 0.55 + index * letterDelay,
                duration: reduceMotion ? 0.15 : 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}

          <motion.span
            aria-hidden="true"
            className="ml-[clamp(0.15rem,1.2vw,0.5rem)] h-[clamp(3rem,12vw,8.5rem)] w-px bg-cyan-100/80 shadow-[0_0_22px_rgba(103,232,249,0.45)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: reduceMotion ? 0 : [0, 1, 0, 1, 0] }}
            transition={{ delay: 0.55, duration: 1.9, ease: "linear" }}
          />
        </div>

        <motion.p
          className="mt-8 max-w-[32rem] font-display text-sm font-medium uppercase tracking-[0.32em] text-slate-300/85 sm:text-base"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: welcomeDelay, duration: reduceMotion ? 0.2 : 0.65, ease: "easeOut" }}
        >
          Welcome to my portfolio.
        </motion.p>

        <div className="mt-10 h-px w-48 overflow-hidden bg-white/10 sm:w-64">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-cyan-200 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: reduceMotion ? "0%" : "100%" }}
            transition={{ delay: reduceMotion ? 0.15 : 2.3, duration: reduceMotion ? 0.2 : 1, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
