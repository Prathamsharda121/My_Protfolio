"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { profile, contact } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";

function RotatingRole() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-text inline-block font-display font-bold"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const floatingChips = [
  { label: "AI Tools", top: "6%", left: "-10%", delay: 0 },
  { label: "ML", top: "34%", left: "-15%", delay: 0.6 },
  { label: "Python", bottom: "16%", left: "-10%", delay: 1.2 },
  { label: "SQL", top: "12%", right: "-9%", delay: 0.3 },
  { label: "Analytics", bottom: "22%", right: "-13%", delay: 0.9 },
];

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-28 pb-16 sm:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left: copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to building great products
            </span>
          </motion.div>

          <motion.p variants={item} className="mt-6 flex items-center gap-2 text-sm text-muted">
            <Sparkles className="h-4 w-4 text-cyan" />
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-2 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="gradient-text-soft">{profile.firstName}</span>
            <br />
            {profile.lastName}
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-4 text-xl font-medium text-ink sm:text-2xl md:text-3xl"
          >
            <RotatingRole />
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.subheadline}
          </motion.p>

          <motion.div variants={item} className="mt-6 flex items-center gap-2 text-sm text-faint">
            <MapPin className="h-4 w-4" />
            {profile.location}
            <span className="mx-1 h-1 w-1 rounded-full bg-faint" />
            <span className="text-muted">
              Currently <span className="text-cyan">@ {profile.currentCompany}</span>
            </span>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton href="#work" variant="primary">
              View my work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </MagneticButton>
            <MagneticButton href={profile.resume} variant="ghost" download ariaLabel="Download résumé">
              <Download className="h-4 w-4" />
              Résumé
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-3">
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
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-muted transition-all hover:-translate-y-0.5 hover:border-cyan/40 hover:text-cyan"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          <div className="relative aspect-[4/5] w-full">
            {/* Glow ring */}
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan/30 via-violet/20 to-blue/30 blur-2xl" />

            <div className="conic-border h-full w-full overflow-hidden rounded-[2rem] ring-glow">
              <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 380px, 440px"
                  className="object-cover object-[center_20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-70" />
              </div>
            </div>

            {/* Floating tech chips */}
            {!reduce &&
              floatingChips.map((chip, i) => (
                <motion.div
                  key={chip.label}
                  className="animate-float-slow absolute hidden rounded-xl border border-white/10 bg-[#0b0e16]/80 px-3 py-1.5 text-xs font-medium text-ink shadow-lg backdrop-blur-md sm:block"
                  style={{
                    top: chip.top,
                    left: chip.left,
                    right: chip.right,
                    bottom: chip.bottom,
                    animationDelay: `${chip.delay}s`,
                  }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                >
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan align-middle" />
                  {chip.label}
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint sm:flex"
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/15 pt-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1 rounded-full bg-cyan"
          />
        </span>
      </motion.a>
    </section>
  );
}
