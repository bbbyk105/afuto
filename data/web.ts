/* ────────────────────────────────────────────────────────────────────────
   Web制作・集客サービス
   出典: アフト_Web制作ご提案_お客様向け.pptx
   価格はすべて税込・参考価格
   ──────────────────────────────────────────────────────────────────────── */

export type WebReason = {
  no: string;
  title: string;
  body: string;
};

export const webReasons: WebReason[] = [
  {
    no: "01",
    title: "集客まで一気通貫",
    body: "制作だけでなく、SEO・MEO・運用まで対応。「公開後に問い合わせが来る」サイトを目指します。",
  },
  {
    no: "02",
    title: "SEO・スマホ標準対応",
    body: "検索対策とスマートフォン最適化は標準で対応。追加費用なしで土台を整えます。",
  },
  {
    no: "03",
    title: "全省庁統一資格を取得",
    body: "全省庁統一資格（全国）を取得。官公庁・公的機関の入札案件にも対応できます。",
  },
  {
    no: "04",
    title: "わかりやすい料金",
    body: "参考価格を明示。ご予算・目的に合わせて最適なプランをご提案します。",
  },
];

export type PriceRow = {
  name: string;
  detail: string;
  price: string;
};

export type PriceTable = {
  key: string;
  label: string;
  title: string;
  rows: PriceRow[];
  note?: string;
};

export const priceTables: PriceTable[] = [
  {
    key: "website",
    label: "Website",
    title: "ホームページ制作",
    rows: [
      {
        name: "ランディングページ制作",
        detail: "商品・サービス紹介、問い合わせフォーム設置",
        price: "176,000円〜",
      },
      {
        name: "ホームページ制作（5ページ）",
        detail: "トップ／会社概要／サービス／お知らせ／お問い合わせ",
        price: "440,000円〜",
      },
      {
        name: "コーポレートサイト制作（10ページ）",
        detail: "SEO対策・スマホ対応込みの本格サイト",
        price: "660,000円〜",
      },
      {
        name: "採用サイト制作",
        detail: "求人情報、エントリーフォーム設置",
        price: "440,000円〜",
      },
      {
        name: "予約サイト制作",
        detail: "予約システム導入、カレンダー連携",
        price: "440,000円〜",
      },
      {
        name: "ECサイト制作",
        detail: "Shopify構築、決済設定、商品登録対応",
        price: "880,000円〜",
      },
      {
        name: "ホームページリニューアル",
        detail: "デザイン・導線・構成の改善",
        price: "220,000円〜",
      },
    ],
    note: "SEO対策・スマートフォン対応は標準で対応しています。ページ数・機能・デザインによりお見積りいたします。",
  },
  {
    key: "marketing",
    label: "Marketing",
    title: "集客・運用サポート",
    rows: [
      {
        name: "SEO内部対策",
        detail: "タイトル・構造の最適化、検索対策",
        price: "66,000円〜",
      },
      {
        name: "Googleビジネスプロフィール設定",
        detail: "MEO対策・初期設定",
        price: "44,000円〜",
      },
      {
        name: "Google Analytics・Search Console設定",
        detail: "アクセス解析環境の構築",
        price: "44,000円〜",
      },
      {
        name: "MEO運用サポート",
        detail: "Googleマップからの集客支援",
        price: "月額 44,000円〜",
      },
      {
        name: "SEO運用サポート",
        detail: "改善提案・レポート作成",
        price: "月額 66,000円〜",
      },
    ],
    note: "「月額」は継続的な運用サポートの月額費用です。",
  },
  {
    key: "creative",
    label: "Creative",
    title: "クリエイティブ制作",
    rows: [
      { name: "写真撮影", detail: "店舗・商品・会社の撮影", price: "66,000円〜" },
      { name: "ロゴ制作", detail: "オリジナルロゴデザイン", price: "110,000円〜" },
      { name: "バナー制作", detail: "広告・SNS用画像の制作", price: "22,000円〜" },
      { name: "動画制作", detail: "企業紹介・SNS動画の制作", price: "110,000円〜" },
    ],
  },
];

export type MaintenancePlan = {
  name: string;
  price: string;
  featured?: boolean;
  features: string[];
};

export const maintenancePlans: MaintenancePlan[] = [
  {
    name: "ライト",
    price: "11,000",
    features: ["サーバー管理", "SSL管理", "月1回までの軽微な更新"],
  },
  {
    name: "スタンダード",
    price: "22,000",
    featured: true,
    features: [
      "サーバー管理",
      "SSL管理",
      "月3回まで更新対応",
      "バックアップ管理",
    ],
  },
  {
    name: "プレミアム",
    price: "44,000",
    features: [
      "サーバー管理",
      "SSL管理",
      "バックアップ管理",
      "更新回数無制限（軽微な修正）",
      "SEOレポート",
      "アクセス解析レポート",
      "優先サポート",
    ],
  },
];

export const maintenanceNote =
  "サーバー・ドメイン・SSL の管理から軽微な更新まで、公開後も安心してお任せいただけます。";

export type WebOption = {
  name: string;
  price: string;
};

export const webOptions: WebOption[] = [
  { name: "お問い合わせフォーム追加", price: "22,000円〜" },
  { name: "商品登録代行", price: "44,000円〜" },
  { name: "ブログ機能追加", price: "44,000円〜" },
  { name: "配送設定・送料設定", price: "44,000円〜" },
  { name: "多言語対応", price: "110,000円〜" },
  { name: "メルマガ設定", price: "66,000円〜" },
  { name: "LINE連携", price: "66,000円〜" },
  { name: "会員機能追加", price: "110,000円〜" },
  { name: "AIチャットボット導入", price: "110,000円〜" },
  { name: "予約システム追加", price: "110,000円〜" },
];

export type WebFlowStep = {
  no: string;
  title: string;
  body: string;
};

export const webFlow: WebFlowStep[] = [
  {
    no: "01",
    title: "お問い合わせ",
    body: "まずはお気軽にご相談ください。",
  },
  {
    no: "02",
    title: "ヒアリング・お見積り",
    body: "目的・ご予算を伺い、最適なプランをご提案。",
  },
  {
    no: "03",
    title: "制作・ご確認",
    body: "デザイン・実装。途中でご確認いただきます。",
  },
  {
    no: "04",
    title: "公開",
    body: "最終チェックの上、サイトを公開します。",
  },
  {
    no: "05",
    title: "運用・サポート",
    body: "公開後も更新・集客を継続サポート。",
  },
];
