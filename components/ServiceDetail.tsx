import { Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import Process from "@/components/Process";
import FinalCTA from "@/components/FinalCTA";
import type { ServiceDetailData } from "@/data/services";

export default function ServiceDetail({ data }: { data: ServiceDetailData }) {
  return (
    <>
      <PageHero
        label={data.label}
        titleEn={data.titleEn}
        titleJa={data.titleJa}
        lead={data.lead}
      />

      {/* ── Overview + lineup ─────────────────────────────────────── */}
      <section className="bg-bg py-[clamp(4rem,8vw,8rem)]">
        <div className="mx-auto max-w-(--container) px-6 lg:px-10">
          <SectionLabel>Overview</SectionLabel>
          <p className="mt-7 max-w-3xl text-[clamp(1.05rem,1.5vw,1.3rem)] font-medium leading-[2.1] text-deep">
            {data.overview}
          </p>

          <div className="mt-20 flex items-baseline gap-4">
            <h2 className="text-lg font-semibold text-ink">サービス内容</h2>
            <span className="h-px flex-1 bg-line" />
            <span className="label text-steel">{data.itemsLabel}</span>
          </div>

          <Reveal
            stagger
            className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2 lg:grid-cols-3"
          >
            {data.items.map((item) => (
              <div
                key={item.no}
                className="flex flex-col bg-surface p-9 transition-colors duration-300 hover:bg-soft lg:p-10"
              >
                <span className="serif-num text-3xl font-semibold text-steel">
                  {item.no}
                </span>
                <h3 className="mt-7 text-[1.0625rem] font-semibold leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-[2] text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </Reveal>

          {/* optional consulting block */}
          {data.extra && (
            <Reveal className="mt-12 overflow-hidden rounded-card bg-surface p-8 ring-1 ring-line/60 sm:p-12">
              <SectionLabel>{data.extra.label}</SectionLabel>
              <h3 className="mt-6 display text-[clamp(1.4rem,2.6vw,2rem)] text-ink">
                {data.extra.title}
              </h3>
              <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[2] text-muted">
                {data.extra.intro}
              </p>
              <ul className="mt-9 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
                {data.extra.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 border-t border-line pt-5 text-[0.95rem] leading-[1.9] text-deep"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-deep" aria-hidden />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      <Process />
      <FinalCTA />
    </>
  );
}
