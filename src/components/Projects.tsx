"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Bot, LayoutDashboard, MessageSquare, Ticket, Sparkles, BarChart3 } from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Spotlight } from "@/components/ui/Spotlight";

const categoryColor: Record<string, string> = {
  Product: "text-cyan bg-cyan/10 border-cyan/20",
  AI: "text-violet-soft bg-violet/10 border-violet/20",
  Data: "text-blue bg-blue/10 border-blue/20",
  Automation: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
};
const glow: Record<string, string> = {
  Product: "rgba(34,211,238,0.22)",
  AI: "rgba(139,92,246,0.28)",
  Data: "rgba(59,130,246,0.22)",
  Automation: "rgba(52,211,153,0.18)",
};
const featuredIcons = [LayoutDashboard, Bot, MessageSquare, Ticket, Sparkles, BarChart3];

// Bento: 3-col grid where wide cards alternate sides.
const spans = ["lg:col-span-2", "", "", "lg:col-span-2", "lg:col-span-2", ""];

/** Subtle 3D tilt toward the cursor (transform-only, GPU cheap). */
function Tilt({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 20 });
  const sry = useSpring(ry, { stiffness: 160, damping: 20 });
  return (
    <div className="h-full [perspective:1400px]">
      <motion.div
        ref={ref}
        style={{ rotateX: srx, rotateY: sry }}
        onMouseMove={(e) => {
          if (reduce || !ref.current) return;
          const r = ref.current.getBoundingClientRect();
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 6);
          rx.set(-((e.clientY - r.top) / r.height - 0.5) * 6);
        }}
        onMouseLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

function FeaturedCard({ project, i }: { project: Project; i: number }) {
  const Icon = featuredIcons[i % featuredIcons.length];
  const wide = spans[i] !== "";
  return (
    <Tilt>
    <Spotlight
      className={`group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0c13] p-7 sm:p-9`}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 transition-transform duration-700 group-hover:scale-125"
        style={{ background: `radial-gradient(closest-side, ${glow[project.category] ?? glow.Product}, transparent)` }}
      />
      {/* Giant index number */}
      <span className="text-outline pointer-events-none absolute -top-6 right-24 font-display text-[8rem] font-bold leading-none opacity-25 transition-all duration-700 group-hover:-translate-y-3 group-hover:opacity-70">
        0{i + 1}
      </span>

      <div className="relative flex items-center justify-between">
        <span
          className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${
            categoryColor[project.category] ?? "border-white/10 bg-white/5 text-muted"
          }`}
        >
          {project.category}
        </span>
        <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-cyan group-hover:to-violet group-hover:text-[#04060a]">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>

      <div className="relative mt-auto pt-14">
        <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-cyan">
          <Icon className="h-6 w-6" />
        </span>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan/80">{project.tagline}</p>
        <h3
          className={`mt-2 font-display font-semibold leading-[1.05] tracking-tight ${
            wide ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
          }`}
        >
          {project.title}
        </h3>
        <p className={`mt-4 text-sm leading-relaxed text-muted ${wide ? "max-w-xl" : ""}`}>
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-black/30 px-2 py-1 font-mono text-[11px] text-ink/70"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Spotlight>
    </Tilt>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="relative scroll-mt-24 px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="05"
            eyebrow="Selected work"
            title="Things I've built"
            accent="& shipped."
            description="CRMs built from scratch, AI agents that lift sales, and Slack automations teams use every day."
          />
          <Reveal>
            <span className="font-mono text-sm text-muted">
              ({String(projects.length).padStart(2, "0")}) projects
            </span>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08} className={`h-full ${spans[i] ?? ""}`}>
              <div data-cursor="View" className="h-full">
                <FeaturedCard project={p} i={i} />
              </div>
            </Reveal>
          ))}
        </div>

        {/* More projects — editorial list */}
        {rest.length > 0 && (
          <div className="mt-24">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">More experiments</p>
            </Reveal>
            <div className="mt-6 border-t border-white/10">
              {rest.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.05}>
                  <motion.div
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    className="group relative grid cursor-default items-center gap-3 overflow-hidden border-b border-white/10 py-7 sm:grid-cols-[auto_1fr_auto] sm:gap-10"
                  >
                    <motion.span
                      variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 -z-10 origin-bottom bg-gradient-to-r from-cyan/10 via-violet/10 to-transparent"
                    />
                    <span className="font-mono text-sm text-faint">0{featured.length + i + 1}</span>
                    <div>
                      <h4 className="font-display text-2xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-3 sm:text-4xl">
                        {p.title}
                      </h4>
                      <p className="mt-2 max-w-2xl text-sm text-muted">{p.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
                          {t}
                        </span>
                      ))}
                      <ArrowUpRight className="h-6 w-6 text-faint transition-all duration-500 group-hover:rotate-45 group-hover:text-cyan" />
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
