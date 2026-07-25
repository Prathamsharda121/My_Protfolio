/** Fixed, animated aurora + grid backdrop. Purely decorative. */
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-bg" />

      {/* Aurora blobs */}
      <div
        className="absolute -top-[20%] -left-[10%] h-[55vw] w-[55vw] rounded-full opacity-50 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.35), transparent 60%)",
          animation: "aurora-drift 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[10%] right-[-15%] h-[50vw] w-[50vw] rounded-full opacity-45 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.38), transparent 60%)",
          animation: "aurora-drift 22s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[25%] h-[45vw] w-[45vw] rounded-full opacity-35 blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.3), transparent 60%)",
          animation: "aurora-drift 26s ease-in-out infinite",
        }}
      />

      {/* Grid overlay */}
      <div
        className="grid-mask absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Noise / vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,6,10,0.9)_100%)]" />
    </div>
  );
}
