"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { nav } from "@/data/nav";
import { site } from "@/data/site";
import { cn } from "@/utils/cn";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const prefersReduced = usePrefersReducedMotion();
  const pathname = usePathname();

  // The homepage hero is a dark full-bleed scene, so at the top of that page
  // the header needs light chrome. Once scrolled (glass bar) or on any light
  // subpage, fall back to ink-on-light.
  const onDark = pathname === "/" && !scrolled;

  // Glass-on-scroll + first-load entrance.
  useGSAP(
    () => {
      const onScroll = () => setScrolled(window.scrollY > 24);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      if (!prefersReduced && headerRef.current) {
        gsap.from(headerRef.current.querySelectorAll("[data-head]"), {
          y: -16,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          delay: 0.15,
        });
      }
      return () => window.removeEventListener("scroll", onScroll);
    },
    { scope: headerRef, dependencies: [prefersReduced] },
  );

  // Mobile menu open/close animation.
  useGSAP(
    () => {
      if (!menuRef.current) return;
      if (prefersReduced) {
        gsap.set(menuRef.current, { autoAlpha: open ? 1 : 0 });
        gsap.set(menuRef.current.querySelectorAll("[data-mi]"), { y: 0, opacity: 1 });
        return;
      }
      if (open) {
        gsap.set(menuRef.current, { autoAlpha: 1 });
        gsap.fromTo(
          menuRef.current.querySelectorAll("[data-mi]"),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.06, delay: 0.05 },
        );
      } else {
        gsap.to(menuRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.out" });
      }
    },
    { dependencies: [open, prefersReduced] },
  );

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-line bg-bg/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-(--container) items-center justify-between px-6 transition-all duration-500 lg:px-10",
          scrolled ? "h-16" : "h-[84px]",
        )}
      >
        <Link
          href="/"
          data-head
          className={cn(
            "flex items-baseline gap-2 transition-colors",
            onDark ? "text-white" : "text-ink",
          )}
          aria-label="合同会社アフト トップへ"
        >
          <span className="text-xl font-semibold tracking-tight">AFT</span>
          <span className={cn("label transition-colors", onDark ? "text-white/55" : "text-steel")}>
            Aft LLC
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="メインナビ">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              data-head
              className={cn(
                "group relative text-sm font-medium transition-colors",
                onDark ? "text-white/75 hover:text-white" : "text-ink/80 hover:text-ink",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full",
                  onDark ? "bg-white" : "bg-navy",
                )}
              />
            </Link>
          ))}
          <Link
            href="/contact"
            data-head
            className={cn(
              "group/btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5",
              onDark
                ? "border border-white/30 text-white hover:bg-white/10"
                : "bg-navy text-white hover:bg-[#1d3450]",
            )}
          >
            Contact
          </Link>
        </nav>

        <button
          data-head
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "relative z-50 flex h-10 w-10 items-center justify-center rounded-full border transition-colors md:hidden",
            onDark ? "border-white/30 text-white" : "border-line text-ink",
          )}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className="invisible fixed inset-0 z-40 flex flex-col bg-bg/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
        style={{ opacity: 0 }}
      >
        <nav className="flex flex-col" aria-label="モバイルナビ">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              data-mi
              onClick={() => setOpen(false)}
              className="border-b border-line py-5 text-2xl font-medium tracking-tight"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          data-mi
          onClick={() => setOpen(false)}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-navy px-7 py-4 text-base font-medium text-white"
        >
          お問い合わせ
        </Link>
        <p data-mi className="mt-auto pt-10 label text-steel">
          {site.address}
        </p>
      </div>
    </header>
  );
}
