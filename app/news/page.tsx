import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FinalCTA from "@/components/FinalCTA";
import { news } from "@/data/services";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "合同会社アフトからのお知らせ・新着情報の一覧です。",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        label="News"
        titleEn="News"
        titleJa="お知らせ"
        lead="合同会社アフトからの新着情報をお届けします。"
      />

      <section className="bg-bg py-[clamp(4rem,8vw,8rem)]">
        <div className="mx-auto max-w-(--container) px-6 lg:px-10">
          {news.length > 0 ? (
            <Reveal
              stagger
              className="overflow-hidden rounded-card bg-surface ring-1 ring-line/50"
            >
              {news.map((n, i) => (
                <article
                  key={n.date + n.title}
                  className={`flex flex-col gap-3 px-8 py-9 sm:flex-row sm:items-center sm:gap-10 ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <time className="serif-num text-sm font-medium text-steel">
                    {n.date}
                  </time>
                  <span className="inline-flex w-fit items-center rounded-full bg-soft px-3 py-1 text-xs font-medium text-deep">
                    Information
                  </span>
                  <p className="flex-1 text-[1.0625rem] font-medium leading-relaxed text-ink">
                    {n.title}
                  </p>
                </article>
              ))}
            </Reveal>
          ) : (
            <p className="text-[0.9375rem] leading-[1.9] text-muted">
              現在、お知らせはありません。
            </p>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
