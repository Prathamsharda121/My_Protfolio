"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Layers } from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const categoryColor: Record<string, string> = {
  Product: "text-cyan bg-cyan/10 border-cyan/20",
  AI: "text-violet-soft bg-violet/10 border-violet/20",
  Data: "text-blue bg-blue/10 border-blue/20",
};

function ProjectCard({ project, big }: { project: Project; big?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mx}% ${my}%, rgba(34,211,238,0.12), transparent 70%)`;

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
    mx.set(px * 100);
    my.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/20 ${
        big ? "md:p-8" : ""
      }`}
    >
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-cyan ring-1 ring-white/10">
            <Layers className="h-5 w-5" />
          </span>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
              categoryColor[project.category] ?? "text-muted bg-white/5 border-white/10"
            }`}
          >
            {project.category}
          </span>
        </div>
        <ArrowUpRight className="h-5 w-5 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
      </div>

      <h3
        className={`relative z-10 mt-5 font-display font-semibold tracking-tight ${
          big ? "text-2xl" : "text-xl"
        }`}
      >
        {project.title}
      </h3>
      <p className="relative z-10 mt-1 font-mono text-xs text-cyan/80">{project.tagline}</p>

      <p className="relative z-10 mt-3 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="relative z-10 mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-ink/75"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected Work"
          title="Things I've designed, built & shipped."
          description="Real products solving real operational problems — from client ticketing to AI automation and analytics."
        />

        {/* Featured */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="h-full">
              <ProjectCard project={p} big />
            </Reveal>
          ))}
        </div>

        {/* Rest */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
