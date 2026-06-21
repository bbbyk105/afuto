import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Problems from "@/components/Problems";
import ServiceShowcase from "@/components/ServiceShowcase";
import OfficeSolutions from "@/components/OfficeSolutions";
import FacilitySupport from "@/components/FacilitySupport";
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
      <OfficeSolutions />
      <FacilitySupport />
      <Strength />
      <Process />
      <CompanyPreview />
      <News />
      <FinalCTA />
    </>
  );
}
