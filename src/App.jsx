import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ServiceTicker from "./components/ServiceTicker";
import StudioSection from "./components/StudioSection";
import ServiceMenuSection from "./components/ServiceMenuSection";
import NailServicesSection from "./components/NailServicesSection";
import TransformationsSection from "./components/TransformationsSection";

export default function App() {
  return (
    <div className="min-h-screen bg-[#1E1C19] text-white selection:bg-white selection:text-[#1E1C19]">
      <Header />
      <main>
        <HeroSection />
        <ServiceTicker />
        <StudioSection />
        <ServiceMenuSection />
        <NailServicesSection />
        <TransformationsSection />
        {/* Drop Section 7 here */}
      </main>
    </div>
  );
}