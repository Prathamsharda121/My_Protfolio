"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

/** Pause / resume smooth scrolling (used by the preloader). */
export function setScrollLocked(locked: boolean) {
  if (locked) {
    lenisInstance?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "";
    lenisInstance?.start();
  }
}

/** Buttery inertia scrolling + smooth in-page anchor links. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.16, wheelMultiplier: 1.1, smoothWheel: true });
    lenisInstance = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href")!;
      const target = id === "#top" ? 0 : document.querySelector<HTMLElement>(id);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -40, duration: 1.1 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
