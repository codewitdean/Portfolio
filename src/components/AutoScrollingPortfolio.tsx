"use client";

import { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";
import useAutoScrollOnIdle from "@/hooks/useAutoScrollOnIdle";

type AutoScrollingPortfolioProps = PropsWithChildren<{
  enabled: boolean;
}>;

export default function AutoScrollingPortfolio({
  enabled,
  children,
}: AutoScrollingPortfolioProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());

  useAutoScrollOnIdle({
    enabled: enabled && !shouldReduceMotion,
    idleDelay: 3000,
    pixelsPerSecond: 60,
    bottomBehavior: "stop",
  });

  return (
    <motion.div
      className="relative"
      initial={false}
      animate={{ opacity: enabled ? 1 : 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
