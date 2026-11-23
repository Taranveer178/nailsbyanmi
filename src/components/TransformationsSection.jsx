import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MoveHorizontal } from "lucide-react";
import { getAdminSectionItems, useAdminState } from "../admin/galleryStorage";
import ImageWithFallback from "./ImageWithFallback";

const defaultTransformations = [
  { id: "01", title: "Dimensional Balayage" },
  { id: "02", title: "Nail Extension" },
  {
    id: "03",
    title: "Balayage Gloss",
    beforeImage: "/before.webp",
    afterImage: "/after.webp",
  },
];

const framerEase = [0.22, 1, 0.36, 1];

function BeforeAfterCard({ item, index }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPos(percentage);
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: framerEase }}
      className="group bg-[#F6F5F1] border border-[#2F2C29]/12 rounded-[3px] p-4 sm:p-5 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(47,44,41,0.12)] hover:-translate-y-1"
    >
      <div>
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative w-full aspect-[4/4.6] overflow-hidden rounded-[2px] select-none touch-none cursor-ew-resize bg-[#2F2C29]"
        >
          {/* AFTER Image */}
          <ImageWithFallback
            src={item.afterImage}
            alt={`${item.title} - After`}
            draggable="false"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* BEFORE Image */}
          <div
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            className="absolute inset-0 w-full h-full"
          >
            <ImageWithFallback
              src={item.beforeImage}
              alt={`${item.title} - Before`}
              draggable="false"
              className="w-full h-full object-cover object-center filter saturate-[0.82] contrast-[0.95] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />

          <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
            <span className="bg-[#1E1C19]/75 backdrop-blur-md text-white/90 text-[10.5px] font-medium tracking-[0.14em] uppercase px-2.5 py-1 rounded-[2px] border border-white/15">
              Before
            </span>
          </div>

          <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
            <span className="bg-[#F6F5F1]/90 backdrop-blur-md text-[#2F2C29] text-[10.5px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-[2px]">
              After
            </span>
          </div>

          <div
            style={{ left: `${sliderPos}%` }}
            className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.45)] z-20 pointer-events-none -translate-x-1/2"
          >
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#2F2C29] text-[#F6F5F1] border-2 border-white flex items-center justify-center shadow-lg transition-transform duration-200 ${
                isDragging ? "scale-110 bg-[#8A755F]" : "group-hover:scale-105"
              }`}
            >
              <MoveHorizontal className="w-4 h-4 stroke-[2]" />
            </div>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity">
            <span className="text-[10.5px] text-white/90 bg-black/45 backdrop-blur-sm px-2.5 py-0.5 rounded-[2px] tracking-wide whitespace-nowrap">
              Drag slider to compare
            </span>
          </div>
        </div>

        {/* Quick-Snap Controls */}
        <div className="flex items-center justify-between pt-4 pb-3 border-b border-[#2F2C29]/10">
          <div className="flex items-center gap-2 text-[12px] font-medium text-[#8A755F]">
            <span>{item.id}</span>
            <span className="w-1 h-1 rounded-full bg-[#8A755F]/50" />
            <span>{item.duration}</span>
          </div>

          <div className="flex items-center gap-1 bg-[#E1D9CC]/70 p-0.5 rounded-[2px]">
            <button
              type="button"
              onClick={() => setSliderPos(92)}
              className={`text-[10.5px] font-medium px-2 py-0.5 rounded-[2px] transition-colors ${
                sliderPos > 75
                  ? "bg-[#2F2C29] text-white"
                  : "text-[#2F2C29]/75 hover:text-[#2F2C29]"
              }`}
            >
              Before
            </button>
            <button
              type="button"
              onClick={() => setSliderPos(50)}
              className={`text-[10.5px] font-medium px-2 py-0.5 rounded-[2px] transition-colors ${
                sliderPos >= 25 && sliderPos <= 75
                  ? "bg-[#2F2C29] text-white"
                  : "text-[#2F2C29]/75 hover:text-[#2F2C29]"
              }`}
            >
              Split
            </button>
            <button
              type="button"
              onClick={() => setSliderPos(8)}
              className={`text-[10.5px] font-medium px-2 py-0.5 rounded-[2px] transition-colors ${
                sliderPos < 25
                  ? "bg-[#2F2C29] text-white"
                  : "text-[#2F2C29]/75 hover:text-[#2F2C29]"
              }`}
            >
              After
            </button>
          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-[21px] md:text-[23px] font-medium text-[#2F2C29] tracking-[-0.015em] leading-snug group-hover:text-[#8A755F] transition-colors">
            {item.title}
          </h3>
        </div>
      </div>

      <div className="pt-5 mt-5 border-t border-[#2F2C29]/10 flex items-center justify-end">
        <a
          href="#book"
          className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2F2C29] hover:text-[#8A755F] transition-colors"
        >
          <span>Book this look</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-300 group-hover:-rotate-45" />
        </a>
      </div>
    </motion.div>
  );
}

export default function TransformationsSection() {
  useAdminState();
  const adminItems = getAdminSectionItems("transformations");
  const itemsById = new Map(adminItems.map((item) => [item.id, item]));

  const transformations = defaultTransformations.flatMap((item, index) => {
      const cardId = String(index + 1).padStart(2, "0");
      const before = itemsById.get(`tr-${cardId}-before`);
      const after = itemsById.get(`tr-${cardId}-after`);
      if (!before || !after || before.status === "hidden" || after.status === "hidden") {
        return [];
      }
      return [{
        ...item,
        title: before.title || item.title,
        duration: before.meta,
        beforeImage:
          item.id === "03" ? item.beforeImage : before.image,
        afterImage:
          item.id === "03" ? item.afterImage : after.image,
      }];
  });

  return (
    <section
      id="transformations"
      className="w-full bg-[#DFD6C7] text-[#2F2C29] py-20 md:py-28 border-t border-[#2F2C29]/10 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-14 md:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: framerEase }}
            className="max-w-[740px]"
          >
            <div className="inline-flex items-center bg-[#F6F5F1] rounded-[3px] p-1 pr-4 mb-7">
              <span className="bg-[#2F2C29] text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-[2px]">
                05
              </span>
              <span className="text-[#2F2C29] text-[13px] font-medium tracking-wide ml-3">
                Transformations
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[46px] lg:text-[50px] font-medium text-[#2F2C29] leading-[1.15] tracking-[-0.02em]">
              Real results,{" "}
              <span className="text-[#8A755F]">side by side.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.12, ease: framerEase }}
            className="w-full lg:max-w-[390px] flex flex-col items-start shrink-0"
          >
            <p className="text-[15.5px] md:text-[16.5px] text-[#5C554C] leading-[1.65] mb-6">
              Unfiltered chair-side transformations from our Sirsa studio.
              Slide across each client portrait to see the tone, texture, and
              nail finish before and after.
            </p>

            <motion.a
              href="#book"
              whileTap={{ scale: 0.98 }}
              className="cta-fill cta-fill--dark group inline-flex items-center gap-3 bg-[#2F2C29] text-[#F6F5F1] text-[14px] font-medium px-6 py-3.5 rounded-[3px]"
            >
              <span>Start your transformation</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75] transition-transform duration-300 group-hover:-rotate-45" />
            </motion.a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 md:gap-8">
          {transformations.map((item, index) => (
            <BeforeAfterCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
