"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "@/lib/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Hide while scrolling down past the hero, show as soon as the user scrolls up.
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 400);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden && !open ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled ? "glass-strong shadow-lg shadow-black/30" : "border border-transparent"
        }`}
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 pl-1 font-display text-sm font-bold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan to-violet text-[13px] font-black text-[#04060a] shadow-glow">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">
            {profile.firstName}
            <span className="text-cyan">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`group/link relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {/* Text roll: label slides up, duplicate slides in from below */}
                <span className="relative block h-[1.25em] overflow-hidden leading-[1.25em]">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:-translate-y-full">
                    {link.label}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-full block text-cyan transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:-translate-y-full"
                  >
                    {link.label}
                  </span>
                </span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-soft to-violet-soft px-4 py-2 text-sm font-semibold text-[#04060a] transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-ink md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass-strong absolute top-[68px] mx-4 w-[calc(100%-2rem)] max-w-5xl rounded-2xl p-2 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-white/5 hover:text-ink"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4 opacity-40" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
