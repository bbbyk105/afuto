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
    <section ref={root} className="relative bg-bg py-[clamp(5rem,9vw,9rem)]">
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

        <div data-osgrid className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {officeSolutions.map((o, i) => (
            <article
              key={o.no}
              data-os
              className="group relative flex flex-col rounded-[1.5rem] border border-line bg-surface p-3 transition-all duration-500 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_40px_70px_-46px_rgba(11,31,51,0.4)]"
            >
              {/* unified icon thumbnail */}
              <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-[1.1rem] border border-line bg-[linear-gradient(160deg,#13171e,#0a0d12)]">
                <div className="aspect-[200/120] w-[44%] transition-transform duration-700 ease-out group-hover:scale-[1.08]">
                  <MiniVisual kind={i} />
                </div>
                <span className="absolute right-4 top-3.5 serif-num text-xs font-semibold tracking-wide text-steel/70">
                  {o.no}
                </span>
              </div>

              <div className="flex flex-1 flex-col px-4 pb-5 pt-6">
                <h3 className="text-base font-semibold leading-snug text-ink">{o.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{o.body}</p>
                <span className="mt-5 h-px w-8 bg-line-strong transition-all duration-500 group-hover:w-14 group-hover:bg-deep" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
