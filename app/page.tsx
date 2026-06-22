import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Problems from "@/components/Problems";
import ServiceShowcase from "@/components/ServiceShowcase";
import Strength from "@/components/Strength";
import Process from "@/components/Process";
import CompanyPreview from "@/components/CompanyPreview";
import News from "@/components/News";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Problems />
      <ServiceShowcase />
      <Strength />
      <Process />
      <CompanyPreview />
      <News />
      <FinalCTA />
    </>
  );
}
