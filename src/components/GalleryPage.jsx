import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, X, Sparkles } from "lucide-react";

const nailsGallery = [
  {
    id: "N-01",
    title: "Pearl Chrome Almond Extensions",
    tag: "Gel Extensions",
    duration: "90 min",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "N-02",
    title: "Clean Russian Manicure & Nude Gloss",
    tag: "Russian Manicure",
    duration: "60 min",
    image:
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "N-03",
    title: "Bridal Crimson & Gold Foil Art",
    tag: "Bridal Nail Art",
    duration: "110 min",
    image:
      "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "N-04",
    title: "French Micro-Tip Soft Gel Overlay",
    tag: "Gel Overlay",
    duration: "75 min",
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "N-05",
    title: "Velvet Cat-Eye Sculpted Acrylics",
    tag: "Acrylic Extensions",
    duration: "105 min",
    image:
      "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "N-06",
    title: "Botanical Spa Pedicure & Gel Polish",
    tag: "Spa Pedicure",
    duration: "60 min",
    image:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=85",
  },
];

const hairGallery = [
  {
    id: "H-01",
    title: "Lived-In Caramel Balayage",
    tag: "Balayage & Gloss",
    duration: "150 min",
    image:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "H-02",
    title: "Keratin Silk & Mirror-Shine Finish",
    tag: "Keratin Therapy",
    duration: "120 min",
    image:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "H-03",
    title: "Feathered Butterfly Layers & Blowout",
    tag: "Signature Cut",
    duration: "60 min",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "H-04",
    title: "Espresso Global Tint & Bond Repair",
    tag: "Global Colour",
    duration: "90 min",
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "H-05",
    title: "Glass-Shine Precision Blunt Bob",
    tag: "Precision Cut",
    duration: "45 min",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "H-06",
    title: "Soft Editorial Waves & Bridal Styling",
    tag: "Bridal Hair",
    duration: "90 min",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
  },
];

const eyelashesGallery = [
  {
    id: "L-01",
    title: "Wispy Hybrid Lash Extensions",
    tag: "Hybrid Set",
    duration: "90 min",
    image:
      "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "L-02",
    title: "Natural Classic 1:1 Silk Lashes",
    tag: "Classic Extensions",
    duration: "75 min",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "L-03",
    title: "Fluffy Russian Volume Fan Set",
    tag: "Volume Lashes",
    duration: "120 min",
    image:
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "L-04",
    title: "Keratin Lash Lift & Deep Tint",
    tag: "Lash Lift & Tint",
    duration: "45 min",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=900&q=85",
  },
];

const framerEase = [0.22, 1, 0.36, 1];

const galleryHeroSlides = [
  "/Hero%20image%20Nail%20-Glam%20by%20ANMI.webp",
  "/hero%20image%20hair%20Glam%20By%20ANMI.webp",
];

function LookbookCard({ item, idx, cardBg = "bg-white", onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay: (idx % 3) * 0.08, ease: framerEase }}
      onClick={() => onSelect(item)}
      className={`group cursor-pointer rounded-[2px] overflow-hidden border border-[#2F2C29]/10 ${cardBg} flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_42px_-16px_rgba(47,44,41,0.16)]`}
    >
      {/* Portrait Image Frame */}
      <div className="relative w-full aspect-[4/4.6] overflow-hidden bg-[#2F2C29]">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle Top Tag & Expand Icon */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
          <span className="bg-[#1E1C19]/75 backdrop-blur-md text-[#F6F5F1] text-[10.5px] font-medium tracking-[0.12em] uppercase px-2.5 py-1 rounded-[2px] border border-white/15">
            {item.tag}
          </span>

          <span className="w-8 h-8 rounded-[2px] bg-[#F6F5F1]/90 text-[#2F2C29] flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 stroke-[1.85]" />
          </span>
        </div>
      </div>

      {/* Caption Footer */}
      <div className="p-5 flex items-center justify-between gap-4">
        <div>
          <span className="block text-[11px] font-medium text-[#8A755F] tracking-wider uppercase mb-1">
            {item.id} · {item.duration}
          </span>
          <h3 className="text-[17.5px] md:text-[18.5px] font-medium text-[#2F2C29] leading-snug group-hover:text-[#8A755F] transition-colors">
            {item.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function GalleryPage({ onBookNow }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % galleryHeroSlides.length);
    }, 10000);
    return () => window.clearTimeout(timer);
  }, [activeSlide]);

  const filterTabs = [
    { id: "all", label: "All Work", count: "16" },
    {
      id: "nails",
      label: "01 · Nails",
      count: String(nailsGallery.length).padStart(2, "0"),
    },
    {
      id: "hair",
      label: "02 · Hair",
      count: String(hairGallery.length).padStart(2, "0"),
    },
    {
      id: "eyelashes",
      label: "03 · Eyelashes",
      count: String(eyelashesGallery.length).padStart(2, "0"),
    },
  ];

  const showNails = selectedCategory === "all" || selectedCategory === "nails";
  const showHair = selectedCategory === "all" || selectedCategory === "hair";
  const showEyelashes =
    selectedCategory === "all" || selectedCategory === "eyelashes";

  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#2F2C29]">
      {/* =====================================================================
          SECTION 1: DARK EDITORIAL GALLERY HERO & CATEGORY FILTER BAR
      ===================================================================== */}
      <section className="relative w-full min-h-[520px] overflow-hidden bg-[#1E1C19] text-[#F6F5F1] pt-36 pb-16 md:pt-44 md:pb-20">
        <AnimatePresence>
          <motion.img
            key={galleryHeroSlides[activeSlide]}
            src={galleryHeroSlides[activeSlide]}
            alt="Glam by Anmi lookbook"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: framerEase }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1C19]/95 via-[#1E1C19]/78 to-[#1E1C19]/20" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/55 to-transparent" />
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

          {/* Interactive Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: framerEase }}
            className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              {filterTabs.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-[3px] text-[13.5px] font-medium transition-all duration-250 cursor-pointer ${
                      isActive
                        ? "bg-[#F6F5F1] text-[#1E1C19] font-semibold"
                        : "bg-white/8 text-white/85 hover:bg-white/15 hover:text-white border border-white/10"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-[2px] ${
                        isActive
                          ? "bg-[#1E1C19]/10 text-[#1E1C19]"
                          : "bg-white/10 text-white/75"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onBookNow}
              className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-[#DFD6C7] hover:text-white transition-colors cursor-pointer"
            >
              <span>Book your session</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: NAIL STUDIO GALLERY (#F6F5F1)
      ===================================================================== */}
      {showNails && (
        <section
          id="gallery-nails"
          className="w-full bg-[#F6F5F1] text-[#2F2C29] py-20 md:py-28 border-b border-[#2F2C29]/10"
        >
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
              <div>
                <div className="inline-flex items-center bg-[#E1D9CC] rounded-[3px] p-1 pr-4 mb-6">
                  <span className="bg-[#2F2C29] text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-[2px]">
                    01
                  </span>
                  <span className="text-[#2F2C29] text-[13px] font-medium tracking-wide ml-3">
                    Nail Studio
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-[46px] font-medium text-[#2F2C29] leading-[1.14] tracking-[-0.02em]">
                  Sculpted extensions &amp;{" "}
                  <span className="text-[#8A755F]">bespoke nail art.</span>
                </h2>
              </div>

              <p className="text-[15px] text-[#6E6961] leading-[1.65] max-w-[380px]">
                Russian cuticle care, lightweight soft-gel extensions, pearl
                chrome finishes, and hand-painted bridal sets.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
              {nailsGallery.map((item, idx) => (
                <LookbookCard
                  key={item.id}
                  item={item}
                  idx={idx}
                  cardBg="bg-white"
                  onSelect={setActiveLightboxItem}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 3: HAIR ARTISTRY GALLERY (#DFD6C7 Warm Oatmeal Band)
      ===================================================================== */}
      {showHair && (
        <section
          id="gallery-hair"
          className="w-full bg-[#DFD6C7] text-[#2F2C29] py-20 md:py-28 border-b border-[#2F2C29]/10"
        >
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
              <div>
                <div className="inline-flex items-center bg-[#F6F5F1] rounded-[3px] p-1 pr-4 mb-6">
                  <span className="bg-[#2F2C29] text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-[2px]">
                    02
                  </span>
                  <span className="text-[#2F2C29] text-[13px] font-medium tracking-wide ml-3">
                    Hair Artistry
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-[46px] font-medium text-[#2F2C29] leading-[1.14] tracking-[-0.02em]">
                  Dimensional colour &amp;{" "}
                  <span className="text-[#8A755F]">effortless movement.</span>
                </h2>
              </div>

              <p className="text-[15px] text-[#5C554C] leading-[1.65] max-w-[380px]">
                Hand-painted balayage, frizz-free keratin silk treatments, and
                precision layered cuts tailored to your hair texture.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
              {hairGallery.map((item, idx) => (
                <LookbookCard
                  key={item.id}
                  item={item}
                  idx={idx}
                  cardBg="bg-[#F6F5F1]"
                  onSelect={setActiveLightboxItem}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 4: EYELASH STUDIO GALLERY (#F6F5F1 Alabaster Band)
      ===================================================================== */}
      {showEyelashes && (
        <section
          id="gallery-eyelashes"
          className="w-full bg-[#F6F5F1] text-[#2F2C29] py-20 md:py-28"
        >
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
              <div>
                <div className="inline-flex items-center bg-[#E1D9CC] rounded-[3px] p-1 pr-4 mb-6">
                  <span className="bg-[#2F2C29] text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-[2px]">
                    03
                  </span>
                  <span className="text-[#2F2C29] text-[13px] font-medium tracking-wide ml-3">
                    Eyelash Studio
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-[46px] font-medium text-[#2F2C29] leading-[1.14] tracking-[-0.02em]">
                  Featherlight extensions &amp;{" "}
                  <span className="text-[#8A755F]">custom lash maps.</span>
                </h2>
              </div>

              <p className="text-[15px] text-[#6E6961] leading-[1.65] max-w-[380px]">
                From soft 1:1 classic silk lashes to wispy hybrid sets and
                keratin lash lifts designed to frame your eye shape naturally.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {eyelashesGallery.map((item, idx) => (
                <LookbookCard
                  key={item.id}
                  item={item}
                  idx={idx}
                  cardBg="bg-white"
                  onSelect={setActiveLightboxItem}
                />
              ))}
            </div>
          </div>
        </section>
      )}

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
            className="fixed inset-0 z-50 bg-[#1E1C19]/88 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.35, ease: framerEase }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[920px] bg-[#F6F5F1] text-[#2F2C29] rounded-[3px] overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl"
            >
              {/* Left Portrait */}
              <div className="md:col-span-7 bg-[#2F2C29] aspect-[4/4.3] md:aspect-auto max-h-[75vh]">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Right Details & Direct Booking CTA */}
              <div className="md:col-span-5 p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-[#8A755F]">
                      <Sparkles className="w-3.5 h-3.5" />
                      {activeLightboxItem.tag}
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveLightboxItem(null)}
                      aria-label="Close preview"
                      className="w-9 h-9 rounded-[3px] border border-[#2F2C29]/20 hover:bg-[#2F2C29] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-2xl sm:text-[28px] font-medium text-[#2F2C29] leading-tight mb-3">
                    {activeLightboxItem.title}
                  </h3>

                  <p className="text-[13px] font-medium text-[#7A7165] mb-6">
                    Look {activeLightboxItem.id} · Estimated session:{" "}
                    {activeLightboxItem.duration}
                  </p>

                  <p className="text-[14.5px] text-[#5C554C] leading-[1.7]">
                    Customized in-studio at Glam By Amni, Mohali. Every shade,
                    length, and curl is tailored during your one-on-one
                    consultation.
                  </p>
                </div>

                <div className="pt-8 mt-8 border-t border-[#2F2C29]/12">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveLightboxItem(null);
                      if (onBookNow) onBookNow();
                    }}
                    className="w-full group inline-flex items-center justify-center gap-2.5 bg-[#2F2C29] hover:bg-[#8A755F] text-[#F6F5F1] text-[14px] font-medium px-6 py-3.5 rounded-[3px] transition-colors cursor-pointer"
                  >
                    <span>Book this look</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
