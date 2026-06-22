import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";
import { serviceDetails } from "@/data/services";

const data = serviceDetails.construction;

export const metadata: Metadata = {
  title: "建設・インフラサポート",
  description:
    "建設事業・内装工事・外装工事・大規模修繕工事・自動販売機設置サポート。オフィスから工場、商業施設まで、現場第一の技術と提案力で事業基盤を支えます。",
};

export default function ConstructionPage() {
  return <ServiceDetail data={data} />;
}
