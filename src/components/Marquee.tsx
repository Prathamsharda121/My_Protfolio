"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const rowA = ["AI Agents", "Sales CRM", "Slack Automation", "Product AI", "Prompt Engineering"];
const rowB = ["Claude", "Next.js", "Supabase", "Analytics", "Workflow Automation"];

function Row({ items, outline, direction }: { items: string[]; outline?: boolean; direction: 1 | -1 }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : direction === 1 ? ["0%", "-25%"] : ["-25%", "0%"]);
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ x }} className="flex w-max items-center gap-8 whitespace-nowrap py-2">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className={`font-display text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl ${
                outline ? "text-outline" : i % 2 ? "font-serif font-normal italic gradient-text" : "text-ink"
              }`}
            >
              {t}
            </span>
            <span className="text-3xl text-cyan sm:text-5xl">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Big scroll-driven type strip between hero and content. */
export function Marquee() {
  return (
    <section aria-hidden className="relative -rotate-2 border-y border-white/10 bg-white/[0.015] py-6 sm:py-10">
      <Row items={rowA} direction={1} />
      <Row items={rowB} outline direction={-1} />
    </section>
  );
}
