"use client";

import { motion } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";
import { experiences } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Experience" title="Where I've been shipping." />

        <div className="relative mt-12">
          {/* Timeline rail */}
          <div className="absolute bottom-0 left-4 top-2 w-px bg-gradient-to-b from-cyan/50 via-violet/30 to-transparent md:left-1/2" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <Reveal key={exp.company} delay={i * 0.05}>
                <div
                  className={`relative grid gap-6 pl-12 md:grid-cols-2 md:pl-0 ${
                    i % 2 === 0 ? "" : "md:[direction:rtl]"
                  }`}
                >
                  {/* Node */}
                  <span className="absolute left-4 top-2 z-10 -translate-x-1/2 md:left-1/2">
                    <span className="relative flex h-4 w-4">
                      {exp.current && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
                      )}
                      <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-bg bg-gradient-to-br from-cyan to-violet" />
                    </span>
                  </span>

                  {/* Card */}
                  <div className={`[direction:ltr] ${i % 2 === 0 ? "md:pr-10" : "md:col-start-2 md:pl-10"}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="glass rounded-2xl p-6 transition-colors hover:border-white/20"
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-cyan">
                            <Briefcase className="h-4 w-4" />
                          </span>
                          <div>
                            <h3 className="font-display text-lg font-semibold leading-tight">
                              {exp.role}
                            </h3>
                            <p className="text-sm text-cyan">{exp.company}</p>
                          </div>
                        </div>
                        <span
                          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${
                            exp.current
                              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                              : "border-white/10 bg-white/5 text-muted"
                          }`}
                        >
                          {exp.period}
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed text-muted">{exp.summary}</p>

                      <ul className="mt-4 space-y-2">
                        {exp.highlights.map((h) => (
                          <li key={h} className="flex gap-2 text-sm leading-relaxed text-ink/85">
                            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-violet-soft" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {exp.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-xs text-muted"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
