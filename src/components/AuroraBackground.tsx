/**
 * Fixed aurora + grid backdrop. Static radial gradients (no CSS blur filters,
 * no animation) so it costs nothing while scrolling.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(55vw 55vw at 5% 0%, rgba(34,211,238,0.13), transparent 60%)",
            "radial-gradient(50vw 50vw at 100% 20%, rgba(139,92,246,0.15), transparent 60%)",
            "radial-gradient(45vw 45vw at 45% 110%, rgba(59,130,246,0.1), transparent 60%)",
            "#05060a",
          ].join(","),
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

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,6,10,0.9)_100%)]" />
    </div>
  );
}
