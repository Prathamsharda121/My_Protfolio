"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/content";
import { Reveal, StaggerGroup, staggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const accentMap: Record<string, string> = {
  cyan: "text-cyan border-cyan/30 shadow-[0_0_20px_-8px_rgba(34,211,238,0.6)]",
  violet: "text-violet-soft border-violet/30 shadow-[0_0_20px_-8px_rgba(139,92,246,0.6)]",
  blue: "text-blue border-blue/30 shadow-[0_0_20px_-8px_rgba(59,130,246,0.6)]",
};

const dotMap: Record<string, string> = {
  cyan: "bg-cyan",
  violet: "bg-violet-soft",
  blue: "bg-blue",
};

// Flattened list for the marquee strip.
const marquee = skillGroups.flatMap((g) => g.skills);

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="A full toolkit — from prompt to production."
          description="I go end-to-end: designing AI features, wiring up data pipelines, shipping the UI and running it in production."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.05}>
              <div className="glass h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${dotMap[group.accent]}`} />
                  <h3 className="font-display text-lg font-semibold">{group.title}</h3>
                </div>
                <StaggerGroup className="flex flex-wrap gap-2" stagger={0.04}>
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={staggerItem}
                      className={`cursor-default rounded-lg border bg-white/[0.03] px-2.5 py-1.5 text-sm text-ink/90 transition-all hover:bg-white/[0.07] ${accentMap[group.accent]}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </StaggerGroup>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Marquee strip */}
      <div className="marquee-mask relative mt-14 flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
          {[...marquee, ...marquee].map((s, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-lg font-medium text-faint/60 transition-colors hover:text-cyan"
            >
              {s}
              <span className="ml-8 text-faint/20">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
