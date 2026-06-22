"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, onReveal } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SectionLabel from "@/components/SectionLabel";
import Button from "@/components/Button";
import MediaFrame from "@/components/MediaFrame";
import { services } from "@/data/services";

/**
 * Photo slots per service. Drop a file into `public/images/` and set its `src`
 * here — the branded placeholder shows until then.
 */
const media: { src?: string; caption: string }[] = [
  { src: "/images/network.jpg", caption: "ITソリューション" },
  { src: "/images/construction.jpg", caption: "建設・インフラ" },
  { src: "/images/office-device.jpg", caption: "オフィス環境" },
  { src: "/images/trade.jpg", caption: "流通・グローバル" },
];

export default function ServiceShowcase() {
  const root = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReduced || !root.current) return;
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]", root.current);
      rows.forEach((row) => {
        const visual = row.querySelector("[data-visual]");
        const txt = row.querySelectorAll("[data-txt]");
        const num = row.querySelector("[data-num]");
        // pre-hide
        gsap.set(visual, { clipPath: "inset(0 0 100% 0)" });
        gsap.set(txt, { opacity: 0, y: 26 });
        gsap.set(num, { opacity: 0, x: -20 });

        onReveal(
          row,
          () => {
            const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
            tl.to(visual, { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "expo.out" })
              .to(
                txt,
                { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08 },
                "-=0.8",
              )
              .to(num, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, "-=0.7");
          },
          "top 78%",
        );
      });
    },
    { scope: root, dependencies: [prefersReduced] },
  );

  return (
    <section ref={root} id="service" className="scroll-mt-24 bg-bg py-[clamp(5rem,10vw,10rem)]">
      <div className="mx-auto max-w-(--container) px-6 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Service</SectionLabel>
            <h2 className="mt-6 display text-[clamp(1.9rem,4.2vw,3.4rem)] text-ink">
              事業を支える、<br className="sm:hidden" />4つの支援領域。
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            IT・オフィス・設備・施工・流通。領域を横断して、企業の生産性とコストを最適化します。
          </p>
        </div>

        <div className="mt-16 space-y-7">
          {services.map((s, i) => {
            const m = media[i];
            const reverse = i % 2 === 1;
            return (
              <article
                key={s.no}
                data-row
                className="group grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[2rem] bg-surface p-7 shadow-[0_30px_80px_-56px_rgba(11,31,51,0.55)] ring-1 ring-line/50 transition-shadow duration-500 hover:shadow-[0_40px_90px_-50px_rgba(11,31,51,0.5)] lg:grid-cols-2 lg:gap-12 lg:p-10"
              >
                {/* Text */}
                <div className={reverse ? "lg:order-2 lg:pl-6" : "lg:pr-6"}>
                  <div className="flex items-center gap-4">
                    <span data-num className="serif-num text-5xl font-semibold text-steel/55">
                      {s.no}
                    </span>
                    <span className="h-px flex-1 bg-line" />
                    <span className="label text-steel">{s.tags.join(" · ")}</span>
                  </div>
                  <h3 data-txt className="mt-7 display text-[clamp(1.7rem,3vw,2.6rem)] text-ink">
                    {s.title}
                  </h3>
                  <p data-txt className="mt-2.5 text-lg text-deep">{s.subtitle}</p>
                  <p data-txt className="mt-6 max-w-xl text-base leading-[1.95] text-muted">
                    {s.body}
                  </p>
                  <div data-txt className="mt-8">
                    <Button href={s.href} variant="secondary">詳しく見る</Button>
                  </div>
                </div>

                {/* Visual */}
                <div className={reverse ? "lg:order-1" : ""}>
                  <MediaFrame
                    data-visual
                    src={m.src}
                    alt={`${s.title}（${s.subtitle}）の様子`}
                    index={s.no}
                    label={s.tags.join(" · ")}
                    caption={m.caption}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="aspect-16/11 w-full rounded-[1.5rem] shadow-[0_30px_70px_-44px_rgba(11,31,51,0.6)]"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
