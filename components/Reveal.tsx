"use client";

import { useRef, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import { reveal } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Generic scroll-triggered fade-up. Animates direct children with a stagger
 * when `stagger` is true, otherwise the element itself.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  y = 28,
  delay = 0,
  stagger = false,
  start = "top 85%",
}: {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: boolean;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReduced || !ref.current) return;
      const targets = stagger
        ? (Array.from(ref.current.children) as HTMLElement[])
        : [ref.current];

      reveal(targets, {
        trigger: ref.current,
        start,
        from: { opacity: 0, y },
        to: {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: stagger ? 0.09 : 0,
          delay,
        },
      });
    },
    { scope: ref, dependencies: [prefersReduced] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
