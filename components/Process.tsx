"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, reveal } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SectionLabel from "@/components/SectionLabel";
import AnimatedText from "@/components/AnimatedText";
import { process } from "@/data/services";

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReduced || !root.current) return;
      const steps = root.current.querySelector("[data-steps]");

      reveal(root.current.querySelectorAll("[data-step]"), {
        trigger: steps,
        start: "top 78%",
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 },
      });

      gsap.from("[data-line]", {
        scaleX: 0,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: "[data-steps]",
          start: "top 75%",
          end: "bottom 70%",
          scrub: 1,
        },
      });
    },
    { scope: root, dependencies: [prefersReduced] },
  );

  return (
    <section ref={root} className="relative border-t border-line bg-bg-alt py-[clamp(5rem,9vw,9rem)]">
      <div className="mx-auto max-w-(--container) px-6 lg:px-10">
        <SectionLabel>Process</SectionLabel>
        <AnimatedText
          as="h2"
          lines={["ご相談から導入・保守まで。"]}
          className="mt-6 display text-[clamp(1.8rem,3.8vw,3rem)] text-ink"
        />

        <div data-steps className="relative mt-20">
          {/* growing line (desktop) */}
          <span
            data-line
            className="absolute left-0 top-3 hidden h-px w-full bg-deep lg:block"
          />
          <span className="absolute left-0 top-3 hidden h-px w-full bg-line lg:block -z-10" />

          <ol className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {process.map((s) => (
              <li key={s.no} data-step className="relative lg:pr-4">
                <span className="relative z-10 hidden h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-deep bg-bg-alt lg:flex">
                  <span className="h-2 w-2 rounded-full bg-deep" />
                </span>
                <div className="flex items-baseline gap-3 lg:mt-6">
                  <span className="serif-num text-2xl font-semibold text-steel">{s.no}</span>
                  <h3 className="text-[1.0625rem] font-semibold text-ink">{s.title}</h3>
                </div>
                <p className="mt-4 text-[0.9375rem] leading-[1.9] text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
