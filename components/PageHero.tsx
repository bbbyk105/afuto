import SectionLabel from "@/components/SectionLabel";
import AnimatedText from "@/components/AnimatedText";

export default function PageHero({
  label,
  titleEn,
  titleJa,
  lead,
}: {
  label: string;
  titleEn: string;
  titleJa: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg bg-noise pt-[calc(var(--header-h)+clamp(4rem,8vw,8rem))] pb-[clamp(3rem,6vw,6rem)]">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.3]" aria-hidden />
      <div className="relative mx-auto max-w-(--container) px-6 lg:px-10">
        <SectionLabel>{label}</SectionLabel>
        <AnimatedText
          as="h1"
          trigger="load"
          lines={[titleEn]}
          delay={0.2}
          className="mt-6 display text-[clamp(3rem,9vw,7rem)] uppercase tracking-tight text-ink"
        />
        <p className="mt-4 text-lg font-medium text-deep">{titleJa}</p>
        {lead && (
          <p className="mt-7 max-w-2xl text-base leading-[1.95] text-muted">{lead}</p>
        )}
      </div>
    </section>
  );
}
