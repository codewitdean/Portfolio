"use client";

import { PropsWithChildren, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa";
import useAutoScrollOnIdle from "@/hooks/useAutoScrollOnIdle";
import styles from "./AutoScrollingPortfolio.module.css";

type AutoScrollingPortfolioProps = PropsWithChildren<{
  enabled: boolean;
}>;

export default function AutoScrollingPortfolio({
  enabled,
  children,
}: AutoScrollingPortfolioProps) {
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const isAutoScrollActive = enabled && autoScrollEnabled && !shouldReduceMotion;
  const toggleLabel = autoScrollEnabled ? "Auto Scroll On" : "Auto Scroll Off";
  const ToggleIcon = autoScrollEnabled ? FaPause : FaPlay;

  useAutoScrollOnIdle({
    enabled: isAutoScrollActive,
    idleDelay: 3000,
    pixelsPerSecond: 60,
    bottomBehavior: "stop",
  });

  return (
    <motion.div
      className={styles.wrapper}
      initial={false}
      animate={{ opacity: enabled ? 1 : 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
      <button
        type="button"
        className={`${styles.toggle} ${autoScrollEnabled ? styles.on : styles.off}`}
        onClick={() => setAutoScrollEnabled((current) => !current)}
        aria-pressed={autoScrollEnabled}
        aria-label={autoScrollEnabled ? "Turn auto scroll off" : "Turn auto scroll on"}
      >
        <span className={styles.iconWrap} aria-hidden="true">
          <ToggleIcon className={styles.icon} />
        </span>
        <span>{toggleLabel}</span>
      </button>
    </motion.div>
  );
}
