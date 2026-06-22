import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import RevealScope, { type RevealDirective } from "@/components/RevealScope";
import { site } from "@/data/site";

const directives: RevealDirective[] = [
  {
    select: "[data-cta-line]",
    start: "top 70%",
    from: { yPercent: 115 },
    to: { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.12 },
  },
  {
    select: "[data-cta-up]",
    start: "top 70%",
    from: { opacity: 0, y: 22 },
    to: { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.3 },
  },
];

export default function FinalCTA() {
  return (
    <RevealScope directives={directives} className="relative overflow-hidden bg-[#08090b] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.09] bg-grid" aria-hidden />
      {/* animated network nodes */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g stroke="white" strokeWidth="1" opacity="0.35">
          <path d="M0 380 L260 300 L520 360 L820 260 L1080 320 L1200 280" />
          <path d="M120 120 L380 180 L700 110 L980 190 L1200 140" />
        </g>
        {[
          [260, 300],
          [520, 360],
          [820, 260],
          [380, 180],
          [700, 110],
          [980, 190],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill="var(--color-cyan)">
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur={`${3 + i * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      <div className="relative mx-auto max-w-(--container) px-6 py-[clamp(6rem,12vw,12rem)] lg:px-10">
        <SectionLabel tone="light">Contact</SectionLabel>
        <h2 className="mt-7 display text-[clamp(2.2rem,6vw,5rem)] text-white">
          <span className="reveal-mask">
            <span data-cta-line className="block">
              IT・オフィス・設備の課題を、
            </span>
          </span>
          <span className="reveal-mask">
            <span data-cta-line className="block text-steel">
              まとめて相談しませんか。
            </span>
          </span>
        </h2>

        <p data-cta-up className="mt-9 max-w-xl text-base leading-[1.95] text-white/70">
          現状の整理から、導入・施工・運用後のサポートまで。企業ごとの課題に合わせて、最適な環境づくりを支援します。
        </p>

        <div data-cta-up className="mt-11 flex flex-wrap gap-3">
          <Button href="/contact" variant="ghost-light">
            お問い合わせ
          </Button>
          <Button href="/service" variant="ghost-light" arrow={false}>
            事業内容を見る
          </Button>
        </div>

        <dl
          data-cta-up
          className="mt-16 grid max-w-2xl grid-cols-1 gap-6 border-t border-white/15 pt-10 sm:grid-cols-2"
        >
          <div>
            <dt className="label text-white/45">メールでのお問い合わせ</dt>
            <dd className="mt-2 text-lg font-medium text-white">24時間365日受付</dd>
          </div>
          <div>
            <dt className="label text-white/45">お急ぎの方</dt>
            <dd className="mt-2">
              <a
                href={`tel:${site.tel.replace(/-/g, "")}`}
                className="serif-num text-2xl font-semibold text-white transition-colors hover:text-cyan"
              >
                {site.tel}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </RevealScope>
  );
}
