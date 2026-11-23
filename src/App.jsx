import { lazy, Suspense, useEffect, useState } from "react";
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
import { startAdminStateSync } from "./admin/galleryStorage";

const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));

const pagePaths = {
  home: "/",
  gallery: "/gallery",
  admin: "/admin",
  privacy: "/privacy",
  terms: "/terms",
};

const getPageFromLocation = () => {
  if (window.location.pathname === "/" &&
      new URLSearchParams(window.location.search).get("admin") === "true") {
    return "admin";
  }
  return (
    Object.entries(pagePaths).find(([, path]) => path === window.location.pathname)?.[0] ??
    "home"
  );
};

export default function App() {
  const [activePage, setActivePage] = useState(getPageFromLocation);

  useEffect(() => {
    const handlePopState = () => setActivePage(getPageFromLocation());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    let stopSync = () => {};
    const startSync = () => {
      stopSync = startAdminStateSync();
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(startSync, { timeout: 2500 });
      return () => {
        window.cancelIdleCallback(idleId);
        stopSync();
      };
    }

    const timeoutId = window.setTimeout(startSync, 1500);
    return () => {
      window.clearTimeout(timeoutId);
      stopSync();
    };
  }, []);

  useEffect(() => {
    const seoByPage = {
      home: {
        title: "Glam By Anmi | Best Salon in Sirsa for Hair, Nails & Eyelashes",
        description:
          "Glam By Anmi in Sirsa offers expert hair services, nail services, eyelash services, precision haircuts, hair colour, nail extensions and nail art.",
        path: "/",
      },
      gallery: {
        title: "Hair, Nail & Eyelash Gallery | Glam By Anmi Sirsa",
        description:
          "Explore hair transformations, nail extensions, nail art and eyelash looks from Glam By Anmi, the best salon in Sirsa.",
        path: "/gallery",
      },
      privacy: {
        title: "Privacy Policy | Glam By Anmi",
        description:
          "Read the privacy policy for Glam By Anmi, a hair, nail and eyelash salon in Sirsa.",
        path: "/privacy",
      },
      terms: {
        title: "Terms & Conditions | Glam By Anmi",
        description:
          "Review booking, cancellation and salon terms for Glam By Anmi in Sirsa.",
        path: "/terms",
      },
    };
    const seo = seoByPage[activePage];
    if (!seo) return;

    const canonicalUrl = `https://glambyanmi.in${seo.path}`;
    document.title = seo.title;

    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", seo.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", seo.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", seo.description);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", canonicalUrl);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", seo.title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", seo.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, [activePage]);

  const navigateTo = (page) => {
    const path = pagePaths[page] || pagePaths.home;
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookFromSubpage = () => {
    navigateTo("home");
    setTimeout(() => {
      const el = document.querySelector("#book");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  if (activePage === "admin") {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#F6F5F1] p-8 text-[#2F2C29]">
            Loading admin…
          </div>
        }
      >
        <AdminDashboard onBackToSite={() => navigateTo("home")} />
      </Suspense>
    );
  }

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
      <a
        href="https://wa.me/918571952209?text=Hi%20Glam%20by%20Anmi%2C%20I%20would%20like%20to%20book%20an%20appointment."
        target="_blank"
        rel="noreferrer"
        aria-label="Book an appointment on WhatsApp"
        className="fixed z-50 bottom-5 right-5 sm:bottom-7 sm:right-7 flex items-center gap-2 rounded-full bg-[#075E54] text-white pl-2 pr-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.24)] transition-transform duration-200 hover:-translate-y-1"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 40 40"
          className="h-7 w-7 shrink-0"
        >
          <path
            fill="#fff"
            d="M20 2.5C10.34 2.5 2.5 10.34 2.5 20c0 3.09.88 6.13 2.55 8.75L2.9 35.9l7.35-1.93A17.43 17.43 0 0 0 20 37.5c9.66 0 17.5-7.84 17.5-17.5S29.66 2.5 20 2.5Zm0 31.78c-2.84 0-5.62-.75-8.05-2.16l-.58-.33-4.36 1.14 1.16-4.25-.38-.61A14.1 14.1 0 0 1 5.72 20c0-7.87 6.41-14.28 14.28-14.28S34.28 12.13 34.28 20 27.87 34.28 20 34.28Z"
          />
          <path
            fill="#fff"
            d="M28.38 24.7c-.42.94-2.08 1.82-2.89 1.94-.74.11-1.68.17-2.71-.16-.63-.2-1.43-.46-2.46-.9-4.32-1.86-7.14-6.22-7.36-6.51-.21-.29-1.75-2.34-1.75-4.47 0-2.12 1.11-3.16 1.5-3.59.39-.43.86-.54 1.15-.54h.83c.27 0 .62-.1.97.74.35.86 1.22 2.99 1.32 3.21.11.21.18.47.04.75-.14.29-.21.47-.43.72-.21.25-.46.56-.65.75-.21.21-.44.44-.19.87.25.43 1.13 1.87 2.43 3.03 1.67 1.49 3.08 1.95 3.51 2.17.43.21.69.18.94-.11.25-.28 1.08-1.27 1.37-1.71.28-.43.57-.36.97-.21.39.14 2.52 1.18 2.95 1.4.43.21.72.32.83.5.11.18.11 1.04-.24 2.12Z"
          />
        </svg>
        <span className="text-[13px] font-semibold">Book Now</span>
      </a>
    </div>
  );
}