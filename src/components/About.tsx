"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { about, stats } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Spotlight } from "@/components/ui/Spotlight";
import { Scramble } from "@/components/ui/Scramble";

const manifesto =
  "I find where sales and operations break — then I ship AI agents, CRMs and automations that make teams faster, sharper and sell more.";

function Word({ children, range, progress }: { children: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = manifesto.split(" ");

  return (
    <section id="about" className="relative scroll-mt-24 px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-cyan">01</span>
            <span className="h-px w-10 bg-gradient-to-r from-cyan to-violet" />
            <Scramble text="ABOUT ME" className="font-mono text-xs uppercase tracking-[0.25em] text-muted" />
          </div>
        </Reveal>

        {/* Scroll-highlighted manifesto */}
        <p
          ref={ref}
          className="mt-8 max-w-6xl font-display text-3xl font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl"
        >
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-base leading-relaxed text-muted sm:text-lg">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-2 pt-3">
                {about.focus.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-ink/85"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="h-full">
                <Spotlight className="flex h-full flex-col justify-between gap-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 sm:p-8">
                  <div className="font-display text-5xl font-bold tracking-tight sm:text-6xl">
                    <Counter value={s.value} />
                    <span className="gradient-flow">{s.suffix}</span>
                  </div>
                  <p className="border-t border-white/10 pt-4 text-sm text-muted">{s.label}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
