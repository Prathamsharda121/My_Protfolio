"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  download?: boolean;
  external?: boolean;
  ariaLabel?: string;
};

/** Button/link with a subtle magnetic pull toward the cursor. */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  download,
  external,
  ariaLabel,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300 will-change-transform";
  const styles =
    variant === "primary"
      ? "text-[#04060a] bg-gradient-to-r from-cyan-soft to-violet-soft shadow-[0_8px_30px_-6px_rgba(103,232,249,0.5)] hover:shadow-[0_10px_44px_-6px_rgba(139,92,246,0.6)]"
      : "text-ink border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25";

  const inner = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>;

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          aria-label={ariaLabel}
          className={`${base} ${styles} ${className}`}
          {...(download ? { download: "" } : {})}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {inner}
        </a>
      ) : (
        <button aria-label={ariaLabel} onClick={onClick} className={`${base} ${styles} ${className}`}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
