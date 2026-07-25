"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { about, stats } from "@/lib/content";
import { Reveal, StaggerGroup, staggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="Building at the intersection of AI, data & operations."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-muted sm:text-lg">
                {p}
              </p>
            ))}

            <div className="flex flex-wrap gap-2.5 pt-2">
              {about.focus.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-ink"
                >
                  <CheckCircle2 className="h-4 w-4 text-cyan" />
                  {f}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Stats */}
          <StaggerGroup className="grid grid-cols-2 gap-4 self-start">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={staggerItem}
                className="glass group relative overflow-hidden rounded-2xl p-5 transition-colors hover:border-cyan/30"
              >
                <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-cyan/10 blur-xl transition-opacity group-hover:opacity-100" />
                <div className="font-display text-4xl font-bold tracking-tight">
                  <span className="gradient-text">{s.value}</span>
                  <span className="text-xl text-muted">{s.suffix}</span>
                </div>
                <div className="mt-1 text-sm text-muted">{s.label}</div>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
