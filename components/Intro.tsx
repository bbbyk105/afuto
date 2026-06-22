import SectionLabel from "@/components/SectionLabel";
import AnimatedText from "@/components/AnimatedText";
import MediaFrame from "@/components/MediaFrame";
import RevealScope, { type RevealDirective } from "@/components/RevealScope";

const directives: RevealDirective[] = [
  {
    select: "[data-p]",
    trigger: "[data-pwrap]",
    start: "top 78%",
    from: { opacity: 0, y: 22 },
    to: { opacity: 1, y: 0, duration: 0.95, ease: "power3.out", stagger: 0.12 },
  },
  {
    select: "[data-introcard]",
    each: true,
    start: "top 85%",
    from: { clipPath: "inset(0 0 100% 0)" },
    to: { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "expo.out" },
  },
  {
    parallax: "to",
    select: "[data-bigword]",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    vars: { xPercent: -12 },
  },
];

export default function Intro() {
  return (
    <RevealScope
      id="about"
      directives={directives}
      className="relative scroll-mt-24 overflow-hidden bg-bg-alt py-[clamp(6rem,11vw,12rem)]"
    >
      {/* giant background word */}
      <span
        data-bigword
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[18vw] font-semibold leading-none tracking-tighter text-ink/[0.035]"
      >
        INFRASTRUCTURE
      </span>

      <div className="relative mx-auto grid max-w-(--container) grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-10">
        <div>
          <SectionLabel>About / Statement</SectionLabel>
          <AnimatedText
            as="h2"
            lines={["The infrastructure", "behind your business."]}
            className="mt-7 display text-[clamp(2rem,4.8vw,3.7rem)] text-ink"
          />
          <p data-introcard className="mt-9 max-w-md text-lg leading-relaxed text-deep">
            オフィス、ネットワーク、通信、設備、施工。
            <br />
            企業活動を支える要素は、目に見えない部分ほど重要です。
          </p>
        </div>

        <div data-pwrap className="relative">
          <div className="space-y-5">
            <p data-p className="text-base leading-[2] text-muted">
              合同会社アフトは、企業のオフィス環境とITインフラの最適化を支援するソリューションプロバイダーです。
            </p>
            <p data-p className="text-base leading-[2] text-muted">
              OA機器・ネットワーク環境・システム構築・サポートを一貫して提供し、業務効率化とコスト最適化を実現します。単なる機器販売にとどまらず、現状に合った最適な提案から導入・運用・保守までを支援します。
            </p>
            <div data-p className="flex flex-wrap gap-2.5 pt-1">
              {["Smart Office", "Secure Network", "One-stop Support", "Cost Optimization"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full bg-pale/70 px-4 py-1.5 text-xs font-medium text-deep"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* photo accent so it isn't text-only */}
          <MediaFrame
            data-introcard
            src="/images/network.jpg"
            alt="ネットワーク・サーバー環境の構築"
            label="Network · System"
            caption="止めない環境を"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="mt-8 h-44 w-full rounded-2xl shadow-[0_30px_70px_-45px_rgba(11,31,51,0.55)]"
          />
        </div>
      </div>
    </RevealScope>
  );
}
