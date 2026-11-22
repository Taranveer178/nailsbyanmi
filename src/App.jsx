import { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ServiceTicker from "./components/ServiceTicker";
import StudioSection from "./components/StudioSection";
import ServiceMenuSection from "./components/ServiceMenuSection";
import NailServicesSection from "./components/NailServicesSection";
import TransformationsSection from "./components/TransformationsSection";
import StylistSection from "./components/StylistSection";
import TestimonialsSection from "./components/TestimonialsSection";
import GallerySection from "./components/GallerySection";
import ContactBookingSection from "./components/ContactBookingSection";
import Footer from "./components/Footer";
import PrivacyPage from "./components/PrivacyPage";
import TermsPage from "./components/TermsPage";
import GalleryPage from "./components/GalleryPage";

export default function App() {
  const [activePage, setActivePage] = useState("home");

  const navigateTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookFromSubpage = () => {
    setActivePage("home");
    setTimeout(() => {
      const el = document.querySelector("#book");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  return (
    <div className="min-h-screen bg-[#1E1C19] text-white selection:bg-white selection:text-[#1E1C19]">
      <Header onNavigate={navigateTo} />
      <main>
        {activePage === "gallery" ? (
          <GalleryPage onBookNow={handleBookFromSubpage} />
        ) : activePage === "privacy" ? (
          <PrivacyPage onBack={() => navigateTo("home")} />
        ) : activePage === "terms" ? (
          <TermsPage onBack={() => navigateTo("home")} />
        ) : (
          <>
            <HeroSection />
            <ServiceTicker />
            <StudioSection />
            <ServiceMenuSection />
            <NailServicesSection />
            <TransformationsSection />
            <StylistSection />
            <TestimonialsSection />
            <GallerySection onSeeAll={() => navigateTo("gallery")} />
            <ContactBookingSection />
          </>
        )}
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
  );
}