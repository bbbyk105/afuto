"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const terrainRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const prefersReduced = usePrefersReducedMotion();

  /* ── Cursor-following "lens": wherever you hover the terrain, the second
        (overgrown) photo behind it is revealed through a soft circle that
        tracks the pointer. ─────────────────────────────────────────────── */
  const lensRadius = () => {
    const w = terrainRef.current?.clientWidth ?? 1200;
    return Math.max(110, Math.min(w * 0.1, 200));
  };

  const moveLens = (clientX: number, clientY: number) => {
    const box = terrainRef.current?.getBoundingClientRect();
    if (!box || !bloomRef.current || !ringRef.current) return;
    const x = clientX - box.left;
    const y = clientY - box.top;
    lastPos.current = { x, y };
    const r = lensRadius();
    bloomRef.current.style.clipPath = `circle(${r}px at ${x}px ${y}px)`;
    ringRef.current.style.width = `${r * 2}px`;
    ringRef.current.style.height = `${r * 2}px`;
    ringRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    ringRef.current.style.opacity = "1";
  };

  const hideLens = () => {
    if (!bloomRef.current || !ringRef.current) return;
    const { x, y } = lastPos.current;
    bloomRef.current.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    ringRef.current.style.opacity = "0";
  };

  useGSAP(
    () => {
      if (prefersReduced || !root.current) return;

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(
        root.current.querySelectorAll("[data-hero-line]"),
        { yPercent: 118, duration: 1.2, stagger: 0.12, delay: 0.2 },
        0,
      );

      tl.from(
        root.current.querySelectorAll("[data-hero-up]"),
        { y: 22, opacity: 0, duration: 1, stagger: 0.08 },
        0.4,
      );

      if (terrainRef.current) {
        tl.from(
          terrainRef.current,
          { y: 50, opacity: 0, duration: 1.5, ease: "power3.out" },
          0.4,
        );
      }

      gsap.to(terrainRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [prefersReduced] },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-svh flex-col overflow-hidden bg-[#08090b] pt-(--header-h) text-white"
    >
      {/* quiet ambient grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(115%_90%_at_30%_15%,#000,transparent_72%)]"
        aria-hidden
      />

      {/* ── Copy (top) ───────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-(--container) px-6 pt-[clamp(2rem,5vw,4rem)] lg:px-10">
        <div data-hero-up className="label flex flex-wrap gap-x-3 gap-y-1 text-cyan/90">
          <span>Office Infrastructure</span>
          <span aria-hidden className="text-white/25">/</span>
          <span>IT Solution</span>
          <span aria-hidden className="text-white/25">/</span>
          <span>Field Support</span>
        </div>

        <h1 className="mt-6 display text-[clamp(2.4rem,6.4vw,4.8rem)] text-white">
          <span className="block overflow-hidden">
            <span data-hero-line className="block">
              事業の裏側に、
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block text-pale">
              動き出す環境を。
            </span>
          </span>
        </h1>

        <p
          data-hero-up
          className="mt-7 max-w-md text-sm leading-[2.1] text-white/65 sm:text-[0.95rem]"
        >
          IT・オフィス・設備・施工・流通まで。
          <br />
          企業活動を支える環境づくりを一気通貫で支援します。
        </p>
      </div>

      {/* ── Terrain showcase ─────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-(--container) flex-1 items-center justify-center px-6 py-6 lg:px-10">
        <div
          ref={terrainRef}
          onMouseEnter={(e) => moveLens(e.clientX, e.clientY)}
          onMouseMove={(e) => moveLens(e.clientX, e.clientY)}
          onMouseLeave={hideLens}
          onTouchMove={(e) => {
            const t = e.touches[0];
            if (t) moveLens(t.clientX, t.clientY);
          }}
          onTouchEnd={hideLens}
          className="relative aspect-[1916/821] w-full max-w-[68rem] cursor-none will-change-transform"
        >
          {/* Base terrain — bare, before life takes hold */}
          <Image
            src="/images/island-base.png"
            alt="アフトが支える事業基盤を表す立体地形"
            fill
            priority
            quality={100}
            sizes="(max-width: 1024px) 100vw, 68rem"
            className="object-contain"
          />

          {/* Bloom terrain — the second image behind, revealed through the
              lens that follows the pointer */}
          <div
            ref={bloomRef}
            className="absolute inset-0 transition-[clip-path] duration-200 ease-out"
            style={{ clipPath: "circle(0px at 50% 50%)" }}
            aria-hidden
          >
            <Image
              src="/images/island-bloom.png"
              alt=""
              fill
              quality={100}
              sizes="(max-width: 1024px) 100vw, 68rem"
              className="object-contain"
            />
          </div>

          {/* lens ring follows the cursor */}
          <div
            ref={ringRef}
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 rounded-full border border-white/40 opacity-0 shadow-[0_0_50px_-10px_rgba(155,196,168,0.45)] transition-opacity duration-300 ease-out"
            style={{ width: 0, height: 0 }}
          />
        </div>
      </div>

      {/* ── Bottom chrome ────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-(--container) items-end justify-between px-6 pb-8 lg:px-10 lg:pb-12">
        <span data-hero-up className="label flex items-center gap-2 text-white/55">
          <span className="h-1 w-1 rounded-full bg-cyan" />
          Scroll
        </span>

        <Link
          data-hero-up
          href="/service"
          className="group flex items-center gap-4 text-white/80 transition-colors hover:text-white"
        >
          <span className="label">View our services</span>
          <span className="hidden h-px w-10 bg-white/30 transition-all duration-300 group-hover:w-14 group-hover:bg-white/60 sm:block" />
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-all duration-300 group-hover:border-white/60 group-hover:bg-white/5">
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </section>
  );
}
