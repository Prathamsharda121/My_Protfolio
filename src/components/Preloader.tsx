"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/lib/content";
import { setScrollLocked } from "@/components/SmoothScroll";

const ease = [0.76, 0, 0.24, 1] as const;
const soft = [0.16, 1, 0.3, 1] as const;

/** How long the counter runs; Hero waits for PRELOADER_TOTAL before animating in. */
const COUNT_MS = 3000;
const HOLD_MS = 350;
export const PRELOADER_TOTAL = (COUNT_MS + HOLD_MS) / 1000 + 0.35;

const words = ["AI Agents", "Sales CRM", "Slack Automation", "Product AI", "Workflows", "Let's go"];
const COLUMNS = 5;

/** Intro: name + cycling words + counter, then a staggered column curtain reveals the site. */
export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const word = words[Math.min(Math.floor((count / 100) * words.length), words.length - 1)];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    setScrollLocked(true);
    window.scrollTo(0, 0);

    const start = performance.now();
    let raf = 0;
    let hold: ReturnType<typeof setTimeout>;
    const tick = (now: number) => {
      const t = Math.min((now - start) / COUNT_MS, 1);
      // ease-in-out so it starts quick, breathes in the middle and lands softly
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setCount(Math.round(e * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else hold = setTimeout(() => setDone(true), HOLD_MS);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hold);
    };
  }, []);

  useEffect(() => {
    if (done) setScrollLocked(false);
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div key="preloader" className="fixed inset-0 z-[90]" exit={{ transition: { duration: 1.2 } }}>
          {/* Curtain columns — lift one after another on exit */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: COLUMNS }).map((_, i) => (
              <motion.div
                key={i}
                className="h-full flex-1 bg-[#040508]"
                style={{ marginLeft: i ? -1 : 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.85, ease, delay: i * 0.07 }}
              />
            ))}
          </div>

          {/* Content fades out first, then the curtain lifts */}
          <motion.div
            className="relative flex h-full flex-col justify-between overflow-hidden p-6 sm:p-10"
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.45, ease: soft }}
          >
            {/* Orbit rings */}
            <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
              {[340, 520, 720].map((size, i) => (
                <motion.div
                  key={size}
                  className="absolute rounded-full border border-white/[0.06]"
                  style={{ width: size, height: size }}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, rotate: i % 2 ? -360 : 360 }}
                  transition={{
                    scale: { duration: 1.4, ease: soft, delay: 0.1 * i },
                    opacity: { duration: 1.4, delay: 0.1 * i },
                    rotate: { duration: 14 + i * 6, ease: "linear", repeat: Infinity },
                  }}
                >
                  <span
                    className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
                    style={{
                      background: ["#67e8f9", "#a78bfa", "#f0abfc"][i],
                      boxShadow: `0 0 18px ${["#67e8f9", "#a78bfa", "#f0abfc"][i]}`,
                    }}
                  />
                </motion.div>
              ))}
              <div
                className="absolute h-[30rem] w-[30rem]"
                style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.18), transparent)" }}
              />
            </div>

            {/* Top meta */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: soft }}
              className="relative flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted"
            >
              <span>Portfolio © {new Date().getFullYear()}</span>
              <span className="hidden sm:inline">{profile.currentRole}</span>
              <span>{profile.location}</span>
            </motion.div>

            {/* Name + cycling word */}
            <div className="relative text-center">
              <h1 className="font-display text-[15vw] font-bold leading-[0.9] tracking-tighter sm:text-[10vw]">
                <span className="inline-flex overflow-hidden pb-[0.08em]">
                  {profile.firstName.split("").map((ch, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={{ y: "110%", rotate: 10 }}
                      animate={{ y: 0, rotate: 0 }}
                      transition={{ duration: 1, ease: soft, delay: 0.15 + i * 0.05 }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>{" "}
                <span className="inline-flex overflow-hidden pb-[0.08em]">
                  {profile.lastName.split("").map((ch, i) => (
                    <motion.span
                      key={i}
                      className="inline-block font-serif font-normal italic gradient-flow"
                      initial={{ y: "110%", rotate: 10 }}
                      animate={{ y: 0, rotate: 0 }}
                      transition={{ duration: 1, ease: soft, delay: 0.5 + i * 0.05 }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <div className="mt-6 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted sm:text-sm">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan" />
                <span className="relative inline-block h-[1.5em] w-[22ch] overflow-hidden">
                  <AnimatePresence initial={false}>
                    <motion.span
                      key={word}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.4, ease: soft }}
                      className="absolute inset-0 whitespace-nowrap text-center text-cyan"
                    >
                      {word}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-violet" />
              </div>
            </div>

            {/* Counter + progress */}
            <div className="relative">
              <div className="mb-4 flex items-end justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                  Loading experience
                </span>
                <span className="font-display text-6xl font-bold tabular-nums leading-none sm:text-8xl">
                  {String(count).padStart(3, "0")}
                  <span className="gradient-text">%</span>
                </span>
              </div>
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan via-violet to-fuchsia-400 shadow-[0_0_12px_rgba(167,139,250,0.8)]"
                  style={{ width: `${count}%` }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
