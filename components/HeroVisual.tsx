"use client";

/**
 * AFT Infrastructure Object
 * -------------------------
 * A single, self-contained brand object — NOT a dashboard, NOT a network
 * diagram, NOT a stack of info cards. It reads as a white architectural model:
 * an isometric massing of office/IT/facility volumes on a plinth, sliced by an
 * inclined blue plane, with the AFT mark embossed on a wall face and a faint
 * floor-plan etched into a roof.
 *
 * Everything is computed from one isometric projection so the geometry stays
 * coherent. Pure SVG — holds up as a still image, no photography. Elements are
 * tagged (data-accent / data-logo / data-lines) as GSAP entrance hooks; the
 * whole <svg data-hero-object> is clip-path revealed by the Hero timeline.
 */

const S = 27; // unit scale (px per world unit)
const OX = 300;
const OY = 395;
const COS30 = Math.sqrt(3) / 2;
const SIN30 = 0.5;

type P3 = [number, number, number];

function project(x: number, y: number, z: number): [number, number] {
  return [OX + (x - y) * COS30 * S, OY + (x + y) * SIN30 * S - z * S];
}

function poly(coords: P3[]): string {
  return coords
    .map(([x, y, z]) => project(x, y, z).map((n) => n.toFixed(1)).join(","))
    .join(" ");
}

/** Three visible faces of an axis-aligned box (top / +y left wall / +x right wall). */
function box(x: number, y: number, z: number, dx: number, dy: number, dz: number) {
  const x1 = x + dx;
  const y1 = y + dy;
  const z1 = z + dz;
  return {
    top: poly([
      [x, y, z1],
      [x1, y, z1],
      [x1, y1, z1],
      [x, y1, z1],
    ]),
    left: poly([
      [x, y1, z],
      [x1, y1, z],
      [x1, y1, z1],
      [x, y1, z1],
    ]),
    right: poly([
      [x1, y, z],
      [x1, y1, z],
      [x1, y1, z1],
      [x1, y, z1],
    ]),
  };
}

const EDGE = "rgba(11,31,51,0.10)";

// --- Massing ---------------------------------------------------------------
const plinth = box(-1, -1, -0.55, 8, 8, 0.55);
const tower = box(0, 0, 0, 2.6, 2.6, 6.8); // hero mass — carries the AFT mark
const mid = box(2.9, 0.2, 0, 2.4, 2.2, 3.2);
const bar = box(0, 3, 0, 4.6, 1.4, 1.1); // long low bar — carries the floor plan
const fin = box(4.85, 0.25, 0, 1.15, 1.3, 2.5); // secondary white block, back-right

// --- Inclined blue plane (the accent that "slices in") ---------------------
// A broad slab that leans toward the viewer in front of the massing — it stays
// at y > the tower wall so the tower never swallows it, and rises clear of the
// low bar. This is the single bold blue gesture, not a thin sliver.
const bluePlane: P3[] = [
  [2.65, 3.05, 0],
  [5.05, 3.05, 0],
  [5.05, 3.62, 4.6],
  [2.65, 3.62, 4.6],
];

// --- AFT mark sheared onto the tower's lit +y (front-left) wall -------------
const [lex, ley] = project(0.4, 2.6, 5.55);
const wallMatrix = `matrix(${(COS30 * S).toFixed(3)},${(SIN30 * S).toFixed(
  3,
)},0,${S},${lex.toFixed(2)},${ley.toFixed(2)})`;

// --- Tower floor grooves (white-model "floors") ----------------------------
const towerFloors = [1.1, 2.2, 3.3, 4.4, 5.5].map((zk) => ({
  x: [project(2.6, 0, zk), project(2.6, 2.6, zk)] as const,
  y: [project(0, 2.6, zk), project(2.6, 2.6, zk)] as const,
}));

const midFloors = [1.1, 2.2].map(
  (zk) => [project(5.3, 0.2, zk), project(5.3, 2.4, zk)] as const,
);

// --- Floor plan etched on the low bar's roof (z = 1.1) ---------------------
const planZ = 1.1;
const planX0 = 0.18;
const planX1 = 4.42;
const planY0 = 3.16;
const planY1 = 4.24;
const planRows = [3.52, 3.88];
const planCols = [1.1, 2.0, 2.9, 3.7];
const planRoute: P3[] = [
  [0.5, 4.0, planZ],
  [1.5, 4.0, planZ],
  [1.5, 3.4, planZ],
  [3.2, 3.4, planZ],
  [3.2, 3.95, planZ],
  [4.1, 3.95, planZ],
];
const planLabels: { x: number; y: number; t: string }[] = [
  { x: 0.62, y: 3.7, t: "WORK" },
  { x: 2.05, y: 3.7, t: "MTG" },
  { x: 3.3, y: 3.7, t: "NW" },
];

function line(a: readonly [number, number], b: readonly [number, number], props: Record<string, unknown> = {}) {
  return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} {...props} />;
}

export default function HeroVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* cool ambient wash behind the object — never a particle field */}
      <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(58%_52%_at_56%_38%,rgba(143,182,196,0.20),transparent_72%)]" />

      <svg
        data-hero-object
        viewBox="105 168 392 478"
        className="absolute inset-0 h-full w-full will-change-[clip-path]"
        fill="none"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <linearGradient id="aft-top" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="#FBFCFD" />
            <stop offset="1" stopColor="#EDF1F4" />
          </linearGradient>
          <linearGradient id="aft-left" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E8EDF1" />
            <stop offset="1" stopColor="#DAE1E7" />
          </linearGradient>
          <linearGradient id="aft-right" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#D5DDE4" />
            <stop offset="1" stopColor="#C5CFD8" />
          </linearGradient>
          <linearGradient id="aft-plinth-top" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stopColor="#F4F7F9" />
            <stop offset="1" stopColor="#E4EAEF" />
          </linearGradient>
          <linearGradient id="aft-blue" x1="0" y1="1" x2="0.3" y2="0">
            <stop offset="0" stopColor="#5C7CFA" />
            <stop offset="0.55" stopColor="#6A8BF6" />
            <stop offset="1" stopColor="#8FB1F2" />
          </linearGradient>
          <filter id="aft-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>

        {/* grounding shadow */}
        <ellipse
          cx="300"
          cy="592"
          rx="196"
          ry="40"
          fill="#07111D"
          opacity="0.45"
          filter="url(#aft-shadow)"
        />

        {/* ---- plinth ---- */}
        <g stroke={EDGE} strokeWidth="1">
          <polygon points={plinth.left} fill="url(#aft-left)" />
          <polygon points={plinth.right} fill="url(#aft-right)" />
          <polygon points={plinth.top} fill="url(#aft-plinth-top)" />
        </g>

        {/* faint service routing etched on the plinth top */}
        <g data-lines stroke="#6F8EA4" strokeWidth="0.9" opacity="0.28" fill="none">
          {line(project(-0.4, 4.6, 0), project(3.4, 4.6, 0))}
          {line(project(3.4, 4.6, 0), project(3.4, 6.4, 0))}
          {line(project(0.6, 5.2, 0), project(0.6, 6.6, 0))}
          {line(project(0.6, 5.6, 0), project(2.8, 5.6, 0))}
          {line(project(2.8, 5.6, 0), project(2.8, 6.6, 0))}
          <circle {...circle(project(3.4, 4.6, 0))} r="2.4" fill="#6F8EA4" stroke="none" />
          <circle {...circle(project(2.8, 5.6, 0))} r="2.4" fill="#6F8EA4" stroke="none" />
        </g>

        {/* ---- tall tower (hero mass) ---- */}
        <g stroke={EDGE} strokeWidth="1">
          <polygon points={tower.left} fill="url(#aft-left)" />
          <polygon points={tower.right} fill="url(#aft-right)" />
          <polygon points={tower.top} fill="url(#aft-top)" />
        </g>
        {/* floor grooves */}
        <g data-lines stroke="rgba(11,31,51,0.07)" strokeWidth="1">
          {towerFloors.map((f, i) => (
            <g key={i}>
              {line(f.x[0], f.x[1])}
              {line(f.y[0], f.y[1])}
            </g>
          ))}
        </g>

        {/* AFT mark embossed on the lit front-left wall */}
        <g data-logo transform={wallMatrix}>
          <text
            x="0"
            y="0"
            fontSize="1.42"
            letterSpacing="0.04"
            fontWeight="700"
            fill="#101820"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            AFT
          </text>
          <line x1="0.02" y1="0.5" x2="2.5" y2="0.5" stroke="#7893a6" strokeWidth="0.055" />
          <text
            x="0.04"
            y="1.18"
            fontSize="0.44"
            letterSpacing="0.12"
            fill="#5b6772"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Aft LLC
          </text>
        </g>

        {/* ---- mid block ---- */}
        <g stroke={EDGE} strokeWidth="1">
          <polygon points={mid.left} fill="url(#aft-left)" />
          <polygon points={mid.right} fill="url(#aft-right)" />
          <polygon points={mid.top} fill="url(#aft-top)" />
        </g>
        <g data-lines stroke="rgba(11,31,51,0.07)" strokeWidth="1">
          {midFloors.map((m, i) => (
            <g key={i}>{line(m[0], m[1])}</g>
          ))}
        </g>

        {/* ---- inclined blue plane (the one bold accent) ---- */}
        <g data-accent>
          <polygon points={poly(bluePlane)} fill="url(#aft-blue)" opacity="0.94" />
          {/* bright leading edge along the top */}
          {line(project(5.05, 3.62, 4.6), project(2.65, 3.62, 4.6), {
            stroke: "#A9C8FF",
            strokeWidth: 2.2,
          })}
        </g>

        {/* ---- low bar + floor plan on its roof ---- */}
        <g stroke={EDGE} strokeWidth="1">
          <polygon points={bar.left} fill="url(#aft-left)" />
          <polygon points={bar.right} fill="url(#aft-right)" />
          <polygon points={bar.top} fill="url(#aft-top)" />
        </g>
        <g data-lines>
          <polygon
            points={poly([
              [planX0, planY0, planZ],
              [planX1, planY0, planZ],
              [planX1, planY1, planZ],
              [planX0, planY1, planZ],
            ])}
            fill="none"
            stroke="#6F8EA4"
            strokeOpacity="0.45"
            strokeWidth="1.1"
          />
          <g stroke="#6F8EA4" strokeOpacity="0.26" strokeWidth="0.8">
            {planCols.map((cx, i) => (
              <g key={`c${i}`}>{line(project(cx, planY0, planZ), project(cx, planY1, planZ))}</g>
            ))}
            {planRows.map((cy, i) => (
              <g key={`r${i}`}>{line(project(planX0, cy, planZ), project(planX1, cy, planZ))}</g>
            ))}
          </g>
          <polyline
            points={poly(planRoute)}
            fill="none"
            stroke="#5C7CFA"
            strokeOpacity="0.5"
            strokeWidth="1.1"
          />
          {planLabels.map((l, i) => {
            const [px, py] = project(l.x, l.y, planZ);
            return (
              <text
                key={i}
                x={px}
                y={py}
                fontSize="7"
                letterSpacing="0.06em"
                fill="#5b6772"
                opacity="0.7"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {l.t}
              </text>
            );
          })}
        </g>

        {/* ---- secondary white block ---- */}
        <g stroke={EDGE} strokeWidth="1">
          <polygon points={fin.left} fill="url(#aft-left)" />
          <polygon points={fin.right} fill="url(#aft-right)" />
          <polygon points={fin.top} fill="url(#aft-top)" />
        </g>

        {/* engraved vertical wordmark on the plinth front edge — barely there */}
        <text
          data-lines
          x={project(-1, 4.4, -0.18)[0]}
          y={project(-1, 4.4, -0.18)[1]}
          fontSize="7.5"
          letterSpacing="0.34em"
          fill="#5b6772"
          opacity="0.55"
          transform={`rotate(30 ${project(-1, 4.4, -0.18)[0]} ${project(-1, 4.4, -0.18)[1]})`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          INFRASTRUCTURE
        </text>
      </svg>
    </div>
  );
}

function circle([cx, cy]: [number, number]) {
  return { cx, cy };
}
