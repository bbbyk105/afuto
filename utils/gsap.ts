"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register once, unconditionally. ScrollTrigger guards its own window access,
// so this is SSR-safe, and registering here guarantees the plugin is bundled
// and available before any useGSAP effect runs a scrollTrigger tween.
gsap.registerPlugin(useGSAP, ScrollTrigger);

type Target = gsap.TweenTarget | null | undefined;

/**
 * Fire `callback` once, the first time `trigger` scrolls into view.
 *
 * The animation you start inside the callback is a normal (detached) tween, so
 * a later `ScrollTrigger.refresh()` — triggered by other sections mounting,
 * fonts/images loading, or layout shifts — can never interrupt it mid-play and
 * leave elements stuck half-revealed. This is the core fix for "frozen
 * stagger" reveals.
 */
export function onReveal(
  trigger: Element | null | undefined,
  callback: () => void,
  start = "top 82%",
) {
  if (!trigger) return;
  ScrollTrigger.create({ trigger, start, once: true, onEnter: callback });
}

/**
 * Refresh-safe scroll reveal: pre-set `from`, then animate to `to` on enter.
 */
export function reveal(
  targets: Target,
  opts: {
    trigger: Element | null | undefined;
    from: gsap.TweenVars;
    to: gsap.TweenVars;
    start?: string;
  },
) {
  if (!targets) return;
  gsap.set(targets, opts.from);
  onReveal(
    opts.trigger,
    () => gsap.to(targets, { ...opts.to, overwrite: "auto" }),
    opts.start,
  );
}

export { gsap, ScrollTrigger };
