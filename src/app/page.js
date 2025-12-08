import { Ban } from "lucide-react";
import Image from "next/image";
import HomeSection from "./components/PageComponent/HomeSection/HomeSection";
import Banner from "./components/PageComponent/HomeSection/Banner";
import TrustSection from "./components/PageComponent/HomeSection/TrustedBy";
import ServicesSection from "./components/PageComponent/HomeSection/ServiceSection";
import DestinationsSection from "./components/PageComponent/HomeSection/DestinationSections";
import WhyChooseUs from "./components/PageComponent/HomeSection/WhyChooseUs";
import Testimonials from "./components/PageComponent/HomeSection/Testimonial";
import ProcessSection from "./components/PageComponent/HomeSection/ProcessSection";
import { FiSquare } from "react-icons/fi";
import ContactCtaSection from "./components/PageComponent/HomeSection/Contact";

export default function Home() {
  return (
    <>
    
<Banner />
    <HomeSection />
    <ServicesSection />
    <TrustSection />
    <DestinationsSection />
    <ProcessSection />

    <WhyChooseUs />
    <Testimonials />
    <ContactCtaSection />
    </>
  );
}
