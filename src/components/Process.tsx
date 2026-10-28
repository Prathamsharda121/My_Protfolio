"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Search, PenTool, Hammer, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLenis } from "@/components/SmoothScroll";

const steps = [
  {
    icon: Search,
    title: "Discover",
    text: "Sit with sales & ops teams, map the real workflow and find exactly where time and revenue leak.",
    points: ["Shadow the team", "Map the funnel", "Find the bottleneck"],
  },
  {
    icon: PenTool,
    title: "Design",
    text: "Turn the problem into a product — data model, agent prompts, Slack touchpoints and success metrics.",
    points: ["Data model", "Agent prompts", "Success metrics"],
  },
  {
    icon: Hammer,
    title: "Build",
    text: "Ship fast with Next.js, Supabase and Claude — CRMs, AI agents and automations running in production.",
    points: ["CRM from scratch", "AI agents", "Slack automations"],
  },
  {
    icon: TrendingUp,
    title: "Scale",
    text: "Measure adoption and impact, iterate on prompts and flows, then roll out across every team.",
    points: ["Track adoption", "Iterate weekly", "Roll out org-wide"],
  },
];

function StepCard({ step, i }: { step: (typeof steps)[number]; i: number }) {
  const Icon = step.icon;
  return (
    <div className="group relative flex h-full w-full shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-7 sm:p-10 md:w-[34rem]">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 transition-transform duration-700 group-hover:scale-125"
        style={{
          background: `radial-gradient(closest-side, ${
            ["rgba(34,211,238,0.2)", "rgba(139,92,246,0.24)", "rgba(240,171,252,0.18)", "rgba(52,211,153,0.18)"][i]
          }, transparent)`,
        }}
      />
      <div className="relative flex items-start justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/5 text-cyan transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
          <Icon className="h-7 w-7" />
        </span>
        <span className="text-outline font-display text-8xl font-bold leading-none sm:text-9xl">0{i + 1}</span>
      </div>
      <div className="relative mt-16">
        <h3 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {step.title}
          <span className="font-serif font-normal italic gradient-text">.</span>
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{step.text}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {step.points.map((p) => (
            <span key={p} className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-ink/80">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * "How I work" — on desktop the section pins and the cards slide horizontally
 * as you scroll. On small screens it falls back to a vertical stack.
 */
export function Process() {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      setDistance(desktop ? Math.max(track.current.scrollWidth - window.innerWidth + 80, 0) : 0);
    };
    measure();
    // Re-measure once fonts/layout settle (card widths depend on them).
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // If the visitor pauses while the section is pinned, glide to the next card
  // every couple of seconds until every step has been shown. Any wheel/touch/key
  // input hands control straight back to the user.
  useEffect(() => {
    if (!distance) return;
    let lastInput = performance.now();
    const onInput = () => (lastInput = performance.now());
    const inputs = ["wheel", "touchmove", "keydown", "mousedown"] as const;
    inputs.forEach((e) => window.addEventListener(e, onInput, { passive: true }));

    const id = setInterval(() => {
      const el = outer.current;
      const lenis = getLenis();
      if (!el || !lenis) return;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const pinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!pinned || travel <= 0 || performance.now() - lastInput < 2200) return;
      const progress = -rect.top / travel;
      if (progress >= 0.995) return;
      const n = steps.length - 1;
      const next = Math.min(Math.floor(progress * n + 0.05) + 1, n);
      const top = window.scrollY + rect.top;
      lastInput = performance.now() + 400; // wait for this glide before the next one
      lenis.scrollTo(top + (next / n) * travel, { duration: 1.6 });
    }, 400);

    return () => {
      clearInterval(id);
      inputs.forEach((e) => window.removeEventListener(e, onInput));
    };
  }, [distance]);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={outer}
      id="process"
      className="relative"
      // Pinned height: one viewport plus the horizontal distance to travel.
      style={{ height: distance ? `calc(100vh + ${Math.round(distance * 1.6)}px)` : undefined }}
    >
      <div className={distance ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : ""}>
        <div className="w-full px-5 pt-24 sm:px-8 md:pt-0">
          <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6">
            <SectionHeading index="04" eyebrow="How I work" title="From messy ops to" accent="shipped AI." />
            {distance > 0 && (
              <div className="hidden w-48 md:block">
                <div className="mb-2 flex justify-between font-mono text-[11px] uppercase tracking-widest text-faint">
                  <span>Process</span>
                  <span>Scroll →</span>
                </div>
                <div className="h-px w-full bg-white/10">
                  <motion.div style={{ width: bar }} className="h-px bg-gradient-to-r from-cyan to-violet" />
                </div>
              </div>
            )}
          </div>
        </div>

        <motion.div
          ref={track}
          style={{ x }}
          className="mt-12 flex flex-col gap-4 px-5 pb-24 sm:px-8 md:h-[26rem] md:w-max md:flex-row md:pb-0 md:pl-[max(2rem,calc((100vw-80rem)/2))]"
        >
          {steps.map((s, i) => (
            <StepCard key={s.title} step={s} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
