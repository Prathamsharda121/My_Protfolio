"use client";

import { motion } from "framer-motion";
import { Bot, Database, Code2, Server, Rocket } from "lucide-react";
import { skillGroups } from "@/lib/content";
import { Reveal, StaggerGroup, staggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Spotlight } from "@/components/ui/Spotlight";

const icons = [Bot, Database, Code2, Server, Rocket];

const accentText: Record<string, string> = {
  cyan: "text-cyan",
  violet: "text-violet-soft",
  blue: "text-blue",
};
const accentBg: Record<string, string> = {
  cyan: "from-cyan/20",
  violet: "from-violet/25",
  blue: "from-blue/20",
};

// Bento spans: first card is the hero card.
const spans = ["lg:col-span-2", "", "", "", ""];

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          eyebrow="Toolkit"
          title="The stack behind"
          accent="the magic."
          description="From LLM prompts to production databases — the tools I use to take an idea from whiteboard to shipped."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = icons[i % icons.length];
            const big = i === 0;
            return (
              <Reveal key={g.title} delay={i * 0.06} className={`h-full ${spans[i] ?? ""}`}>
                <Spotlight
                  className={`group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${accentBg[g.accent]} via-white/[0.02] to-transparent p-6 sm:p-7`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 ${accentText[g.accent]} transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                  </div>
                  <h3
                    className={`mt-6 font-display font-semibold tracking-tight ${big ? "text-3xl sm:text-4xl" : "text-xl"}`}
                  >
                    {g.title}
                  </h3>
                  {big && (
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                      My core craft — designing AI agents and LLM workflows that do real work for sales and ops teams.
                    </p>
                  )}
                  <StaggerGroup className="mt-5 flex flex-wrap gap-2" stagger={0.04}>
                    {g.skills.map((s) => (
                      <motion.span
                        key={s}
                        variants={staggerItem}
                        className={`rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-ink/85 transition-colors hover:border-white/30 hover:text-white ${
                          big ? "text-sm" : "text-xs"
                        }`}
                      >
                        {s}
                      </motion.span>
                    ))}
                  </StaggerGroup>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
