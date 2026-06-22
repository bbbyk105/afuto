import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import FinalCTA from "@/components/FinalCTA";
import { company } from "@/data/company";

export const metadata: Metadata = {
  alternates: { canonical: "/company" },
  title: "会社概要",
  description:
    "合同会社アフトの会社概要。代表挨拶、所在地、全省庁統一資格などの基本情報をご案内します。",
};

export default function CompanyPage() {
  return (
    <>
      <PageHero
        label="Company"
        titleEn="Company"
        titleJa="信頼に応え続ける、実行力のあるパートナー。"
        lead="複数の分野を横断して企業活動を支えてきた経験と、現場で培った実行力。私たちのことを、もう少し詳しくご紹介します。"
      />

      {/* Greeting */}
      <section className="bg-bg py-[clamp(4rem,8vw,8rem)]">
        <div className="mx-auto grid max-w-(--container) grid-cols-1 gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
          <div>
            <SectionLabel>Message</SectionLabel>
            <h2 className="mt-6 display text-[clamp(1.6rem,3vw,2.4rem)] text-ink">
              {company.greeting.heading}
            </h2>
            <p className="mt-8 flex items-baseline gap-3">
              <span className="label text-steel">{company.greeting.role}</span>
              <span className="text-lg font-semibold text-ink">{company.greeting.name}</span>
            </p>
          </div>
          <Reveal stagger className="space-y-6 border-l border-line-strong pl-8 lg:pt-2">
            {company.greeting.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-[2] text-muted">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Profile */}
      <section className="border-t border-line bg-bg-alt py-[clamp(4rem,8vw,8rem)]">
        <div className="mx-auto max-w-(--container) px-6 lg:px-10">
          <SectionLabel>Corporate Profile</SectionLabel>
          <h2 className="mt-6 display text-[clamp(1.6rem,3vw,2.4rem)] text-ink">会社概要</h2>
          <Reveal stagger className="mt-12 overflow-hidden rounded-[1.5rem] border border-line bg-surface">
            {company.profile.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 gap-2 border-b border-line px-7 py-6 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:gap-8"
              >
                <dt className="label pt-1 text-steel">{row.label}</dt>
                <dd className="text-base leading-relaxed text-ink">{row.value}</dd>
              </div>
            ))}
          </Reveal>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
            全省庁統一資格（全国）を取得しており、各省庁および公的機関の入札案件にも対応可能です。官公庁案件を含め、まずはお気軽にご相談ください。
          </p>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
