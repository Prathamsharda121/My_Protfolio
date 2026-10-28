"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { ArrowUp } from "lucide-react";

/** Floating back-to-top button with a ring that fills as you scroll. */
export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => setVisible(v > 0.08));

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          data-cursor="Top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="group fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-[#0a0c13]/90 text-ink shadow-2xl shadow-black/50"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56" aria-hidden>
            <defs>
              <linearGradient id="btt" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="url(#btt)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
