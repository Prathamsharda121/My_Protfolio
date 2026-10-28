"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { profile, contact, navLinks } from "@/lib/content";

function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{time} IST</span>;
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-5 pt-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">Navigate</p>
            <nav className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="w-fit text-muted transition-colors hover:text-cyan">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">Socials</p>
            <div className="mt-4 grid gap-2 text-sm">
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="w-fit text-muted hover:text-cyan">
                LinkedIn ↗
              </a>
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="w-fit text-muted hover:text-cyan">
                GitHub ↗
              </a>
              <a href={`mailto:${contact.email}`} className="w-fit text-muted hover:text-cyan">
                Email ↗
              </a>
            </div>
          </div>
          <div className="sm:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">Local time</p>
            <p className="mt-4 font-display text-2xl font-semibold">
              <LocalTime />
            </p>
            <a
              href="#top"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-muted transition-colors hover:border-cyan/40 hover:text-cyan"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Giant wordmark */}
        <motion.div
          initial={{ y: "40%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 select-none text-center font-display text-[18vw] font-bold leading-[0.8] tracking-[-0.06em]"
          aria-hidden
        >
          <span className="bg-gradient-to-b from-white/90 to-white/0 bg-clip-text text-transparent">
            {profile.firstName.toLowerCase()}
          </span>
          <span className="font-serif font-normal italic gradient-flow">.</span>
        </motion.div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 py-6 text-xs text-faint sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.currentRole}
          </p>
          <p>Designed & built with Next.js, Framer Motion & a lot of coffee.</p>
        </div>
      </div>
    </footer>
  );
}
