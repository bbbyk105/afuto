import SectionLabel from "@/components/SectionLabel";
import AnimatedText from "@/components/AnimatedText";
import Button from "@/components/Button";
import RevealScope, { type RevealDirective } from "@/components/RevealScope";
import { company } from "@/data/company";

const directives: RevealDirective[] = [
  {
    select: "[data-card]",
    trigger: "[data-card]",
    start: "top 84%",
    from: { clipPath: "inset(0 0 100% 0)" },
    to: { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "expo.out" },
  },
  {
    select: "[data-row]",
    trigger: "[data-card]",
    start: "top 82%",
    from: { opacity: 0, y: 16 },
    to: { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.06, delay: 0.25 },
  },
  {
    select: "[data-greet]",
    trigger: "[data-greetwrap]",
    start: "top 80%",
    from: { opacity: 0, y: 22 },
    to: { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 },
  },
];

export default function CompanyPreview() {
  return (
    <RevealScope
      id="company"
      directives={directives}
      className="relative scroll-mt-24 overflow-hidden bg-surface py-[clamp(5rem,9vw,9rem)]"
    >
      <div className="relative mx-auto grid max-w-(--container) grid-cols-1 gap-14 px-6 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-10">
        {/* Greeting */}
        <div data-greetwrap>
          <SectionLabel>Company</SectionLabel>
          <AnimatedText
            as="h2"
            lines={["信頼に応え続ける、", "実行力のあるパートナー。"]}
            className="mt-6 display text-[clamp(1.7rem,3.4vw,2.7rem)] text-ink"
          />
          <div className="mt-9 space-y-5">
            {company.greeting.paragraphs.map((p, i) => (
              <p key={i} data-greet className="text-base leading-[1.95] text-muted">
                {p}
              </p>
            ))}
          </div>
          <p data-greet className="mt-8 flex items-baseline gap-3">
            <span className="label text-steel">Representative</span>
            <span className="text-lg font-semibold text-ink">{company.greeting.name}</span>
          </p>
          <div data-greet className="mt-8">
            <Button href="/company" variant="secondary">会社概要を見る</Button>
          </div>
        </div>

        {/* Brand profile card */}
        <div className="lg:pt-2">
          <div
            data-card
            className="relative overflow-hidden rounded-[1.75rem] bg-navy p-8 text-white ring-1 ring-white/10 shadow-[0_50px_100px_-55px_rgba(0,0,0,0.7)] sm:p-10"
          >
            {/* coordinate decor */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22] [mask-image:radial-gradient(80%_80%_at_85%_15%,#000,transparent_70%)]" aria-hidden>
              <defs>
                <pattern id="coordc" width="34" height="34" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.12)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#coordc)" />
            </svg>

            {/* logo mark */}
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-3xl font-semibold tracking-tight">AFT</p>
                <p className="mt-1 label text-white/45">Aft LLC</p>
              </div>
              <span className="rounded-full border border-white/15 px-3 py-1 text-[0.65rem] text-cyan/90">
                Yokohama, JP
              </span>
            </div>

            <dl className="relative mt-9">
              {company.profile.map((row) => (
                <div
                  key={row.label}
                  data-row
                  className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-white/10 py-4 last:border-b-0 sm:grid-cols-[8rem_1fr]"
                >
                  <dt className="label pt-0.5 text-white/45">{row.label}</dt>
                  <dd className="text-sm leading-relaxed text-white/90">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </RevealScope>
  );
}
