import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "ghost-light";

const base =
  "group/btn inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white hover:-translate-y-0.5 hover:bg-deep shadow-[0_10px_30px_-12px_rgba(11,31,51,0.5)]",
  secondary:
    "border border-line-strong bg-transparent text-ink hover:-translate-y-0.5 hover:border-navy hover:bg-ink/[0.03]",
  "ghost-light":
    "border border-white/25 bg-transparent text-white hover:-translate-y-0.5 hover:bg-white hover:text-navy",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className,
  arrow = true,
  type,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1"
          aria-hidden
        />
      )}
    </>
  );

  if (href) {
    const isHash = href.startsWith("/#") || href.startsWith("#");
    if (isHash) {
      return (
        <a href={href} className={cn(base, variants[variant], className)}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cn(base, variants[variant], className)}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      className={cn(base, variants[variant], className)}
    >
      {inner}
    </button>
  );
}
