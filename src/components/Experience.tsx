"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experiences } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Spotlight } from "@/components/ui/Spotlight";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative scroll-mt-24 px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="03" eyebrow="Experience" title="Where I've been" accent="shipping." />

        <div ref={ref} className="relative mt-16 pl-10 sm:pl-16">
          {/* Rail + scroll-linked glowing fill */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10 sm:left-6" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-3 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-cyan via-violet to-fuchsia-400 shadow-[0_0_12px_rgba(103,232,249,0.8)] sm:left-6"
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <Reveal key={`${exp.company}-${exp.role}`} delay={0.05}>
                <div className="relative">
                  {/* Node */}
                  <span
                    className={`absolute -left-10 top-8 grid h-6 w-6 ml-3 -translate-x-1/2 place-items-center rounded-full border sm:-left-16 sm:ml-6 ${
                      exp.current ? "border-cyan bg-cyan/20" : "border-white/20 bg-bg"
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${exp.current ? "bg-cyan animate-pulse" : "bg-white/40"}`} />
                  </span>

                  <Spotlight
                    className={`rounded-3xl border p-6 sm:p-9 ${
                      exp.current
                        ? "border-cyan/25 bg-gradient-to-br from-cyan/[0.07] via-violet/[0.05] to-transparent"
                        : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs text-faint">0{experiences.length - i}</span>
                          {exp.current ? (
                            <span className="rounded-full bg-gradient-to-r from-cyan to-violet px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#04060a]">
                              Current
                            </span>
                          ) : (
                            <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] uppercase tracking-wider text-muted">
                              {exp.period}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                          {exp.role}
                        </h3>
                        <p className="mt-1 font-serif text-xl italic text-cyan">{exp.company}</p>
                        <p className="mt-4 text-sm leading-relaxed text-muted">{exp.summary}</p>
                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {exp.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-muted"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {exp.highlights.map((h, j) => (
                          <motion.li
                            key={h}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.6, delay: j * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className="flex gap-3 rounded-2xl border border-white/5 bg-black/20 p-4 text-sm leading-relaxed text-ink/85"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan to-violet" />
                            {h}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </Spotlight>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
