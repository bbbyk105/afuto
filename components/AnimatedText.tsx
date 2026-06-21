"use client";

import { useRef, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, onReveal } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";

/**
 * Line-by-line mask reveal for headings.
 * Pass `lines` as an array (each entry is one visual line) or a string with
 * "\n" separators. Each line sits inside an overflow-hidden mask and slides up.
 */
export default function AnimatedText({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  trigger = "scroll",
  delay = 0,
}: {
  lines: string | string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  trigger?: "scroll" | "load";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const items = Array.isArray(lines) ? lines : lines.split("\n");

  useGSAP(
    () => {
      if (prefersReduced || !ref.current) return;
      const targets = ref.current.querySelectorAll<HTMLElement>("[data-line]");
      gsap.set(targets, { yPercent: 110 });

      const play = () =>
        gsap.to(targets, {
          yPercent: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.1,
          delay,
          overwrite: "auto",
        });

      if (trigger === "scroll") {
        onReveal(ref.current, play);
      } else {
        play();
      }
    },
    { scope: ref, dependencies: [prefersReduced] },
  );

  return (
    <Tag className={className} ref={ref}>
      {items.map((line, i) => (
        <span key={i} className="reveal-mask">
          <span data-line className={cn("block", lineClassName)}>
            {line === "" ? " " : line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
