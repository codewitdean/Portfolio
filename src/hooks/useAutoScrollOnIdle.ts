"use client";

import { useCallback, useEffect, useRef } from "react";

type BottomBehavior = "stop" | "loop";

type AutoScrollOnIdleOptions = {
  enabled?: boolean;
  idleDelay?: number;
  pixelsPerSecond?: number;
  bottomBehavior?: BottomBehavior;
  bottomPauseDelay?: number;
};

const userActivityEvents = [
  "wheel",
  "touchstart",
  "touchmove",
  "pointerdown",
  "pointermove",
  "mousedown",
  "mousemove",
  "keydown",
  "click",
  "dragstart",
];

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

const getMaxScrollY = () => {
  const pageHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  );

  return Math.max(0, pageHeight - window.innerHeight);
};

const scrollWithoutCssSmoothing = (top: number) => {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  window.scrollTo(0, top);
  root.style.scrollBehavior = previousScrollBehavior;
};

export default function useAutoScrollOnIdle({
  enabled = true,
  idleDelay = 3000,
  pixelsPerSecond = 60,
  bottomBehavior = "stop",
  bottomPauseDelay = 1500,
}: AutoScrollOnIdleOptions = {}) {
  const animationFrameRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const autoScrollStartRef = useRef<number | null>(null);
  const isAutoScrollingRef = useRef(false);

  const clearResumeTimeout = useCallback(() => {
    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    isAutoScrollingRef.current = false;
    lastFrameTimeRef.current = null;
    autoScrollStartRef.current = null;
  }, []);

  const animateScroll = useCallback(
    (timestamp: number) => {
      if (!enabled || document.visibilityState === "hidden") {
        stopAutoScroll();
        return;
      }

      const maxScrollY = getMaxScrollY();
      const currentScrollY = window.scrollY;

      if (maxScrollY <= 0 || currentScrollY >= maxScrollY - 1) {
        stopAutoScroll();

        if (bottomBehavior === "loop" && maxScrollY > 0) {
          clearResumeTimeout();
          resumeTimeoutRef.current = window.setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, bottomPauseDelay);
        }

        return;
      }

      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = timestamp;
      }

      if (autoScrollStartRef.current === null) {
        autoScrollStartRef.current = timestamp;
      }

      const delta = Math.min(timestamp - lastFrameTimeRef.current, 64);
      const startElapsed = timestamp - autoScrollStartRef.current;
      const startEase = easeOutCubic(Math.min(startElapsed / 1200, 1));
      const bottomProgress = currentScrollY / maxScrollY;
      const bottomEase = Math.max(0.42, 1 - bottomProgress * 0.38);
      const mobileEase = window.innerWidth < 768 ? 0.82 : 1;
      const nextScrollY =
        currentScrollY +
        (pixelsPerSecond * delta * startEase * bottomEase * mobileEase) / 1000;

      lastFrameTimeRef.current = timestamp;
      scrollWithoutCssSmoothing(Math.min(nextScrollY, maxScrollY));
      animationFrameRef.current = window.requestAnimationFrame(animateScroll);
    },
    [
      bottomBehavior,
      bottomPauseDelay,
      clearResumeTimeout,
      enabled,
      pixelsPerSecond,
      stopAutoScroll,
    ]
  );

  const startAutoScroll = useCallback(() => {
    if (!enabled || isAutoScrollingRef.current || document.visibilityState === "hidden") {
      return;
    }

    if (window.scrollY >= getMaxScrollY() - 1) {
      return;
    }

    clearResumeTimeout();
    isAutoScrollingRef.current = true;
    lastFrameTimeRef.current = null;
    autoScrollStartRef.current = null;
    animationFrameRef.current = window.requestAnimationFrame(animateScroll);
  }, [animateScroll, clearResumeTimeout, enabled]);

  const scheduleResume = useCallback(
    (delay = idleDelay) => {
      clearResumeTimeout();

      if (!enabled) {
        return;
      }

      resumeTimeoutRef.current = window.setTimeout(startAutoScroll, delay);
    },
    [clearResumeTimeout, enabled, idleDelay, startAutoScroll]
  );

  const pauseForActivity = useCallback(() => {
    stopAutoScroll();
    scheduleResume();
  }, [scheduleResume, stopAutoScroll]);

  useEffect(() => {
    if (!enabled) {
      clearResumeTimeout();
      stopAutoScroll();
      return;
    }

    const listenerOptions: AddEventListenerOptions = {
      passive: true,
      capture: true,
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        clearResumeTimeout();
        stopAutoScroll();
        return;
      }

      scheduleResume();
    };

    userActivityEvents.forEach((eventName) => {
      document.addEventListener(eventName, pauseForActivity, listenerOptions);
    });
    window.addEventListener("resize", pauseForActivity, listenerOptions);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    scheduleResume(idleDelay);

    return () => {
      userActivityEvents.forEach((eventName) => {
        document.removeEventListener(eventName, pauseForActivity, listenerOptions);
      });
      window.removeEventListener("resize", pauseForActivity, listenerOptions);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearResumeTimeout();
      stopAutoScroll();
    };
  }, [
    clearResumeTimeout,
    enabled,
    idleDelay,
    pauseForActivity,
    scheduleResume,
    stopAutoScroll,
  ]);
}
