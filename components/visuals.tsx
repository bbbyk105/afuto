/**
 * Filled, layered SVG "scene" visuals — server racks, floor plans, building
 * sections, route maps. Built with gradients, solid panels, soft depth and
 * status chips so the site reads as a finished brand site, not a wireframe.
 * Each component takes a `uid` to keep gradient ids unique across instances.
 */

type VisualProps = { uid: string; className?: string };

/* ---------- shared gradient defs ---------- */
function Defs({ uid }: { uid: string }) {
  return (
    <defs>
      <linearGradient id={`${uid}-deep`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#12395A" />
        <stop offset="1" stopColor="#0B1F33" />
      </linearGradient>
      <linearGradient id={`${uid}-pane`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.04" />
      </linearGradient>
      <linearGradient id={`${uid}-steel`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#9DB6C6" />
        <stop offset="1" stopColor="#6F8EA4" />
      </linearGradient>
      <radialGradient id={`${uid}-glow`} cx="0.7" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#8FB6C4" stopOpacity="0.5" />
        <stop offset="1" stopColor="#8FB6C4" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/* ====================================================================
   IT Solution — server rack + status + bar chart
   ==================================================================== */
export function ServerRackVisual({ uid, className }: VisualProps) {
  return (
    <svg viewBox="0 0 360 320" className={className} fill="none" aria-hidden>
      <Defs uid={uid} />
      <rect width="360" height="320" rx="20" fill={`url(#${uid}-deep)`} />
      <rect width="360" height="320" rx="20" fill={`url(#${uid}-glow)`} />

      {/* rack frame */}
      <rect x="34" y="36" width="150" height="248" rx="12" fill="#07111D" opacity="0.55" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect
            x="46"
            y={52 + i * 37}
            width="126"
            height="26"
            rx="6"
            fill={`url(#${uid}-pane)`}
          />
          <circle cx="58" cy={65 + i * 37} r="3" fill={i % 2 ? "#8FB6C4" : "#6F8EA4"} />
          <circle cx="70" cy={65 + i * 37} r="3" fill="#9DB6C6" opacity="0.5" />
          <rect x="84" y={61 + i * 37} width="74" height="3" rx="1.5" fill="#fff" opacity="0.22" />
          <rect x="84" y={68 + i * 37} width="48" height="3" rx="1.5" fill="#fff" opacity="0.12" />
        </g>
      ))}

      {/* status card */}
      <g>
        <rect x="208" y="44" width="120" height="92" rx="14" fill={`url(#${uid}-pane)`} />
        <rect x="208" y="44" width="120" height="92" rx="14" stroke="#fff" strokeOpacity="0.1" />
        <circle cx="228" cy="68" r="5" fill="#8FB6C4" />
        <text x="242" y="72" fill="#DDE8EF" fontSize="11" fontFamily="sans-serif">
          Operational
        </text>
        <text x="224" y="104" fill="#fff" fontSize="26" fontWeight="600" fontFamily="sans-serif">
          99.9
        </text>
        <text x="288" y="104" fill="#7893A6" fontSize="11" fontFamily="sans-serif">
          % up
        </text>
      </g>

      {/* bar chart */}
      <g>
        <rect x="208" y="156" width="120" height="128" rx="14" fill={`url(#${uid}-pane)`} />
        {[34, 58, 44, 76, 62, 92].map((h, i) => (
          <rect
            key={i}
            x={224 + i * 16}
            y={268 - h}
            width="9"
            height={h}
            rx="3"
            fill={i === 5 ? `url(#${uid}-steel)` : "#6F8EA4"}
            opacity={i === 5 ? 1 : 0.55}
          />
        ))}
      </g>
    </svg>
  );
}

/* ====================================================================
   Construction — building section + crane + progress
   ==================================================================== */
export function BuildingVisual({ uid, className }: VisualProps) {
  return (
    <svg viewBox="0 0 360 320" className={className} fill="none" aria-hidden>
      <Defs uid={uid} />
      <rect width="360" height="320" rx="20" fill={`url(#${uid}-deep)`} />
      <rect width="360" height="320" rx="20" fill={`url(#${uid}-glow)`} />

      {/* ground */}
      <rect x="0" y="270" width="360" height="50" fill="#07111D" opacity="0.5" />

      {/* main tower */}
      <rect x="70" y="84" width="120" height="186" rx="6" fill={`url(#${uid}-pane)`} />
      <rect x="70" y="84" width="120" height="186" rx="6" stroke="#fff" strokeOpacity="0.12" />
      {[0, 1, 2, 3, 4, 5, 6].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={82 + c * 26}
            y={98 + r * 24}
            width="18"
            height="15"
            rx="2"
            fill="#8FB6C4"
            opacity={(r + c) % 3 === 0 ? 0.55 : 0.16}
          />
        )),
      )}

      {/* low building */}
      <rect x="200" y="170" width="92" height="100" rx="6" fill="#07111D" opacity="0.45" />
      <rect x="200" y="170" width="92" height="100" rx="6" stroke="#fff" strokeOpacity="0.1" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`l${r}-${c}`}
            x={212 + c * 26}
            y={184 + r * 28}
            width="16"
            height="16"
            rx="2"
            fill="#6F8EA4"
            opacity="0.3"
          />
        )),
      )}

      {/* crane */}
      <g stroke="#9DB6C6" strokeWidth="2" opacity="0.8">
        <line x1="240" y1="60" x2="240" y2="170" />
        <line x1="150" y1="60" x2="320" y2="60" />
        <line x1="240" y1="60" x2="170" y2="86" />
        <line x1="300" y1="60" x2="300" y2="96" />
      </g>
      <rect x="296" y="96" width="8" height="14" rx="2" fill="#8FB6C4" />

      {/* progress chip */}
      <g>
        <rect x="40" y="288" width="150" height="0.5" />
        <rect x="40" y="40" width="120" height="30" rx="15" fill={`url(#${uid}-pane)`} />
        <circle cx="58" cy="55" r="5" fill="#8FB6C4" />
        <text x="72" y="59" fill="#DDE8EF" fontSize="11" fontFamily="sans-serif">
          施工進行 68%
        </text>
      </g>
    </svg>
  );
}

/* ====================================================================
   Office — floor plan with device nodes
   ==================================================================== */
export function OfficePlanVisual({ uid, className }: VisualProps) {
  return (
    <svg viewBox="0 0 360 320" className={className} fill="none" aria-hidden>
      <Defs uid={uid} />
      <rect width="360" height="320" rx="20" fill={`url(#${uid}-deep)`} />
      <rect width="360" height="320" rx="20" fill={`url(#${uid}-glow)`} />

      {/* plan rooms */}
      <g stroke="#9DB6C6" strokeOpacity="0.35" strokeWidth="1.5">
        <rect x="40" y="46" width="180" height="140" rx="6" fill="#fff" fillOpacity="0.05" />
        <rect x="40" y="200" width="180" height="74" rx="6" fill="#fff" fillOpacity="0.05" />
        <rect x="236" y="46" width="84" height="228" rx="6" fill="#fff" fillOpacity="0.07" />
        <line x1="130" y1="46" x2="130" y2="186" />
        <line x1="40" y1="116" x2="220" y2="116" />
      </g>

      {/* desks */}
      {[
        [64, 70],
        [104, 70],
        [64, 140],
        [104, 140],
        [160, 86],
        [160, 150],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="30" height="18" rx="3" fill="#6F8EA4" opacity="0.4" />
      ))}

      {/* device nodes with links */}
      <g stroke="#8FB6C4" strokeWidth="1.5" strokeOpacity="0.7">
        <path d="M278 92 L278 150 L278 210" />
        <path d="M278 120 L150 120" strokeDasharray="3 4" />
      </g>
      {[
        ["Wi-Fi", 278, 92],
        ["PBX", 278, 150],
        ["MFP", 278, 210],
      ].map(([label, x, y], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r="14" fill="#0B1F33" />
          <circle cx={x as number} cy={y as number} r="14" fill={`url(#${uid}-pane)`} />
          <circle cx={x as number} cy={y as number} r="14" stroke="#8FB6C4" strokeOpacity="0.6" />
          <circle cx={x as number} cy={y as number} r="4" fill="#8FB6C4" />
          <text
            x={(x as number) - 24}
            y={(y as number) + 4}
            fill="#DDE8EF"
            fontSize="9"
            textAnchor="end"
            fontFamily="sans-serif"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ====================================================================
   Distribution — map grid with route arcs + package cards
   ==================================================================== */
export function GlobalMapVisual({ uid, className }: VisualProps) {
  return (
    <svg viewBox="0 0 360 320" className={className} fill="none" aria-hidden>
      <Defs uid={uid} />
      <rect width="360" height="320" rx="20" fill={`url(#${uid}-deep)`} />
      <rect width="360" height="320" rx="20" fill={`url(#${uid}-glow)`} />

      {/* dotted globe grid */}
      <g fill="#9DB6C6" opacity="0.28">
        {Array.from({ length: 11 }).map((_, r) =>
          Array.from({ length: 13 }).map((_, c) => {
            const cx = 36 + c * 24;
            const cy = 46 + r * 22;
            const inside =
              Math.hypot(cx - 180, cy - 158) < 140 - Math.abs(cy - 158) * 0.2;
            return inside ? <circle key={`${r}-${c}`} cx={cx} cy={cy} r="2" /> : null;
          }),
        )}
      </g>

      {/* route arcs */}
      <g stroke="#8FB6C4" strokeWidth="1.75" fill="none">
        <path d="M86 200 Q170 80 264 132" strokeOpacity="0.8" />
        <path d="M120 250 Q210 200 300 220" strokeOpacity="0.5" strokeDasharray="2 5" />
      </g>
      {[
        [86, 200],
        [264, 132],
        [300, 220],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="9" fill="#8FB6C4" opacity="0.18" />
          <circle cx={cx} cy={cy} r="4" fill="#DDE8EF" />
        </g>
      ))}

      {/* package cards */}
      <g>
        <rect x="232" y="44" width="96" height="56" rx="12" fill={`url(#${uid}-pane)`} />
        <rect x="232" y="44" width="96" height="56" rx="12" stroke="#fff" strokeOpacity="0.1" />
        <rect x="246" y="58" width="22" height="22" rx="4" fill="#6F8EA4" opacity="0.6" />
        <rect x="276" y="60" width="40" height="4" rx="2" fill="#fff" opacity="0.25" />
        <rect x="276" y="70" width="28" height="4" rx="2" fill="#fff" opacity="0.14" />
        <text x="246" y="94" fill="#7893A6" fontSize="9" fontFamily="sans-serif">
          Supply / Global
        </text>
      </g>
    </svg>
  );
}

/* ====================================================================
   Small visuals for the 6 office-solution cards (compact, filled)
   ==================================================================== */
export function MiniVisual({ kind }: { kind: number }) {
  const common = "h-full w-full";
  switch (kind) {
    case 0: // MFP / printer
      return (
        <svg viewBox="0 0 200 120" className={common} fill="none" aria-hidden>
          <rect width="200" height="120" rx="12" fill="#EEF3F6" />
          <rect x="64" y="30" width="72" height="44" rx="6" fill="#0B1F33" opacity="0.9" />
          <rect x="72" y="74" width="56" height="22" rx="4" fill="#DDE8EF" />
          <rect x="78" y="80" width="44" height="4" rx="2" fill="#7893A6" />
          <circle cx="120" cy="42" r="4" fill="#8FB6C4" />
          <rect x="76" y="38" width="22" height="6" rx="3" fill="#6F8EA4" />
        </svg>
      );
    case 1: // phone / telecom
      return (
        <svg viewBox="0 0 200 120" className={common} fill="none" aria-hidden>
          <rect width="200" height="120" rx="12" fill="#EEF3F6" />
          <g stroke="#7893A6" strokeWidth="2" opacity="0.5">
            <path d="M40 86 Q100 40 160 86" strokeDasharray="3 5" />
          </g>
          {[60, 100, 140].map((x, i) => (
            <g key={i}>
              <rect x={x - 12} y="60" width="24" height="34" rx="5" fill="#0B1F33" />
              <rect x={x - 7} y="66" width="14" height="10" rx="2" fill="#8FB6C4" opacity="0.7" />
            </g>
          ))}
        </svg>
      );
    case 2: // network / LAN
      return (
        <svg viewBox="0 0 200 120" className={common} fill="none" aria-hidden>
          <rect width="200" height="120" rx="12" fill="#EEF3F6" />
          <g stroke="#6F8EA4" strokeWidth="1.75">
            <path d="M100 36 L60 78 M100 36 L140 78 M60 78 L140 78" />
          </g>
          {[
            [100, 36],
            [60, 78],
            [140, 78],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i === 0 ? 12 : 9} fill="#0B1F33" />
          ))}
          <circle cx="100" cy="36" r="4" fill="#8FB6C4" />
        </svg>
      );
    case 3: // PC / peripherals
      return (
        <svg viewBox="0 0 200 120" className={common} fill="none" aria-hidden>
          <rect width="200" height="120" rx="12" fill="#EEF3F6" />
          <rect x="58" y="34" width="84" height="50" rx="5" fill="#0B1F33" />
          <rect x="64" y="40" width="72" height="38" rx="2" fill="#12395A" />
          <rect x="72" y="48" width="40" height="4" rx="2" fill="#8FB6C4" opacity="0.7" />
          <rect x="72" y="58" width="56" height="3" rx="1.5" fill="#7893A6" opacity="0.6" />
          <rect x="86" y="84" width="28" height="6" rx="2" fill="#7893A6" />
        </svg>
      );
    case 4: // security / shield
      return (
        <svg viewBox="0 0 200 120" className={common} fill="none" aria-hidden>
          <rect width="200" height="120" rx="12" fill="#EEF3F6" />
          <path
            d="M100 28 L132 40 V66 C132 86 118 96 100 102 C82 96 68 86 68 66 V40 Z"
            fill="#0B1F33"
          />
          <path d="M88 64 l9 9 l16 -18" stroke="#8FB6C4" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default: // maintenance / cycle
      return (
        <svg viewBox="0 0 200 120" className={common} fill="none" aria-hidden>
          <rect width="200" height="120" rx="12" fill="#EEF3F6" />
          <circle cx="100" cy="62" r="28" stroke="#6F8EA4" strokeWidth="3" fill="none" strokeDasharray="120 40" />
          <circle cx="100" cy="62" r="10" fill="#0B1F33" />
          <path d="M122 44 l6 -10 l-12 2" fill="#8FB6C4" />
        </svg>
      );
  }
}
