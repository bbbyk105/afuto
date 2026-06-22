import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "お問い合わせ",
  description:
    "IT・オフィス・設備・施工の課題は、合同会社アフトへ。現状の整理から導入・運用後のサポートまで、まとめてご相談いただけます。",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        titleEn="Contact"
        titleJa="まずは、お気軽にご相談ください。"
        lead="現状の課題が漠然としていても問題ありません。お話を伺いながら、最適な進め方をご提案します。"
      />

      <section className="bg-bg py-[clamp(4rem,8vw,8rem)]">
        <div className="mx-auto grid max-w-(--container) grid-cols-1 gap-14 px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:px-10">
          {/* Info column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-xl font-semibold text-ink">お問い合わせ先</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              フォームのほか、お電話でも承っております。お急ぎの場合はお電話をご利用ください。
            </p>

            <ul className="mt-9 space-y-7">
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-deep">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="label text-steel">お電話（TEL / FAX）</p>
                  <a
                    href={`tel:${site.tel.replace(/-/g, "")}`}
                    className="serif-num mt-1 block text-xl font-semibold text-ink hover:text-deep"
                  >
                    {site.tel}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-deep">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="label text-steel">メール</p>
                  <p className="mt-1 text-base font-medium text-ink">24時間365日受付</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-deep">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="label text-steel">所在地</p>
                  <p className="mt-1 text-base leading-relaxed text-ink">{site.address}</p>
                </div>
              </li>
            </ul>

            <div className="mt-10 rounded-2xl border border-line bg-surface p-6">
              <p className="text-sm leading-relaxed text-muted">
                {site.qualification}。各省庁および公的機関の入札案件にも対応可能です。
              </p>
            </div>
          </div>

          {/* Form column */}
          <div className="rounded-[1.75rem] border border-line bg-surface/60 p-7 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
