export type Problem = {
  no: string;
  en: string;
  title: string;
  body: string;
};

export const problems: Problem[] = [
  {
    no: "01",
    en: "Cost",
    title: "オフィス機器のコストが高い",
    body: "複合機・プリンター・通信機器など、利用状況に対してコストが最適化されていない。",
  },
  {
    no: "02",
    en: "Network",
    title: "ネットワークが不安定",
    body: "LAN・Wi-Fi・通信環境の不安定さが、日々の業務効率を静かに下げている。",
  },
  {
    no: "03",
    en: "Security",
    title: "セキュリティやバックアップが不安",
    body: "ウイルス対策、データ保護、バックアップ環境の整備が後回しになっている。",
  },
  {
    no: "04",
    en: "Integration",
    title: "相談先が分かれている",
    body: "内装、外装、通信、設備、OA機器で業者が分かれ、管理が煩雑になっている。",
  },
  {
    no: "05",
    en: "Maintenance",
    title: "導入後の保守が弱い",
    body: "トラブル発生時に対応が遅れ、業務停止のリスクが高まっている。",
  },
];

export type Service = {
  no: string;
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
};

export const services: Service[] = [
  {
    no: "01",
    title: "ITソリューション",
    subtitle: "デジタル環境の構築と最適化",
    body: "業務効率化を目的としたIT環境の設計・導入をサポートします。ネットワーク構築、システム導入、セキュリティ対策まで包括的に対応し、企業の課題に合わせた持続可能なIT基盤を構築します。",
    tags: ["Network", "System", "Security"],
  },
  {
    no: "02",
    title: "建設・インフラサポート",
    subtitle: "現場の「最適」を、多角的に",
    body: "オフィスから工場、商業施設まで、内装・外装・大規模修繕を一貫して支援。設備設置、自動販売機の設置・運用、原料見直しによるコスト削減提案まで、多角的にインフラを最適化します。",
    tags: ["Construction", "Facility", "Cost"],
  },
  {
    no: "03",
    title: "オフィスソリューション",
    subtitle: "OA・通信・ネットワークをワンストップで",
    body: "複合機・プリンター、ビジネスフォン、ネットワーク機器、LAN/Wi-Fi、PC・周辺機器、保守・メンテナンスまで、オフィス運営に必要な環境をまとめて支援します。",
    tags: ["OA", "Telecom", "Maintenance"],
  },
  {
    no: "04",
    title: "流通・グローバルサポート",
    subtitle: "国内外をつなぐ供給体制",
    body: "食品、化学製品、資源関連商材など、幅広い分野における商品供給を行います。国内外のネットワークを活かし、品質・コスト・納期のバランスを重視した供給体制を構築します。",
    tags: ["Trade", "Supply", "Global"],
  },
];

export type OfficeSolution = {
  no: string;
  title: string;
  body: string;
};

export const officeSolutions: OfficeSolution[] = [
  {
    no: "01",
    title: "複合機・プリンター導入支援",
    body: "企業規模や業務内容に合わせ、最適な複合機・プリンターを提案。コスト・使用頻度・設置環境を考慮し、導入から設置、初期設定まで対応します。",
  },
  {
    no: "02",
    title: "ビジネスフォン・通信機器",
    body: "内線・外線管理、リモートワーク対応など、業務効率を高める通信環境を構築します。",
  },
  {
    no: "03",
    title: "ネットワーク機器・LAN構築",
    body: "社内ネットワークの設計・構築から機器選定まで対応。安定性とセキュリティを重視したLAN・Wi-Fi環境を整備します。",
  },
  {
    no: "04",
    title: "パソコン・周辺機器",
    body: "業務用PC、モニター、周辺機器を用途別に提案。業務内容に合ったスペック選定で、生産性向上と長期運用を支援します。",
  },
  {
    no: "05",
    title: "セキュリティ・バックアップ対策",
    body: "ウイルス対策、データ保護、バックアップ環境の構築など、企業の情報資産を守る対策を実施します。",
  },
  {
    no: "06",
    title: "保守・メンテナンスサポート",
    body: "導入後のトラブル対応や定期メンテナンスにも対応。万が一の不具合時にも迅速にサポートし、業務停止リスクを軽減します。",
  },
];

export type FacilityTab = {
  key: string;
  label: string;
  body: string;
};

export const facility = {
  intro:
    "オフィス空間から大規模プラントまで、設計・施工・保守点検・配管・土木・塗装工事など、多岐にわたる現場対応を支援します。予算や目的に合わせた調査・提案・施工により、企業の設備環境と資産価値を守ります。",
  tabs: [
    {
      key: "construction",
      label: "建設事業",
      body: "オフィス、店舗、工場、商業施設まで、用途に応じた建設・設計を支援。調査から提案、施工、引き渡しまでを一貫して管理します。",
    },
    {
      key: "interior",
      label: "内装工事",
      body: "レイアウト変更、間仕切り、原状回復まで。働く環境とブランド体験を両立させる内装をかたちにします。",
    },
    {
      key: "exterior",
      label: "外装工事",
      body: "外壁・屋根・サイン工事など、建物の印象と耐久性を高める外装を施工。長期的な資産価値を見据えて提案します。",
    },
    {
      key: "renovation",
      label: "大規模修繕工事",
      body: "経年劣化の調査・診断から、計画的な修繕・改修まで対応。建物のライフサイクルコストを抑えます。",
    },
    {
      key: "vending",
      label: "自動販売機設置サポート",
      body: "設置場所の選定から運用、補充・メンテナンスまで。福利厚生と収益の両面から最適な設置を提案します。",
    },
  ] as FacilityTab[],
};

export type Strength = {
  label: string;
  title: string;
  body: string;
};

export const strengths: Strength[] = [
  {
    label: "One Stop",
    title: "ワンストップ対応",
    body: "IT、OA、通信、施工、設備、保守まで、複数領域を横断して相談できます。",
  },
  {
    label: "Field Fit",
    title: "現場に合わせた提案力",
    body: "企業規模、利用環境、予算、運用体制に合わせて、過不足のない最適解を設計します。",
  },
  {
    label: "After Support",
    title: "導入後まで伴走",
    body: "機器やシステムの導入だけでなく、運用・保守・トラブル対応まで支援します。",
  },
  {
    label: "Cost Optimize",
    title: "コスト最適化",
    body: "OA機器、原料、設備、運用コストなど、現状分析から無駄を洗い出し改善を提案します。",
  },
  {
    label: "Public Sector",
    title: "官公庁案件にも対応",
    body: "全省庁統一資格を取得し、各省庁および公的機関の入札案件に対応可能です。",
  },
];

export type Step = {
  no: string;
  title: string;
  body: string;
};

export const process: Step[] = [
  {
    no: "01",
    title: "ヒアリング",
    body: "課題、利用状況、予算、スケジュールを確認します。",
  },
  {
    no: "02",
    title: "現状分析・調査",
    body: "オフィス環境、通信環境、設備状況、導入条件を整理します。",
  },
  {
    no: "03",
    title: "提案・見積",
    body: "必要な機器、施工、システム、保守体制を含めた最適案を提示します。",
  },
  {
    no: "04",
    title: "導入・施工",
    body: "各種機器の導入、設置、初期設定、施工を実施します。",
  },
  {
    no: "05",
    title: "運用・保守",
    body: "導入後のトラブル対応、定期メンテナンス、改善提案まで支援します。",
  },
];

export type NewsItem = {
  date: string;
  title: string;
};

export const news: NewsItem[] = [
  { date: "2026.03.31", title: "ホームページをリニューアルいたしました。" },
];
