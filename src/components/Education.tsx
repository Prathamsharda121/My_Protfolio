"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { education, certifications } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Education() {
  return (
    <section id="education" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Education & Credentials" title="The foundation." />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Education */}
          <Reveal>
            <div className="glass h-full rounded-2xl p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-cyan/10 text-cyan">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold">Education</h3>
              </div>
              <div className="space-y-5">
                {education.map((e) => (
                  <div
                    key={e.degree}
                    className="relative rounded-xl border border-white/8 bg-white/[0.02] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-display font-semibold">
                          {e.degree}{" "}
                          <span className="font-sans text-sm font-normal text-muted">
                            — {e.field}
                          </span>
                        </h4>
                        <p className="mt-0.5 text-sm text-cyan">{e.institute}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-gradient-to-r from-cyan/15 to-violet/15 px-2.5 py-1 text-xs font-semibold text-cyan-soft">
                        {e.score}
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-xs text-faint">{e.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Certifications */}
          <Reveal delay={0.08}>
            <div className="glass h-full rounded-2xl p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-violet/10 text-violet-soft">
                  <Award className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold">Certifications</h3>
              </div>
              <div className="space-y-3">
                {certifications.map((c) => (
                  <motion.div
                    key={c.title}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4 transition-colors hover:border-violet/25"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan to-violet" />
                      <div>
                        <h4 className="text-sm font-medium text-ink">{c.title}</h4>
                        <p className="text-xs text-muted">{c.issuer}</p>
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-faint">{c.date}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
