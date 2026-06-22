import type { Metadata } from "next";
import { Check, Download, FileText } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import FinalCTA from "@/components/FinalCTA";
import {
  webReasons,
  priceTables,
  maintenancePlans,
  maintenanceNote,
  webOptions,
  webFlow,
} from "@/data/web";

export const metadata: Metadata = {
  alternates: { canonical: "/web" },
  title: "ホームページ制作・集客",
  description:
    "ランディングページからコーポレートサイト・ECサイトまで。SEO・MEO・運用保守まで一気通貫で支援するアフトのWeb制作・集客サービスと参考価格をご紹介します。",
};

export default function WebPage() {
  return (
    <>
      <PageHero
        label="Web"
        titleEn="Web"
        titleJa="作って終わりにしない、ホームページ制作・集客。"
        lead="ランディングページからコーポレートサイト・ECサイトまで。SEO・MEO・運用保守まで一気通貫で支援し、公開後に問い合わせが来るサイトを目指します。"
      />

      {/* ── Why choose us ─────────────────────────────────────────── */}
      <section className="bg-bg py-[clamp(4rem,8vw,8rem)]">
        <div className="mx-auto max-w-(--container) px-6 lg:px-10">
          <SectionLabel>Why choose us</SectionLabel>
          <h2 className="mt-6 display text-[clamp(1.8rem,3.8vw,3rem)] text-ink">
            選ばれる理由
          </h2>

          <Reveal
            stagger
            className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2 lg:grid-cols-4"
          >
            {webReasons.map((r) => (
              <div
                key={r.no}
                className="flex flex-col bg-surface p-7 transition-colors duration-300 hover:bg-soft"
              >
                <span className="serif-num text-3xl font-semibold text-steel/55">
                  {r.no}
                </span>
                <h3 className="mt-6 text-base font-semibold leading-snug text-ink">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{r.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Price tables ──────────────────────────────────────────── */}
      <section className="border-t border-line bg-bg-alt py-[clamp(4rem,8vw,8rem)]">
        <div className="mx-auto max-w-(--container) px-6 lg:px-10">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="mt-6 display text-[clamp(1.8rem,3.8vw,3rem)] text-ink">
            サービスと参考価格
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
            価格はすべて税込・参考価格です。ページ数・機能・デザインにより最適なプランをお見積りいたします。
          </p>

          <div className="mt-16 flex flex-col gap-20">
            {priceTables.map((table) => (
              <Reveal key={table.key}>
                <div className="flex items-baseline gap-4">
                  <h3 className="text-lg font-semibold text-ink">{table.title}</h3>
                  <span className="h-px flex-1 bg-line" />
                  <span className="label text-steel">{table.label}</span>
                </div>

                <div className="mt-7 overflow-hidden rounded-card ring-1 ring-line/60">
                  <ul>
                    {table.rows.map((row, i) => (
                      <li
                        key={row.name}
                        className={`grid grid-cols-1 gap-x-6 gap-y-1 bg-surface px-6 py-5 transition-colors duration-300 hover:bg-soft sm:grid-cols-[1.1fr_1.4fr_auto] sm:items-center ${
                          i > 0 ? "border-t border-line" : ""
                        }`}
                      >
                        <span className="text-sm font-semibold text-ink sm:text-[0.95rem]">
                          {row.name}
                        </span>
                        <span className="text-sm leading-relaxed text-muted">
                          {row.detail}
                        </span>
                        <span className="serif-num mt-1 text-base font-semibold text-deep sm:mt-0 sm:text-right sm:text-lg">
                          {row.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {table.note && (
                  <p className="mt-4 text-xs leading-relaxed text-steel">
                    ※ {table.note}
                  </p>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Maintenance plans ─────────────────────────────────────── */}
      <section className="border-t border-line bg-bg py-[clamp(4rem,8vw,8rem)]">
        <div className="mx-auto max-w-(--container) px-6 lg:px-10">
          <SectionLabel>Maintenance</SectionLabel>
          <h2 className="mt-6 display text-[clamp(1.8rem,3.8vw,3rem)] text-ink">
            月額保守・サポートプラン
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
            {maintenanceNote}
          </p>

          <Reveal stagger className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {maintenancePlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-card p-8 ring-1 transition-transform duration-300 hover:-translate-y-1 ${
                  plan.featured
                    ? "bg-surface ring-deep/50"
                    : "bg-surface ring-line/60"
                }`}
              >
                {plan.featured && (
                  <span className="absolute right-7 top-7 rounded-full bg-deep/15 px-3 py-1 text-[0.65rem] font-medium tracking-wide text-deep">
                    おすすめ
                  </span>
                )}
                <h3 className="text-base font-semibold text-ink">{plan.name}</h3>
                <p className="mt-5 flex items-baseline gap-1">
                  <span className="text-sm text-muted">月額</span>
                  <span className="serif-num text-4xl font-semibold text-ink">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted">円</span>
                </p>

                <ul className="mt-8 flex flex-col gap-3 border-t border-line pt-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-deep"
                        aria-hidden
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Options ───────────────────────────────────────────────── */}
      <section className="border-t border-line bg-bg-alt py-[clamp(4rem,8vw,8rem)]">
        <div className="mx-auto max-w-(--container) px-6 lg:px-10">
          <SectionLabel>Options</SectionLabel>
          <h2 className="mt-6 display text-[clamp(1.8rem,3.8vw,3rem)] text-ink">
            オプション
          </h2>

          <Reveal
            stagger
            className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2"
          >
            {webOptions.map((o) => (
              <div
                key={o.name}
                className="flex items-center justify-between gap-6 bg-surface px-6 py-5 transition-colors duration-300 hover:bg-soft"
              >
                <span className="text-sm font-medium text-ink">{o.name}</span>
                <span className="serif-num shrink-0 text-sm font-semibold text-deep">
                  {o.price}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Flow ──────────────────────────────────────────────────── */}
      <section className="border-t border-line bg-bg py-[clamp(5rem,9vw,9rem)]">
        <div className="mx-auto max-w-(--container) px-6 lg:px-10">
          <SectionLabel>Flow</SectionLabel>
          <h2 className="mt-6 display text-[clamp(1.8rem,3.8vw,3rem)] text-ink">
            制作の流れ
          </h2>

          <Reveal
            stagger
            className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6"
          >
            {webFlow.map((s) => (
              <div key={s.no} className="relative lg:pr-4">
                <span className="label text-steel">Step {s.no}</span>
                <h3 className="mt-4 text-base font-semibold text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-16">
            <Button href="/contact" variant="secondary">
              無料でお見積りを依頼する
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ── Document (proposal embed) ─────────────────────────────── */}
      <section className="border-t border-line bg-bg-alt py-[clamp(4rem,8vw,8rem)]">
        <div className="mx-auto max-w-(--container) px-6 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Document</SectionLabel>
              <h2 className="mt-6 display text-[clamp(1.8rem,3.8vw,3rem)] text-ink">
                ご提案資料
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
                サービス内容・参考価格・制作の流れをまとめた提案資料です。下記からそのままご覧いただけます。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/slides/aft-web-proposal.pdf"
                download="アフト_Web制作ご提案.pdf"
                className="inline-flex items-center gap-2.5 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-white/40 hover:bg-white/[0.04]"
              >
                <Download className="h-4 w-4" aria-hidden />
                PDFをダウンロード
              </a>
              <a
                href="/slides/aft-web-proposal.pptx"
                download="アフト_Web制作ご提案.pptx"
                className="inline-flex items-center gap-2.5 rounded-full border border-line px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                <FileText className="h-4 w-4" aria-hidden />
                PowerPoint
              </a>
            </div>
          </div>

          <Reveal className="mt-12 overflow-hidden rounded-card bg-surface ring-1 ring-line/60">
            <iframe
              src="/slides/aft-web-proposal.pdf#view=FitH"
              title="アフト Web制作ご提案資料"
              loading="lazy"
              className="h-[clamp(460px,72vh,820px)] w-full"
            />
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
