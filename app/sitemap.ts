import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * 静的ルートのサイトマップ。ページを追加したらここにも追記する。
 * priority は重要度の相対値（トップ=1.0 > 事業/サービス詳細 > 会社/問い合わせ）。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/service", priority: 0.9, changeFrequency: "monthly" },
    { path: "/service/office", priority: 0.8, changeFrequency: "monthly" },
    { path: "/service/construction", priority: 0.8, changeFrequency: "monthly" },
    { path: "/service/trade", priority: 0.8, changeFrequency: "monthly" },
    { path: "/web", priority: 0.8, changeFrequency: "monthly" },
    { path: "/company", priority: 0.7, changeFrequency: "monthly" },
    { path: "/news", priority: 0.6, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ];

  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
