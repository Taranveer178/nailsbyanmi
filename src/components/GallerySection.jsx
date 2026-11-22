import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowRight, ChevronUp, ChevronDown } from "lucide-react";
import { getHomeGalleryItems } from "../admin/galleryStorage";
import ImageWithFallback from "./ImageWithFallback";

const framerEase = [0.22, 1, 0.36, 1];

export default function GallerySection({ onSeeAll }) {
  const [galleryItems] = useState(getHomeGalleryItems);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const sectionTrackRef = useRef(null);
  const total = galleryItems.length;

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionTrackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const mappedIndex = Math.min(
      total - 1,
      Math.max(0, Math.floor(latest * total))
    );
    setActiveIndex(mappedIndex);
  });

  const scrollToCardIndex = (targetIdx) => {
    const clampedIdx = ((targetIdx % total) + total) % total;
    setActiveIndex(clampedIdx);

    if (!sectionTrackRef.current) return;
    const rect = sectionTrackRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollableDistance = rect.height - window.innerHeight;

    if (scrollableDistance > 0) {
      const targetProgress = (clampedIdx + 0.35) / total;
      const targetScrollY = sectionTop + targetProgress * scrollableDistance;
      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    }
  };

  const stepForward = () => scrollToCardIndex(activeIndex + 1);
  const stepBackward = () => scrollToCardIndex(activeIndex - 1);

  const visibleOffsets = isMobile ? [-1, 0, 1] : [-2, -1, 0, 1, 2];

  const getCardTransform = (offset) => {
    const abs = Math.abs(offset);

    if (isMobile) {
      return {
        x: offset * 128,
        y: abs === 0 ? 0 : 22,
        scale: abs === 0 ? 1 : 0.84,
        rotateZ: offset * 5.5,
        rotateY: offset * -14,
        opacity: abs === 0 ? 1 : 0.88,
        zIndex: 20 - abs,
      };
    }

    const xMap = { "-2": -470, "-1": -242, "0": 0, "1": 242, "2": 470 };
    const yMap = { "-2": 46, "-1": 14, "0": 0, "1": 14, "2": 46 };
    const scaleMap = { "-2": 0.82, "-1": 0.92, "0": 1.03, "1": 0.92, "2": 0.82 };
    const rotateZMap = { "-2": -6.5, "-1": -3, "0": 0, "1": 3, "2": 6.5 };
    const rotateYMap = { "-2": 18, "-1": 9, "0": 0, "1": -9, "2": -18 };

    return {
      x: xMap[offset],
      y: yMap[offset],
      scale: scaleMap[offset],
      rotateZ: rotateZMap[offset],
      rotateY: rotateYMap[offset],
      opacity: abs === 2 ? 0.88 : 1,
      zIndex: 30 - abs * 5,
    };
  };

  return (
    <section
      id="gallery"
      ref={sectionTrackRef}
      className="relative w-full h-[260vh] bg-[#F6F5F1] text-[#2F2C29] border-t border-[#2F2C29]/10"
    >
      <div className="sticky top-0 w-full min-h-screen flex flex-col justify-center py-16 md:py-20 overflow-hidden">
        {/* Top Header Row */}
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-8 md:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, ease: framerEase }}
              className="max-w-[700px]"
            >
              <div className="inline-flex items-center bg-[#E1D9CC] rounded-[3px] p-1 pr-4 mb-5">
                <span className="bg-[#2F2C29] text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-[2px]">
                  08
                </span>
                <span className="text-[#2F2C29] text-[13px] font-medium tracking-wide ml-3">
                  Studio gallery
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-medium text-[#2F2C29] leading-[1.15] tracking-[-0.02em]">
                Hair &amp; nail artistry,{" "}
                <span className="text-[#8A755F]">captured</span> in natural
                light.
              </h2>
            </motion.div>

            <div className="flex items-center justify-between lg:justify-end gap-4">
              <span className="text-[12.5px] font-medium text-[#7A7165] tracking-wide">
                Scroll page to explore ({String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")})
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={stepBackward}
                  aria-label="Previous look"
                  className="w-10 h-10 rounded-[3px] border border-[#2F2C29]/25 hover:border-[#2F2C29] hover:bg-[#2F2C29] hover:text-[#F6F5F1] text-[#2F2C29] flex items-center justify-center transition-colors"
                >
                  <ChevronUp className="w-4 h-4 stroke-[1.75]" />
                </button>
                <button
                  type="button"
                  onClick={stepForward}
                  aria-label="Next look"
                  className="w-10 h-10 rounded-[3px] border border-[#2F2C29]/25 hover:border-[#2F2C29] hover:bg-[#2F2C29] hover:text-[#F6F5F1] text-[#2F2C29] flex items-center justify-center transition-colors"
                >
                  <ChevronDown className="w-4 h-4 stroke-[1.75]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Curved Arc Carousel Stage */}
        <div
          style={{ perspective: "1200px" }}
          className="relative w-full h-[320px] sm:h-[390px] md:h-[430px] flex items-center justify-center select-none"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {visibleOffsets.map((offset) => {
              const itemIndex = (activeIndex + offset + total) % total;
              const item = galleryItems[itemIndex];
              const transform = getCardTransform(offset);
              const isCenter = offset === 0;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => {
                    if (offset !== 0) scrollToCardIndex(activeIndex + offset);
                  }}
                  initial={false}
                  animate={{
                    x: transform.x,
                    y: transform.y,
                    scale: transform.scale,
                    rotateZ: transform.rotateZ,
                    rotateY: transform.rotateY,
                    opacity: transform.opacity,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: framerEase,
                  }}
                  style={{
                    zIndex: transform.zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  className={`absolute w-[180px] sm:w-[220px] md:w-[245px] aspect-[3/4] rounded-[2px] overflow-hidden bg-[#E1D9CC] shadow-[0_22px_45px_-15px_rgba(47,44,41,0.22)] transition-shadow ${
                    isCenter
                      ? "ring-1 ring-[#2F2C29]/15 cursor-default"
                      : "cursor-pointer hover:brightness-105"
                  }`}
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    draggable="false"
                    className="w-full h-full object-cover object-center"
                  />

                  <div
                    className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#1E1C19]/85 via-[#1E1C19]/35 to-transparent transition-opacity duration-300 ${
                      isCenter ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-[#DFD6C7]">
                      {item.category}
                    </span>
                    <h3 className="text-[15px] sm:text-[16px] font-medium text-white leading-snug mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Progress Dots + "See all" Button */}
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mt-6 md:mt-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-6">
            {galleryItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToCardIndex(idx)}
                aria-label={`View ${item.title}`}
                className={`h-1.5 rounded-[1px] transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-7 bg-[#2F2C29]"
                    : "w-2 bg-[#2F2C29]/25 hover:bg-[#2F2C29]/50"
                }`}
              />
            ))}
          </div>

          <motion.button
            type="button"
            onClick={onSeeAll}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: framerEase }}
            className="cta-fill cta-fill--dark group inline-flex items-center gap-3 bg-[#2F2C29] text-[#F6F5F1] text-[14px] font-medium px-7 py-3.5 rounded-[3px]"
          >
            <span>See all looks</span>
            <ArrowRight className="w-4 h-4 stroke-[1.75] transition-transform duration-300 group-hover:-rotate-45" />
          </motion.button>
        </div>
      </div>

    </section>
  );
}
