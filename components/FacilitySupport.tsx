"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, reveal } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SectionLabel from "@/components/SectionLabel";
import AnimatedText from "@/components/AnimatedText";
import { BuildingVisual } from "@/components/visuals";
import { facility } from "@/data/services";

export default function FacilitySupport() {
  const root = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState(0);
  const prefersReduced = usePrefersReducedMotion();

  const select = (i: number) => {
    if (i === active) return;
    setActive(i);
    if (!prefersReduced && bodyRef.current) {
      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );
    }
  };

  useGSAP(
    () => {
      if (prefersReduced || !root.current) return;
      reveal(root.current.querySelector("[data-visual]"), {
        trigger: root.current.querySelector("[data-visual]"),
        start: "top 82%",
        from: { clipPath: "inset(0 0 100% 0)" },
        to: { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "expo.out" },
      });
      reveal(root.current.querySelectorAll("[data-tab]"), {
        trigger: root.current,
        start: "top 68%",
        from: { opacity: 0, x: 24 },
        to: { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", stagger: 0.07 },
      });
    },
    { scope: root, dependencies: [prefersReduced] },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-darknavy text-white py-[clamp(5rem,10vw,10rem)]"
    >
      {/* blueprint bg */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:56px_56px]" aria-hidden />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(120,147,166,0.18),transparent_65%)]" aria-hidden />

      <div className="relative mx-auto max-w-(--container) px-6 lg:px-10">
        <SectionLabel tone="light">Field &amp; Facility Support</SectionLabel>
        <AnimatedText
          as="h2"
          lines={["現場の実行力で、事業基盤を整える。"]}
          className="mt-6 display text-[clamp(1.8rem,4vw,3.2rem)] text-white"
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* visual */}
          <div>
            <div
              data-visual
              className="overflow-hidden rounded-[1.75rem] shadow-[0_50px_100px_-50px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
            >
              <BuildingVisual uid="facility" className="aspect-4/3 w-full" />
            </div>
            <p ref={bodyRef} className="mt-8 max-w-xl text-base leading-[1.95] text-white/75">
              {facility.tabs[active].body}
            </p>
            <p className="mt-6 max-w-xl border-t border-white/12 pt-6 text-sm leading-relaxed text-white/55">
              {facility.intro}
            </p>
          </div>

          {/* tabs */}
          <div>
            <ul className="flex flex-col gap-3">
              {facility.tabs.map((tab, i) => (
                <li key={tab.key} data-tab>
                  <button
                    onClick={() => select(i)}
                    className={`group flex w-full items-center justify-between rounded-2xl px-6 py-5 text-left transition-all duration-300 ${
                      i === active
                        ? "bg-white/[0.08] ring-1 ring-white/15"
                        : "bg-white/[0.02] hover:bg-white/[0.05]"
                    }`}
                    aria-pressed={i === active}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`serif-num text-sm transition-colors ${
                          i === active ? "text-cyan" : "text-white/35"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`text-lg font-medium transition-colors ${
                          i === active ? "text-white" : "text-white/60 group-hover:text-white/85"
                        }`}
                      >
                        {tab.label}
                      </span>
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        i === active ? "bg-cyan" : "bg-white/20"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
