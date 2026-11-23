import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  getGalleryCollections,
  getVisibleAdminItems,
  useAdminState,
} from "../admin/galleryStorage";
import ImageWithFallback from "./ImageWithFallback";

const framerEase = [0.22, 1, 0.36, 1];

const defaultGalleryHeroImages = [
  "/Hero%20image%20Nail%20-Glam%20by%20ANMI.webp",
  "/hero%20image%20hair%20Glam%20By%20ANMI.webp",
];

function LookbookCard({ item, idx, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay: (idx % 3) * 0.08, ease: framerEase }}
      onClick={() => onSelect(item)}
      className="group cursor-pointer rounded-[2px] overflow-hidden border border-[#2F2C29]/10 bg-[#E1D9CC] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_42px_-16px_rgba(47,44,41,0.16)]"
    >
      <div className="relative w-full aspect-[4/4.6] overflow-hidden bg-[#2F2C29]">
        <ImageWithFallback
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  useAdminState();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);
  const [activeHeroImage, setActiveHeroImage] = useState(0);
  const heroItems = getVisibleAdminItems("hero");
  const galleryHeroImages = heroItems.length
    ? heroItems.map((item) => item.image)
    : defaultGalleryHeroImages;
  const galleryCollections = getGalleryCollections();
  const { nails: nailsGallery, hair: hairGallery, eyelashes: eyelashesGallery } =
    galleryCollections;
  const allGalleryItems = useMemo(
    () => [...nailsGallery, ...hairGallery, ...eyelashesGallery],
    [nailsGallery, hairGallery, eyelashesGallery]
  );
  const visibleGalleryItems = useMemo(() => {
    if (selectedCategory === "nails") return nailsGallery;
    if (selectedCategory === "hair") return hairGallery;
    if (selectedCategory === "eyelashes") return eyelashesGallery;
    return allGalleryItems;
  }, [
    selectedCategory,
    nailsGallery,
    hairGallery,
    eyelashesGallery,
    allGalleryItems,
  ]);

  const filterTabs = [
    { id: "all", label: "All", count: allGalleryItems.length },
    { id: "nails", label: "Nails", count: nailsGallery.length },
    { id: "hair", label: "Hair", count: hairGallery.length },
    { id: "eyelashes", label: "Eyelashes", count: eyelashesGallery.length },
  ].filter((tab) => tab.id === "all" || tab.count > 0);

  const activeLightboxIndex = activeLightboxItem
    ? visibleGalleryItems.findIndex((item) => item.id === activeLightboxItem.id)
    : -1;

  const showPreviousImage = () => {
    if (!visibleGalleryItems.length) return;
    const nextIndex =
      (activeLightboxIndex - 1 + visibleGalleryItems.length) %
      visibleGalleryItems.length;
    setActiveLightboxItem(visibleGalleryItems[nextIndex]);
  };

  const showNextImage = () => {
    if (!visibleGalleryItems.length) return;
    const nextIndex =
      (activeLightboxIndex + 1) % visibleGalleryItems.length;
    setActiveLightboxItem(visibleGalleryItems[nextIndex]);
  };

  useEffect(() => {
    if (!activeLightboxItem) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveLightboxItem(null);
      if (event.key === "ArrowLeft") {
        const nextIndex =
          (activeLightboxIndex - 1 + visibleGalleryItems.length) %
          visibleGalleryItems.length;
        setActiveLightboxItem(visibleGalleryItems[nextIndex]);
      }
      if (event.key === "ArrowRight") {
        const nextIndex =
          (activeLightboxIndex + 1) % visibleGalleryItems.length;
        setActiveLightboxItem(visibleGalleryItems[nextIndex]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxItem, activeLightboxIndex, visibleGalleryItems]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveHeroImage((current) => (current + 1) % galleryHeroImages.length);
    }, 10000);
    return () => window.clearTimeout(timer);
  }, [activeHeroImage, galleryHeroImages.length]);

  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#2F2C29]">
      {/* =====================================================================
          SECTION 1: DARK EDITORIAL GALLERY HERO & CATEGORY FILTER BAR
      ===================================================================== */}
      <section className="relative isolate w-full overflow-hidden bg-[#1E1C19] text-[#F6F5F1] pt-36 pb-16 md:pt-44 md:pb-20">
        <AnimatePresence>
          <motion.div
            key={galleryHeroImages[activeHeroImage]}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: framerEase }}
            className="absolute inset-0 z-0"
          >
            <ImageWithFallback
              src={galleryHeroImages[activeHeroImage]}
              alt="Glam by Anmi hair and nail studio"
              className="h-full w-full object-cover object-right md:object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,22,20,0.95)_0%,rgba(24,22,20,0.78)_44%,rgba(24,22,20,0.12)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/55 to-transparent" />
          </motion.div>
        </AnimatePresence>
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: framerEase }}
            className="max-w-[760px]"
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center bg-white/10 rounded-[3px] p-1 pr-4 mb-6">
              <span className="bg-[#F6F5F1] text-[#1E1C19] text-[11.5px] font-bold px-2 py-0.5 rounded-[2px]">
                PORTFOLIO
              </span>
              <span className="text-white/90 text-[12.5px] font-medium tracking-wide ml-3">
                Glam By Amni · Mohali Lookbook
              </span>
            </div>

            {/* Two-Tone Display Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-[62px] font-medium leading-[1.08] tracking-[-0.025em] mb-5">
              <span className="text-white">Curated nails, hair </span>
              <span className="text-[#9E8870]">&amp; lash artistry.</span>
            </h1>

            <p className="text-[15.5px] md:text-[17px] text-[#C8C3BA] leading-[1.65] max-w-[580px] mb-10">
              Explore recent client transformations from our Mohali studio—each
              set, colour blend, and lash map custom-crafted by Amni.
            </p>
          </motion.div>

        </div>
      </section>

      {/* =====================================================================
          SECTION 2: UNIFIED GALLERY
      ===================================================================== */}
      <section
        id="gallery-images"
        className="w-full bg-[#F6F5F1] text-[#2F2C29] py-10 md:py-14"
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-[3px] text-[13.5px] font-medium transition-colors ${
                    isActive
                      ? "bg-[#2F2C29] text-white"
                      : "bg-[#E1D9CC] text-[#2F2C29] hover:bg-[#D3C7B5]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-[2px] ${
                      isActive ? "bg-white/15" : "bg-[#F6F5F1]/75"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
            {visibleGalleryItems.map((item, idx) => (
              <LookbookCard
                key={item.id}
                item={item}
                idx={idx}
                onSelect={setActiveLightboxItem}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: FULL-SCREEN LIGHTBOX PREVIEW MODAL
      ===================================================================== */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxItem(null)}
            className="fixed inset-0 z-50 bg-[#1E1C19]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.35, ease: framerEase }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[1100px] flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => setActiveLightboxItem(null)}
                aria-label="Close preview"
                className="fixed top-3 right-3 mb-0 sm:absolute sm:-right-12 sm:-top-12 z-20 w-10 h-10 rounded-full bg-[#F6F5F1] text-[#2F2C29] flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full max-h-[68vh] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLightboxItem.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: framerEase }}
                    className="w-full max-h-[68vh]"
                  >
                    <ImageWithFallback
                      src={activeLightboxItem.image}
                      alt={activeLightboxItem.title}
                      className="w-full max-h-[68vh] object-contain"
                    />
                  </motion.div>
                </AnimatePresence>

                {visibleGalleryItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPreviousImage}
                      aria-label="Previous image"
                      className="absolute left-2 sm:left-4 w-11 h-11 rounded-full bg-[#F6F5F1]/95 text-[#2F2C29] flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={showNextImage}
                      aria-label="Next image"
                      className="absolute right-2 sm:right-4 w-11 h-11 rounded-full bg-[#F6F5F1]/95 text-[#2F2C29] flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {visibleGalleryItems.length > 1 && (
                <div className="mt-4 max-w-full overflow-x-auto no-scrollbar">
                  <div className="flex items-center justify-center gap-2 px-2 pb-1">
                    {visibleGalleryItems.map((item) => {
                      const isActive = item.id === activeLightboxItem.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveLightboxItem(item)}
                          aria-label={`View ${item.title}`}
                          className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-[2px] overflow-hidden border-2 transition-all ${
                            isActive
                              ? "border-white opacity-100 scale-105"
                              : "border-white/20 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <ImageWithFallback
                            src={item.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}