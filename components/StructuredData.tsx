import { site } from "@/data/site";

/**
 * サイト全体の構造化データ（JSON-LD）。
 * Google に認識させるため必ず body 内に <script type="application/ld+json"> で出力する
 * （metadata.other 経由だと <meta> になり無効）。
 */
export default function StructuredData() {
  const telE164 = "+81-" + site.tel.replace(/^0/, "").replace(/-/g, "-");

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.nameEn,
    url: site.url,
    logo: `${site.url}/logos/logo.webp`,
    description: site.description,
    email: site.email,
    telephone: telE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.replace(/^神奈川県横浜市/, ""),
      addressLocality: "横浜市泉区",
      addressRegion: "神奈川県",
      addressCountry: "JP",
    },
    areaServed: "JP",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: telE164,
      email: site.email,
      contactType: "sales",
      areaServed: "JP",
      availableLanguage: ["Japanese"],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "ja-JP",
    publisher: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
