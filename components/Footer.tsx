import Image from "next/image";
import Link from "next/link";
import { footerNav } from "@/data/nav";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#08090b] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-grid" aria-hidden />
      <div className="relative mx-auto max-w-(--container) px-6 lg:px-10">
        <div className="grid gap-14 border-b border-white/10 py-20 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="合同会社アフト トップへ" className="inline-flex">
              <Image
                src="/logos/logo-dark.webp"
                alt="合同会社アフト"
                width={711}
                height={126}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/65">
              合同会社アフト。<br />
              企業の生産性を支えるパートナーとして、IT・オフィス・設備・施工・流通を一気通貫で支援します。
            </p>
          </div>

          <nav aria-label="フッターナビ">
            <p className="label text-white/45">Navigation</p>
            <ul className="mt-6 space-y-3.5">
              {footerNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center text-sm text-white/75 transition-colors hover:text-white"
                  >
                    <span className="mr-2 h-px w-0 bg-white/60 transition-all duration-300 group-hover:w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label text-white/45">Company</p>
            <address className="mt-6 space-y-3 text-sm not-italic leading-relaxed text-white/75">
              <p>{site.address}</p>
              <p>
                TEL / FAX{" "}
                <a href={`tel:${site.tel.replace(/-/g, "")}`} className="hover:text-white">
                  {site.tel}
                </a>
              </p>
              <p className="text-white/55">{site.qualification}</p>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Aft LLC. All rights reserved.</p>
          <p className="label text-white/40">Office Infrastructure / Business Continuity</p>
        </div>
      </div>
    </footer>
  );
}
