import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { profile, contact, navLinks } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <a href="#top" className="inline-flex items-center gap-2.5 font-display text-lg font-bold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan to-violet text-[13px] font-black text-[#04060a]">
                {profile.initials}
              </span>
              {profile.name}
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted">
              {profile.currentRole} @ {profile.currentCompany}. Building AI-powered tools & data
              systems.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-muted transition-colors hover:text-cyan"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
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
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-muted transition-all hover:-translate-y-0.5 hover:border-cyan/40 hover:text-cyan"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 text-sm text-faint sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. Crafted with Next.js, Tailwind & Framer
            Motion.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted transition-colors hover:text-cyan"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
