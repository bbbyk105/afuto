"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, reveal } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SectionLabel from "@/components/SectionLabel";
import AnimatedText from "@/components/AnimatedText";
import { problems } from "@/data/services";

export default function Problems() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReduced || !root.current || !trackRef.current) return;
      const cards = trackRef.current.querySelectorAll("[data-card]");

      reveal(cards, {
        trigger: trackRef.current,
        start: "top 82%",
        from: { opacity: 0, y: 44 },
        to: { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(trackRef.current, {
          xPercent: -5,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [prefersReduced] },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-bg py-[clamp(5rem,9vw,9rem)]">
      <div className="relative mx-auto max-w-(--container) px-6 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Problems</SectionLabel>
            <AnimatedText
              as="h2"
              lines={["こんな課題を、", "まとめて相談できます。"]}
              className="mt-6 display text-[clamp(1.7rem,3.8vw,3rem)] text-ink"
            />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            領域をまたいで分断されがちな課題も、窓口をひとつに。現状の整理から、最適な打ち手までを伴走します。
          </p>
        </div>
      </div>

      <div className="relative mt-14 overflow-x-auto px-6 [scrollbar-width:none] lg:overflow-visible lg:px-10 [&::-webkit-scrollbar]:hidden">
        <div ref={trackRef} className="mx-auto flex max-w-(--container) gap-5 lg:grid lg:grid-cols-5">
          {problems.map((p) => (
            <article
              key={p.no}
              data-card
              className="group relative flex min-h-[16rem] w-[78vw] shrink-0 flex-col overflow-hidden rounded-3xl bg-surface p-6 shadow-[0_24px_60px_-44px_rgba(0,0,0,0.55)] ring-1 ring-line/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-44px_rgba(0,0,0,0.6)] sm:w-[58vw] lg:w-auto"
            >
              {/* hover wash */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-deep transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              <div className="flex items-start justify-between">
                <span className="serif-num text-[2.75rem] font-semibold leading-none text-steel/55 transition-colors duration-300 group-hover:text-steel">
                  {p.no}
                </span>
                <span className="label text-steel">{p.en}</span>
              </div>
              <h3 className="mt-9 min-h-[2.75rem] text-base font-semibold leading-snug text-ink">
                {p.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
