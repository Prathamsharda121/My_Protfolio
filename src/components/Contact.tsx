"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, ArrowUpRight, Copy, Check, Download } from "lucide-react";
import { contact, profile } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Scramble } from "@/components/ui/Scramble";

const channels = [
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}`, copyable: true },
  { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phoneHref}`, copyable: true },
  { icon: Linkedin, label: "LinkedIn", value: "in/pratham-sharda", href: contact.linkedin, external: true },
  { icon: Github, label: "GitHub", value: "Prathamsharda121", href: contact.github, external: true },
];

/** Big circular CTA that is pulled toward the cursor. */
function MagneticCircle() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });

  return (
    <motion.a
      ref={ref}
      href={`mailto:${contact.email}`}
      data-cursor="Write"
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.4);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="group relative grid h-40 w-40 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-cyan via-violet to-fuchsia-400 text-[#04060a] shadow-[0_20px_80px_-10px_rgba(139,92,246,0.7)] sm:h-52 sm:w-52"
    >
      <span className="absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-500 ease-out group-hover:scale-y-100" />
      <span className="relative flex flex-col items-center gap-1 font-display text-lg font-bold sm:text-xl">
        <ArrowUpRight className="h-7 w-7 transition-transform duration-500 group-hover:rotate-45" />
        Say hello
      </span>
    </motion.a>
  );
}

export function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden px-5 py-28 sm:px-8 sm:py-40">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.16), transparent)" }}
      />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-cyan">07</span>
            <span className="h-px w-10 bg-gradient-to-r from-cyan to-violet" />
            <Scramble text="CONTACT" className="font-mono text-xs uppercase tracking-[0.25em] text-muted" />
          </div>
        </Reveal>

        <div className="mt-8 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-[13vw] font-bold leading-[0.92] tracking-[-0.04em] sm:text-8xl lg:text-[8.5rem]">
            <SplitText text="Let's build" />
            <br />
            <SplitText text="something" delay={0.15} />{" "}
            <SplitText text="great." delay={0.3} wordClassName="font-serif font-normal italic gradient-flow pr-2" />
          </h2>
          <Reveal delay={0.3}>
            <MagneticCircle />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted">
            Got a product to ship, a sales workflow to automate, or an AI agent idea worth exploring? I&apos;d love
            to hear about it.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06} className="h-full">
              <div className="group relative flex h-full flex-col justify-between gap-8 bg-[#07080d] p-6 transition-colors duration-500 hover:bg-[#0c0e16]">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-cyan transition-transform duration-500 group-hover:scale-110">
                    <c.icon className="h-5 w-5" />
                  </span>
                  {c.copyable ? (
                    <button
                      onClick={() => copy(c.value)}
                      aria-label={`Copy ${c.label}`}
                      data-cursor="Copy"
                      className="grid h-9 w-9 place-items-center rounded-lg text-faint transition-colors hover:bg-white/5 hover:text-cyan"
                    >
                      {copied === c.value ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                  ) : (
                    <ArrowUpRight className="h-5 w-5 text-faint transition-all duration-500 group-hover:rotate-45 group-hover:text-cyan" />
                  )}
                </div>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="min-w-0"
                >
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-faint">{c.label}</span>
                  <span className="mt-1 block truncate text-base font-medium text-ink transition-colors group-hover:text-cyan">
                    {c.value}
                  </span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <a
            href={profile.resume}
            download
            className="group mt-6 flex items-center justify-between rounded-3xl border border-white/10 bg-gradient-to-r from-cyan/[0.08] via-violet/[0.08] to-transparent px-6 py-6 transition-colors hover:border-cyan/30 sm:px-8"
          >
            <span className="flex items-center gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-cyan">
                <Download className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-xl font-semibold">Download my résumé</span>
              </span>
            </span>
            <ArrowUpRight className="h-6 w-6 text-muted transition-all duration-500 group-hover:rotate-45 group-hover:text-cyan" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
