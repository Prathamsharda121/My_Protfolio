"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/** Counts up from 0 to `value` when scrolled into view. Keeps decimals. */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const target = parseFloat(value);
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;
  const [display, setDisplay] = useState(reduce ? value : (0).toFixed(decimals));

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, reduce, target, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
