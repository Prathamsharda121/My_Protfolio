"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Word-by-word masked reveal. Each word slides up from behind a clip.
 * `animateOnMount` plays immediately (hero); otherwise it plays on scroll.
 */
export function SplitText({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.06,
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  animateOnMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const trigger = animateOnMount
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-60px" } };

  return (
    <motion.span
      className={className}
      aria-label={text}
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{
              hidden: { y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 },
              show: { y: 0, opacity: 1, transition: { duration: 0.9, ease } },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
