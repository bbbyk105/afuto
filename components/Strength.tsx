"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { reveal } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SectionLabel from "@/components/SectionLabel";
import AnimatedText from "@/components/AnimatedText";
import { strengths } from "@/data/services";
import { site } from "@/data/site";

export default function Strength() {
  const root = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReduced || !root.current) return;
      const grid = root.current.querySelector("[data-grid]");
      reveal(root.current.querySelectorAll("[data-card]"), {
        trigger: grid,
        start: "top 80%",
        from: { opacity: 0, y: 36, scale: 0.97, transformOrigin: "center" },
        to: { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.09 },
      });
    },
    { scope: root, dependencies: [prefersReduced] },
  );

  // first four = light cards, last (public sector) = highlighted navy card
  const cards = strengths.slice(0, 4);
  const featured = strengths[4];

  return (
    <section ref={root} className="bg-bg py-[clamp(5rem,9vw,9rem)]">
      <div className="mx-auto max-w-(--container) px-6 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Why Aft</SectionLabel>
            <AnimatedText
              as="h2"
              lines={["選ばれる理由。"]}
              className="mt-6 display text-[clamp(1.9rem,4vw,3.2rem)] text-ink"
            />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            領域を横断する対応力と、導入後まで伴走する姿勢。確かな実行力で、事業の継続性を支えます。
          </p>
        </div>

        <div data-grid className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {cards.map((s) => (
            <article
              key={s.label}
              data-card
              className="group relative overflow-hidden rounded-[1.5rem] bg-surface p-8 ring-1 ring-line/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_36px_70px_-48px_rgba(11,31,51,0.5)]"
            >
              <span className="pointer-events-none absolute -right-2 -top-6 select-none text-[5.5rem] font-semibold uppercase leading-none tracking-tighter text-pale/50 transition-colors duration-500 group-hover:text-pale">
                {s.label.split(" ")[0]}
              </span>
              <div className="relative">
                <p className="label text-steel">{s.label}</p>
                <h3 className="mt-5 text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </article>
          ))}

          {/* Featured: Public Sector / qualification */}
          <article
            data-card
            className="relative overflow-hidden rounded-[1.5rem] bg-navy p-8 text-white ring-1 ring-white/10 md:col-span-2"
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.1] bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:44px_44px]" aria-hidden />
            <span className="pointer-events-none absolute -bottom-8 right-2 select-none text-[7rem] font-semibold uppercase leading-none tracking-tighter text-white/[0.04]">
              Public
            </span>
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="label text-cyan/90">{featured.label}</p>
                <h3 className="mt-5 text-2xl font-semibold">{featured.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{featured.body}</p>
              </div>
              <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.05] px-6 py-5">
                <div>
                  <p className="text-base font-semibold leading-tight">{site.qualification}</p>
                  <p className="mt-1 text-xs text-white/55">各省庁・公的機関の入札案件に対応</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
