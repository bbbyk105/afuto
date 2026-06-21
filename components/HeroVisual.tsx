"use client";

/**
 * Hero right-side scene: a large filled "network operations" card with smaller
 * glass status cards overlapping it for depth. Pure CSS/SVG — holds up with no
 * photography. Elements are tagged for GSAP entrance.
 */
export default function HeroVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* radial glow behind the stack */}
      <div className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(60%_55%_at_70%_25%,rgba(143,182,196,0.28),transparent_70%)]" />

      {/* main card */}
      <div
        data-card
        className="absolute inset-x-2 top-6 bottom-10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-[#12395A] to-[#07111D] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)]"
      >
        {/* faint blueprint grid */}
        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:38px_38px]" />

        {/* network scene */}
        <svg viewBox="0 0 420 480" className="absolute inset-0 h-full w-full" fill="none">
          <defs>
            <radialGradient id="hv-glow" cx="0.5" cy="0.4" r="0.7">
              <stop offset="0" stopColor="#8FB6C4" stopOpacity="0.45" />
              <stop offset="1" stopColor="#8FB6C4" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hv-pane" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          <ellipse cx="250" cy="180" rx="180" ry="150" fill="url(#hv-glow)" />

          {/* floor-plan panels */}
          <g stroke="#9DB6C6" strokeOpacity="0.4" strokeWidth="1.5">
            <rect x="44" y="70" width="150" height="120" rx="8" fill="#fff" fillOpacity="0.05" />
            <rect x="44" y="206" width="150" height="78" rx="8" fill="#fff" fillOpacity="0.05" />
            <line x1="120" y1="70" x2="120" y2="190" />
          </g>
          {[
            [64, 92],
            [104, 92],
            [64, 150],
            [104, 150],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="34" height="20" rx="3" fill="#6F8EA4" opacity="0.45" />
          ))}

          {/* network links */}
          <g data-draw stroke="#8FB6C4" strokeWidth="1.75">
            <path d="M150 250 L240 300 L330 250 L360 330" />
            <path d="M150 250 L190 180" />
            <path d="M330 250 L300 180" />
            <path d="M240 300 L240 390" />
          </g>

          {/* nodes */}
          <g data-node>
            {[
              [150, 250],
              [240, 300],
              [330, 250],
              [360, 330],
              [190, 180],
              [300, 180],
              [240, 390],
            ].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="13" fill="#8FB6C4" opacity="0.16" />
                <circle cx={cx} cy={cy} r="5" fill="#DDE8EF" />
              </g>
            ))}
          </g>
        </svg>

        {/* in-card label */}
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
          </span>
          <span className="text-[0.65rem] font-medium tracking-wide text-white/85">
            Network Operations
          </span>
        </div>
      </div>

      {/* small glass card — Secure Network (top right) */}
      <div
        data-card
        className="absolute -right-3 top-2 w-44 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.6)] backdrop-blur-md"
      >
        <p className="label text-cyan/90">Secure Network</p>
        <p className="mt-1.5 text-sm font-medium text-white">LAN / Wi-Fi 構築</p>
        <div className="mt-3 flex items-end gap-1">
          {[10, 16, 12, 22, 18, 26].map((h, i) => (
            <span
              key={i}
              className="w-1.5 rounded-full bg-gradient-to-t from-steel/40 to-cyan"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>

      {/* small card — Office Devices (left mid) */}
      <div
        data-card
        className="absolute -left-4 top-1/2 w-40 rounded-2xl border border-line bg-surface p-4 shadow-[0_24px_50px_-26px_rgba(16,24,32,0.5)]"
      >
        <p className="label text-steel">Office Devices</p>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {["MFP", "PBX", "PC", "Wi-Fi", "NAS", "UPS"].map((d) => (
            <span
              key={d}
              className="rounded-md bg-pale/70 py-1 text-center text-[0.6rem] font-medium text-deep"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* small card — Field Support (bottom right) */}
      <div
        data-card
        className="absolute -right-2 bottom-4 w-48 rounded-2xl border border-white/10 bg-gradient-to-br from-navy to-[#07111D] p-4 text-white shadow-[0_24px_60px_-26px_rgba(0,0,0,0.7)]"
      >
        <div className="flex items-center justify-between">
          <p className="label text-white/55">Field Support</p>
          <span className="text-[0.6rem] text-cyan">68%</span>
        </div>
        <p className="mt-2 text-sm font-medium">施工・設備・保守</p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <span className="block h-full w-[68%] rounded-full bg-gradient-to-r from-steel to-cyan" />
        </div>
      </div>
    </div>
  );
}
