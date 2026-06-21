"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { reveal } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SectionLabel from "@/components/SectionLabel";
import AnimatedText from "@/components/AnimatedText";
import { MiniVisual } from "@/components/visuals";
import { officeSolutions } from "@/data/services";

export default function OfficeSolutions() {
  const root = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReduced || !root.current) return;
      const grid = root.current.querySelector("[data-osgrid]");
      reveal(root.current.querySelectorAll("[data-os]"), {
        trigger: grid,
        start: "top 80%",
        from: { opacity: 0, y: 36 },
        to: { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
      });
    },
    { scope: root, dependencies: [prefersReduced] },
  );

  return (
    <section ref={root} className="relative bg-surface py-[clamp(5rem,9vw,9rem)]">
      <div className="mx-auto max-w-(--container) px-6 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Office Solution</SectionLabel>
            <AnimatedText
              as="h2"
              lines={["オフィス運営に必要な環境を、", "まとめて整える。"]}
              className="mt-6 display text-[clamp(1.7rem,3.6vw,2.8rem)] text-ink"
            />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            OA・通信・ネットワークから保守まで。6つの領域で、オフィスの生産性を底上げします。
          </p>
        </div>

        <div data-osgrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {officeSolutions.map((o, i) => (
            <article
              key={o.no}
              data-os
              className="group overflow-hidden rounded-[1.5rem] bg-bg-alt ring-1 ring-line/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_36px_70px_-46px_rgba(11,31,51,0.5)]"
            >
              {/* visual header */}
              <div className="relative h-36 overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                  <MiniVisual kind={i} />
                </div>
                <span className="absolute left-4 top-4 serif-num text-sm font-semibold text-deep/70">
                  {o.no}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold leading-snug text-ink">{o.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{o.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
