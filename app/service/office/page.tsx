import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";
import { serviceDetails } from "@/data/services";

const data = serviceDetails.office;

export const metadata: Metadata = {
  title: "オフィスソリューション",
  description:
    "複合機・プリンター、ビジネスフォン、ネットワーク・LAN構築、PC・周辺機器、セキュリティ、保守まで。オフィス環境最適化コンサルティングも含め、ワンストップで支援します。",
};

export default function OfficePage() {
  return <ServiceDetail data={data} />;
}
