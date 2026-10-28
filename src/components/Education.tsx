"use client";

import { GraduationCap, Award, ArrowUpRight } from "lucide-react";
import { education, certifications } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Spotlight } from "@/components/ui/Spotlight";

export function Education() {
  return (
    <section id="education" className="relative scroll-mt-24 px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="06" eyebrow="Education & credentials" title="The" accent="foundation." />

        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.08} className="h-full">
              <Spotlight className="group relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-7 sm:p-9">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-cyan/10 text-cyan">
                    <GraduationCap className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-xs text-faint">{e.period}</span>
                </div>
                <h3 className="mt-8 font-display text-5xl font-bold tracking-tight sm:text-6xl">{e.degree}</h3>
                <p className="mt-2 text-muted">{e.field}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <p className="font-serif text-lg italic text-cyan">{e.institute}</p>
                  <span className="rounded-full bg-gradient-to-r from-cyan/20 to-violet/20 px-3 py-1 text-sm font-semibold text-cyan-soft">
                    {e.score}
                  </span>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 flex items-center gap-3">
            <Award className="h-5 w-5 text-violet-soft" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Certifications</span>
          </div>
        </Reveal>
        <div className="mt-6 border-t border-white/10">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="group flex items-center justify-between gap-4 border-b border-white/10 py-6 transition-colors hover:bg-white/[0.02]">
                <div className="flex items-center gap-5">
                  <span className="font-mono text-xs text-faint">0{i + 1}</span>
                  <div>
                    <h4 className="font-display text-xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-2xl">
                      {c.title}
                    </h4>
                    <p className="text-sm text-muted">{c.issuer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-faint">{c.date}</span>
                  <ArrowUpRight className="h-5 w-5 text-faint transition-all duration-500 group-hover:rotate-45 group-hover:text-cyan" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
