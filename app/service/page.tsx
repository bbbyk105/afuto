import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import Process from "@/components/Process";
import FinalCTA from "@/components/FinalCTA";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "事業内容",
  description:
    "ITソリューション、建設・インフラサポート、オフィスソリューション、流通・グローバルサポート。アフトの4つの支援領域をご紹介します。",
};

export default function ServicePage() {
  return (
    <>
      <PageHero
        label="Service"
        titleEn="Service"
        titleJa="事業を支える、4つの支援領域。"
        lead="IT・オフィス・設備・施工・流通まで。領域を横断して、企業の生産性とコストを最適化します。"
      />

      {/* Overview list */}
      <section className="bg-bg py-[clamp(4rem,8vw,8rem)]">
        <div className="mx-auto max-w-(--container) px-6 lg:px-10">
          <SectionLabel>Overview</SectionLabel>
          <div className="mt-12">
            {services.map((s) => (
              <Reveal
                key={s.no}
                className="grid grid-cols-1 gap-6 border-t border-line py-10 last:border-b md:grid-cols-[auto_0.5fr_1fr] md:items-start md:gap-12"
              >
                <span className="serif-num text-3xl font-semibold text-steel">{s.no}</span>
                <div>
                  <h2 className="display text-[clamp(1.5rem,2.8vw,2.2rem)] text-ink">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-base text-deep">{s.subtitle}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-base leading-[1.95] text-muted">{s.body}</p>
                  <Link
                    href={s.href}
                    className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-deep transition-colors hover:text-ink"
                  >
                    詳しく見る
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <FinalCTA />
    </>
  );
}
