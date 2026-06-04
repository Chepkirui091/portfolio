"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/data/site";

const MIN_DISPLAY_MS = 900;
const FADE_MS = 500;

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    let frame: number;
    let done = false;

    const tick = () => {
      const target = document.readyState === "complete" ? 100 : 72;
      setProgress((p) => Math.min(target, p + (100 - p) * 0.08 + 2));
      if (!done) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(frame);
      setProgress(100);
      const wait = Math.max(0, MIN_DISPLAY_MS - (Date.now() - start));
      window.setTimeout(() => setVisible(false), wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
    }

    const fallback = window.setTimeout(finish, 4000);

    return () => {
      done = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("load", finish);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background px-6"
        >
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
          <div
            className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full blur-[100px]"
            style={{ background: "var(--hero-glow)" }}
          />
          <div
            className="pointer-events-none absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full blur-[80px]"
            style={{ background: "var(--hero-glow-secondary)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative z-10 w-full max-w-md text-center"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Loading portfolio
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              <span className="text-gradient">{site.name}</span>
            </h2>
            <p className="mt-2 text-sm text-muted">{site.title}</p>

            <div className="mt-10 h-1.5 w-full overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>
            <p className="mt-3 font-mono text-[10px] text-muted">
              {Math.round(progress)}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
