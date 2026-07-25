"use client";

import { Mail, Phone, Github, Linkedin, ArrowUpRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { contact, profile } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    copyable: true,
  },
  {
    icon: Phone,
    label: "Phone",
    value: contact.phone,
    href: `tel:${contact.phoneHref}`,
    copyable: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/pratham-sharda",
    href: contact.linkedin,
    external: true,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Prathamsharda121",
    href: contact.github,
    external: true,
  },
];

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
    <section id="contact" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="conic-border relative overflow-hidden rounded-[2rem]">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#0b0e16] to-[#070810] p-8 sm:p-12 md:p-16">
              {/* glow */}
              <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan/20 blur-[100px]" />

              <div className="relative text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-cyan">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Available for opportunities
                </span>
                <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                  Let&apos;s build something <span className="gradient-text">great</span>.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted text-balance">
                  Got a product to ship, a workflow to automate, or an AI idea worth exploring?
                  I&apos;d love to hear about it.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <MagneticButton href={`mailto:${contact.email}`} variant="primary">
                    <Mail className="h-4 w-4" />
                    Say hello
                  </MagneticButton>
                  <MagneticButton href={profile.resume} variant="ghost" download>
                    Download résumé
                    <ArrowUpRight className="h-4 w-4" />
                  </MagneticButton>
                </div>
              </div>

              {/* Channels */}
              <div className="relative mt-10 grid gap-3 sm:grid-cols-2">
                {channels.map((c) => (
                  <div
                    key={c.label}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-cyan/25"
                  >
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex min-w-0 flex-1 items-center gap-3"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/5 text-cyan">
                        <c.icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-muted">{c.label}</span>
                        <span className="block truncate text-sm font-medium text-ink">
                          {c.value}
                        </span>
                      </span>
                    </a>
                    {c.copyable ? (
                      <button
                        onClick={() => copy(c.value)}
                        aria-label={`Copy ${c.label}`}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-faint transition-colors hover:bg-white/5 hover:text-cyan"
                      >
                        {copied === c.value ? (
                          <Check className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    ) : (
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-faint transition-colors group-hover:text-cyan" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
