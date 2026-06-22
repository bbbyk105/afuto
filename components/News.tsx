import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import { news } from "@/data/services";
import { ArrowUpRight } from "lucide-react";

export default function News() {
  return (
    <section id="news" className="scroll-mt-24 bg-bg-alt py-[clamp(5rem,9vw,9rem)]">
      <div className="mx-auto max-w-(--container) px-6 lg:px-10">
        <div className="flex items-end justify-between">
          <div>
            <SectionLabel>News</SectionLabel>
            <h2 className="mt-6 display text-[clamp(1.7rem,3.4vw,2.6rem)] text-ink">
              お知らせ
            </h2>
          </div>
          <Link
            href="/#news"
            className="group hidden items-center gap-2 text-sm font-medium text-deep sm:inline-flex"
          >
            一覧を見る
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <Reveal stagger className="mt-12 overflow-hidden rounded-[1.5rem] bg-surface shadow-[0_30px_70px_-52px_rgba(11,31,51,0.5)] ring-1 ring-line-strong">
          {news.map((n) => (
            <Link
              key={n.date + n.title}
              href="/news"
              className="group flex flex-col gap-3 px-8 py-9 transition-colors hover:bg-pale/25 sm:flex-row sm:items-center sm:gap-10"
            >
              <time className="serif-num text-sm font-medium text-steel">{n.date}</time>
              <span className="inline-flex w-fit items-center rounded-full bg-pale/60 px-3 py-1 text-xs font-medium text-deep">
                Information
              </span>
              <p className="flex-1 text-base font-medium text-ink">{n.title}</p>
              <span className="hidden h-9 w-9 items-center justify-center rounded-full bg-bg-alt text-steel transition-colors group-hover:bg-navy group-hover:text-white sm:flex">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
