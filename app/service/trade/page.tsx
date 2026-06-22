import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";
import { serviceDetails } from "@/data/services";

const data = serviceDetails.trade;

export const metadata: Metadata = {
  alternates: { canonical: "/service/trade" },
  title: "流通・グローバルサポート",
  description:
    "食品配膳、化学製品、資源関連商材など幅広い分野の商品供給。国内外のネットワークを活かし、品質・コスト・納期のバランスを重視した流通体制を構築します。",
};

export default function TradePage() {
  return <ServiceDetail data={data} />;
}
