"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import Button from "@/components/Button";
import HeroVisual from "@/components/HeroVisual";
import { site } from "@/data/site";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReduced || !root.current) return;

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(root.current.querySelectorAll("[data-hero-line]"), {
        yPercent: 115,
        duration: 1.15,
        stagger: 0.12,
        delay: 0.3,
      })
        .from(
          root.current.querySelectorAll("[data-hero-up]"),
          { y: 24, opacity: 0, duration: 1, stagger: 0.1 },
          "-=0.7",
        )
        .from(
          visualRef.current?.querySelectorAll("[data-card]") ?? [],
          { opacity: 0, y: 40, scale: 0.94, duration: 1.1, stagger: 0.14, transformOrigin: "center" },
          "-=1.05",
        );

      // Draw-in of network paths
      const paths = visualRef.current?.querySelectorAll<SVGGeometryElement>("[data-draw] path");
      paths?.forEach((p) => {
        const len = p.getTotalLength();
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1.6, ease: "power2.out", delay: 1 },
        );
      });
      gsap.from(visualRef.current?.querySelectorAll("[data-node] g") ?? [], {
        opacity: 0,
        scale: 0,
        transformOrigin: "center",
        duration: 0.7,
        stagger: 0.06,
        delay: 1.5,
        ease: "back.out(2)",
      });

      // Parallax
      gsap.to(visualRef.current, {
        yPercent: -7,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(root.current.querySelector("[data-hero-copy]"), {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root, dependencies: [prefersReduced] },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-gradient-to-b from-[#07111D] via-navy to-[#0B1F33] pt-(--header-h) pb-24 text-white"
    >
      {/* ambient grid + glow */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:64px_64px]" aria-hidden />
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(143,182,196,0.16),transparent_65%)]" aria-hidden />

      <div className="relative mx-auto grid max-w-(--container) grid-cols-1 gap-14 px-6 pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-10 lg:px-10 lg:pt-24">
        {/* Copy */}
        <div data-hero-copy>
          <div data-hero-up className="label flex flex-wrap gap-x-3 gap-y-1 text-cyan/90">
            <span>Office Infrastructure</span>
            <span aria-hidden className="text-white/30">/</span>
            <span>IT Solution</span>
            <span aria-hidden className="text-white/30">/</span>
            <span>Field Support</span>
          </div>

          <h1 className="mt-7 display text-[clamp(2.7rem,7.6vw,5.6rem)]">
            <span className="reveal-mask">
              <span data-hero-line className="block">
                企業のインフラを、
              </span>
            </span>
            <span className="reveal-mask">
              <span data-hero-line className="block bg-gradient-to-r from-white via-pale to-steel bg-clip-text text-transparent">
                止めない。
              </span>
            </span>
          </h1>

          <p data-hero-up className="mt-8 max-w-xl text-base leading-[1.95] text-white/70 sm:text-lg">
            IT・オフィス・設備・施工・流通まで。
            <br className="hidden sm:block" />
            合同会社アフトは、事業の裏側を支える環境づくりを一気通貫で支援します。
          </p>

          <div data-hero-up className="mt-10 flex flex-wrap gap-3">
            <Button href="/contact" variant="ghost-light">相談する</Button>
            <Button href="/service" variant="ghost-light" arrow={false}>事業内容を見る</Button>
          </div>

          {/* Trust cards */}
          <dl data-hero-up className="mt-14 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {site.hero.badges.map((b, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 backdrop-blur-sm"
              >
                <dt className="text-[0.7rem] font-medium leading-snug text-white/85">{b}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual */}
        <div className="relative">
          <div ref={visualRef} className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] lg:ml-auto lg:mr-2">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative mx-auto mt-14 flex max-w-(--container) items-center gap-3 px-6 lg:px-10">
        <span className="label text-white/45">Scroll</span>
        <span className="relative h-px w-16 overflow-hidden bg-white/15">
          <span className="absolute inset-y-0 left-0 w-1/3 animate-[scrollline_2.2s_ease-in-out_infinite] bg-cyan" />
        </span>
      </div>

      <style>{`
        @keyframes scrollline {
          0% { transform: translateX(-110%); }
          60%,100% { transform: translateX(330%); }
        }
      `}</style>
    </section>
  );
}
