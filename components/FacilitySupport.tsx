"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { reveal } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SectionLabel from "@/components/SectionLabel";
import AnimatedText from "@/components/AnimatedText";
import MediaFrame from "@/components/MediaFrame";
import { facility } from "@/data/services";

export default function FacilitySupport() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const prefersReduced = usePrefersReducedMotion();

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
        from: { opacity: 0, y: 18 },
        to: { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.07 },
      });
    },
    { scope: root, dependencies: [prefersReduced] },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-[#08090b] py-[clamp(5rem,10vw,10rem)] text-white"
    >
      {/* faint blueprint grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.045] bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(120%_100%_at_20%_30%,#000,transparent_75%)]" aria-hidden />

      <div className="relative mx-auto max-w-(--container) px-6 lg:px-10">
        <SectionLabel tone="light">Field &amp; Facility Support</SectionLabel>
        <AnimatedText
          as="h2"
          lines={["現場の実行力で、事業基盤を整える。"]}
          className="mt-6 display text-[clamp(1.8rem,4vw,3.2rem)] text-white"
        />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
          {/* visual */}
          <div>
            <MediaFrame
              data-visual
              src="/images/facility.jpg"
              alt="建設・施工・設備工事の現場"
              label="Construction · Facility"
              caption="現場の実行力"
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="aspect-4/3 w-full rounded-[1.75rem] shadow-[0_50px_100px_-50px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
            />
            <p className="mt-8 max-w-xl text-base leading-[1.95] text-white/70">
              {facility.intro}
            </p>
          </div>

          {/* accordion list */}
          <div className="border-t border-white/10 lg:pt-1">
            {facility.tabs.map((tab, i) => {
              const open = i === active;
              return (
                <div key={tab.key} data-tab className="border-b border-white/10">
                  <button
                    onClick={() => setActive(i)}
                    aria-expanded={open}
                    className="group relative flex w-full items-center gap-5 py-6 pl-5 pr-1 text-left"
                  >
                    {/* active accent bar */}
                    <span
                      className={`absolute left-0 top-1/2 w-px -translate-y-1/2 bg-cyan transition-all duration-300 ${
                        open ? "h-8" : "h-0"
                      }`}
                    />
                    <span
                      className={`serif-num text-sm transition-colors duration-300 ${
                        open ? "text-cyan" : "text-white/30"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`flex-1 text-lg font-medium tracking-wide transition-colors duration-300 ${
                        open ? "text-white" : "text-white/55 group-hover:text-white/85"
                      }`}
                    >
                      {tab.label}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                        open ? "rotate-180 text-cyan" : "text-white/30 group-hover:text-white/60"
                      }`}
                      aria-hidden
                    />
                  </button>

                  {/* inline body — animates open via grid rows */}
                  <div
                    className={`grid pl-5 transition-all duration-500 ease-out ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-md pb-7 pr-6 text-sm leading-[1.95] text-white/65">
                        {tab.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
