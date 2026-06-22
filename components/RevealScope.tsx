"use client";

import { useRef, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, reveal } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Serializable description of one scroll animation, so a Server Component can
 * declare its motion as plain data and keep all of its markup/content on the
 * server. The actual GSAP work runs only inside this small client island.
 *
 * - 通常: `select` の要素を `from` → `to` で reveal（`trigger` 未指定なら scope 自身）
 * - `each: true`: マッチした各要素をそれぞれ自身を trigger に個別 reveal
 * - `parallax`: scrub 連動。`"to"`=その値へ動かす / `"from"`=その値から戻す
 */
export type RevealDirective = {
  select: string;
  trigger?: string;
  start?: string;
  end?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  each?: boolean;
  parallax?: "to" | "from";
  scrub?: number | boolean;
  vars?: gsap.TweenVars;
};

export default function RevealScope({
  as: Tag = "section",
  id,
  className,
  directives,
  children,
}: {
  as?: ElementType;
  id?: string;
  className?: string;
  directives: RevealDirective[];
  children: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const scope = root.current;
      if (prefersReduced || !scope) return;

      for (const d of directives) {
        const triggerEl = d.trigger ? scope.querySelector(d.trigger) : scope;

        if (d.parallax) {
          const run = d.parallax === "to" ? gsap.to : gsap.from;
          run(scope.querySelectorAll(d.select), {
            ...d.vars,
            ease: "none",
            scrollTrigger: {
              trigger: triggerEl,
              start: d.start ?? "top bottom",
              end: d.end ?? "bottom top",
              scrub: d.scrub ?? true,
            },
          });
          continue;
        }

        if (d.each) {
          scope.querySelectorAll<HTMLElement>(d.select).forEach((el) =>
            reveal(el, { trigger: el, start: d.start, from: d.from!, to: d.to! }),
          );
          continue;
        }

        reveal(scope.querySelectorAll(d.select), {
          trigger: triggerEl,
          start: d.start,
          from: d.from!,
          to: d.to!,
        });
      }
    },
    { scope: root, dependencies: [prefersReduced] },
  );

  return (
    <Tag ref={root} id={id} className={className}>
      {children}
    </Tag>
  );
}
