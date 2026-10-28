"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile, contact } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NeuralBackground } from "@/components/NeuralBackground";
import { PRELOADER_TOTAL } from "@/components/Preloader";

const ease = [0.16, 1, 0.3, 1] as const;
// Hero animations start as the preloader curtain lifts.
const INTRO_DELAY = PRELOADER_TOTAL + 0.15;

function RotatingRole() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.55, ease }}
          className="gradient-flow inline-block whitespace-nowrap font-serif italic"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Live feed of what the AI agents are doing — cycles through events. */
const agentEvents = [
  { tag: "CRM", text: "New lead scored 92 → assigned to top closer" },
  { tag: "AGENT", text: "Follow-up drafted for 14 warm leads" },
  { tag: "SLACK", text: "#sales-daily · pipeline summary posted" },
  { tag: "AGENT", text: "Call notes summarised · next step logged" },
  { tag: "SLACK", text: "Alert: 3 hot leads idle > 2h → nudged" },
  { tag: "CRM", text: "Ticket auto-routed to Relationship Manager" },
];
const tagColor: Record<string, string> = {
  CRM: "text-cyan bg-cyan/10",
  AGENT: "text-violet-soft bg-violet/15",
  SLACK: "text-emerald-300 bg-emerald-400/10",
};

function AgentFeed() {
  const [items, setItems] = useState(() => agentEvents.slice(0, 3).map((e, i) => ({ ...e, id: i })));
  const counter = useRef(3);

  useEffect(() => {
    const id = setInterval(() => {
      const n = counter.current++;
      const next = { ...agentEvents[n % agentEvents.length], id: n };
      setItems((prev) => [next, ...prev].slice(0, 3));
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-[300px] rounded-2xl border border-white/10 bg-[#07090f]/95 p-4 shadow-2xl shadow-black/60">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            AI agents · live
          </span>
        </div>
        <span className="font-mono text-[10px] text-faint">fitelo/ops</span>
      </div>
      <div className="relative h-[132px] overflow-hidden">
        <AnimatePresence initial={false}>
          {items.map((it, i) => (
            <motion.div
              key={it.id}
              layout
              initial={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              animate={{ opacity: 1 - i * 0.3, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mb-2 flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-2"
            >
              <span
                className={`mt-px shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold ${tagColor[it.tag]}`}
              >
                {it.tag}
              </span>
              <span className="text-[12px] leading-snug text-ink/85">{it.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Letters({ word, delay, className = "" }: { word: string; delay: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`inline-flex overflow-hidden pt-[0.14em] pb-[0.06em] ${className}`} aria-hidden>
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: reduce ? 0 : "105%", rotate: reduce ? 0 : 8 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 1.1, ease, delay: delay + i * 0.045 }}
        >
          <span className="inline-block transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[0.12em] hover:text-cyan-soft">
            {ch}
          </span>
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const INTRO = reduce ? 0 : INTRO_DELAY;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // 3D tilt on the portrait
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const onTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 16);
  };

  const fadeUp = (d: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease, delay: INTRO + d },
  });

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pt-28 pb-10 sm:px-8"
    >
      {/* Interactive neural net */}
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_45%,#000_40%,transparent_100%)]">
        <NeuralBackground />
      </div>

      <motion.div style={{ opacity: fade }} className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
        {/* Top meta row */}
        <motion.div
          {...fadeUp(0)}
          className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 normal-case tracking-normal">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-sans text-xs text-ink/80">
              Recently promoted · <span className="text-cyan">{profile.currentRole}</span>
            </span>
          </span>
          <span className="hidden sm:inline">Based in {profile.location} · @{profile.currentCompany}</span>
        </motion.div>

        <div className="relative mt-10 grid flex-1 items-center gap-10 lg:mt-4 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Name block */}
          <motion.div style={{ y: nameY }} className="relative z-10">
            <h1 aria-label={profile.name} className="font-display font-bold leading-[0.88] tracking-[-0.045em]">
              <Letters word={profile.firstName} delay={INTRO - 0.2} className="text-[17vw] sm:text-[15vw] lg:text-[10.5rem] xl:text-[12rem]" />
              <br />
              <span className="inline-flex items-baseline gap-4">
                <Letters
                  word={profile.lastName}
                  delay={INTRO}
                  className="font-serif text-[17vw] font-normal italic tracking-[-0.02em] text-ink/90 sm:text-[15vw] lg:text-[10.5rem] xl:text-[12rem]"
                />
                <motion.span
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.9, ease, delay: INTRO + 0.5 }}
                  className="hidden h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan via-violet to-fuchsia-400 text-[#04060a] sm:grid lg:h-20 lg:w-20"
                >
                  <ArrowDownRight className="h-8 w-8" />
                </motion.span>
              </span>
            </h1>

            <motion.div {...fadeUp(0.35)} className="mt-6 text-2xl text-ink sm:text-3xl md:text-4xl">
              <span className="text-muted">I&apos;m a </span>
              <RotatingRole />
            </motion.div>

            <motion.p {...fadeUp(0.45)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.subheadline}
            </motion.p>

            <motion.div {...fadeUp(0.55)} className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticButton href="#work" variant="primary">
                Explore my work
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:rotate-[-45deg]" />
              </MagneticButton>
              <MagneticButton href={profile.resume} variant="ghost" download ariaLabel="Download résumé">
                <Download className="h-4 w-4" />
                Download résumé
              </MagneticButton>
              <div className="ml-1 flex items-center gap-2">
                {[
                  { icon: Github, href: contact.github, label: "GitHub" },
                  { icon: Linkedin, href: contact.linkedin, label: "LinkedIn" },
                  { icon: Mail, href: `mailto:${contact.email}`, label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-muted transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:bg-cyan/10 hover:text-cyan"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Portrait + live agent feed */}
          <motion.div
            style={{ y: photoY }}
            className="relative mx-auto w-full max-w-[340px] [perspective:1200px] lg:max-w-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, clipPath: "inset(100% 0% 0% 0% round 2rem)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(-20% -20% -20% -20% round 2rem)" }}
              transition={{ duration: 1.4, ease, delay: INTRO - 0.1 }}
            >
            <motion.div
              onMouseMove={onTilt}
              onMouseLeave={() => {
                rx.set(0);
                ry.set(0);
              }}
              style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
              className="relative"
              data-cursor="Hi!"
            >
              <div
                className="absolute -inset-16 -z-10"
                style={{
                  background:
                    "radial-gradient(closest-side at 30% 30%, rgba(34,211,238,0.3), transparent), radial-gradient(closest-side at 75% 75%, rgba(192,132,252,0.3), transparent)",
                }}
              />
              <div className="conic-border rounded-[2rem]">
                <div className="sheen relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
                  <Image
                    src={profile.photo}
                    alt={profile.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 340px, 420px"
                    className="scale-105 object-cover object-[center_22%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#05060a]/85 via-transparent to-[#05060a]/70" />
                  <div className="absolute inset-x-0 top-0 p-5 text-right" style={{ transform: "translateZ(40px)" }}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">Now</p>
                    <p className="mt-1 font-display text-lg font-semibold leading-tight">
                      {profile.currentRole}
                    </p>
                    <p className="text-sm text-muted">@ {profile.currentCompany}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease, delay: INTRO + 0.7 }}
              className="absolute -bottom-12 -left-48 z-20 hidden xl:block"
            >
              <AgentFeed />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          {...fadeUp(0.9)}
          className="mt-12 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-faint"
        >
          <span>Scroll to explore</span>
          <span className="flex items-center gap-3">
            <span className="relative h-10 w-px overflow-hidden bg-white/10">
              <motion.span
                className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-transparent to-cyan"
                animate={{ y: [-16, 40] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </span>
          <span className="hidden sm:inline">AI · CRM · Automation</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
