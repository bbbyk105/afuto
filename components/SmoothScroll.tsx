"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { ScrollTrigger } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const pathnameRef = useRef(pathname);
  const positions = useRef<Map<string, number>>(new Map());
  const isPopRef = useRef(false);

  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Drive Lenis from GSAP's ticker for frame-perfect sync with ScrollTrigger.
    lenis.on("scroll", ScrollTrigger.update);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  // Continuously remember the scroll position of the current route, and flag
  // back/forward (popstate) navigations so we can tell them apart from regular
  // link clicks.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const onScroll = () => {
      positions.current.set(pathnameRef.current, window.scrollY);
    };
    const onPop = () => {
      isPopRef.current = true;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  // On route change:
  //  • forward navigation (link click) → jump to the top
  //  • back / forward (popstate)       → restore where the user left that page
  //  • in-page anchor (/#about)        → leave it to the browser
  useEffect(() => {
    if (typeof window === "undefined") return;
    pathnameRef.current = pathname;

    const isBack = isPopRef.current;
    isPopRef.current = false;

    const scrollTo = (y: number) => {
      if (lenisRef.current) lenisRef.current.scrollTo(y, { immediate: true });
      else window.scrollTo(0, y);
    };

    if (isBack) {
      scrollTo(positions.current.get(pathname) ?? 0);
      return;
    }

    if (window.location.hash) return;
    scrollTo(0);
  }, [pathname]);

  return <>{children}</>;
}
