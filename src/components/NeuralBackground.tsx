"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas "neural network": drifting nodes linked by faint lines.
 * Nodes near the cursor light up and get pulled toward it.
 */
export function NeuralBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };
    const LINK = 140;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.floor((w * h) / 18000), 75);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.6,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduce) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < 180) {
            n.vx += (dx / d) * 0.012;
            n.vy += (dy / d) * 0.012;
          }
          n.vx *= 0.985;
          n.vy *= 0.985;
          n.x += n.vx + (Math.random() - 0.5) * 0.05;
          n.y += n.vy + (Math.random() - 0.5) * 0.05;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            const near = Math.hypot(mouse.x - a.x, mouse.y - a.y) < 200;
            const alpha = (1 - d / LINK) * (near ? 0.55 : 0.16);
            ctx.strokeStyle = near ? `rgba(103,232,249,${alpha})` : `rgba(167,139,250,${alpha})`;
            ctx.lineWidth = near ? 0.9 : 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        const near = Math.hypot(mouse.x - n.x, mouse.y - n.y) < 200;
        ctx.fillStyle = near ? "rgba(165,243,252,0.95)" : "rgba(200,205,230,0.45)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r + 0.8 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let visible = true;
    const loop = () => {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    resize();
    if (reduce) draw();
    else raf = requestAnimationFrame(loop);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none h-full w-full ${className}`} />;
}
