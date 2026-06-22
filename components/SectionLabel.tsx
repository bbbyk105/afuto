import { cn } from "@/utils/cn";

export default function SectionLabel({
  children,
  className,
  tone = "muted",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "muted" | "light";
}) {
  return (
    <span
      className={cn(
        "label inline-flex items-center gap-3",
        tone === "muted" ? "text-steel" : "text-white/55",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-7",
          tone === "muted" ? "bg-line-strong" : "bg-white/30",
        )}
      />
      {children}
    </span>
  );
}
