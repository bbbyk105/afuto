"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { reveal } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SectionLabel from "@/components/SectionLabel";
import AnimatedText from "@/components/AnimatedText";
import Button from "@/components/Button";
import { company } from "@/data/company";

export default function CompanyPreview() {
  const root = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReduced || !root.current) return;
      const card = root.current.querySelector("[data-card]");
      const greetWrap = root.current.querySelector("[data-greetwrap]");

      reveal(root.current.querySelector("[data-card]"), {
        trigger: card,
        start: "top 84%",
        from: { clipPath: "inset(0 0 100% 0)" },
        to: { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "expo.out" },
      });
      reveal(root.current.querySelectorAll("[data-row]"), {
        trigger: card,
        start: "top 82%",
        from: { opacity: 0, y: 16 },
        to: { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.06, delay: 0.25 },
      });
      reveal(root.current.querySelectorAll("[data-greet]"), {
        trigger: greetWrap,
        start: "top 80%",
        from: { opacity: 0, y: 22 },
        to: { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 },
      });
    },
    { scope: root, dependencies: [prefersReduced] },
  );

  return (
    <section
      ref={root}
      id="company"
      className="relative scroll-mt-24 overflow-hidden bg-surface py-[clamp(5rem,9vw,9rem)]"
    >
      <div className="relative mx-auto grid max-w-(--container) grid-cols-1 gap-14 px-6 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-10">
        {/* Greeting */}
        <div data-greetwrap>
          <SectionLabel>Company</SectionLabel>
          <AnimatedText
            as="h2"
            lines={["信頼に応え続ける、", "実行力のあるパートナー。"]}
            className="mt-6 display text-[clamp(1.7rem,3.4vw,2.7rem)] text-ink"
          />
          <div className="mt-9 space-y-5">
            {company.greeting.paragraphs.map((p, i) => (
              <p key={i} data-greet className="text-base leading-[1.95] text-muted">
                {p}
              </p>
            ))}
          </div>
          <p data-greet className="mt-8 flex items-baseline gap-3">
            <span className="label text-steel">Representative</span>
            <span className="text-lg font-semibold text-ink">{company.greeting.name}</span>
          </p>
          <div data-greet className="mt-8">
            <Button href="/company" variant="secondary">会社概要を見る</Button>
          </div>
        </div>

        {/* Brand profile card */}
        <div className="lg:pt-2">
          <div
            data-card
            className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-navy to-darknavy p-8 text-white shadow-[0_50px_100px_-55px_rgba(11,31,51,0.7)] sm:p-10"
          >
            {/* coordinate decor */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.5]" aria-hidden>
              <defs>
                <pattern id="coordc" width="34" height="34" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.12)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#coordc)" />
            </svg>
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(143,182,196,0.25),transparent_70%)]" aria-hidden />

            {/* logo mark */}
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-3xl font-semibold tracking-tight">AFT</p>
                <p className="mt-1 label text-white/45">Aft LLC</p>
              </div>
              <span className="rounded-full border border-white/15 px-3 py-1 text-[0.65rem] text-cyan/90">
                Yokohama, JP
              </span>
            </div>

            <dl className="relative mt-9">
              {company.profile.map((row) => (
                <div
                  key={row.label}
                  data-row
                  className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-white/10 py-4 last:border-b-0 sm:grid-cols-[8rem_1fr]"
                >
                  <dt className="label pt-0.5 text-white/45">{row.label}</dt>
                  <dd className="text-sm leading-relaxed text-white/90">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
