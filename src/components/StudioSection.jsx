import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { getVisibleAdminItems, useAdminState } from "../admin/galleryStorage";
import ImageWithFallback from "./ImageWithFallback";

const framerEase = [0.22, 1, 0.36, 1];

export default function StudioSection() {
  useAdminState();
  const studioServices = getVisibleAdminItems("studio").map((item) => ({
      id: item.id,
      title: item.title,
      description: item.meta,
      image: item.image,
    }));
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="studio"
      className="w-full bg-[#F6F5F1] text-[#2F2C29] py-20 md:py-28"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 lg:gap-16 mb-16 md:mb-20">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: framerEase }}
            className="max-w-[780px]"
          >
            {/* Eyebrow Badge: [02] The studio */}
            <div className="inline-flex items-center bg-[#E1D9CC] rounded-[3px] p-1 pr-4 mb-8">
              <span className="bg-[#2F2C29] text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-[2px]">
                02
              </span>
              <span className="text-[#2F2C29] text-[13px] font-medium tracking-wide ml-3">
                The studio
              </span>
            </div>

            {/* Editorial Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-[46px] lg:text-[50px] font-medium text-[#2F2C29] leading-[1.16] tracking-[-0.02em]">
             Balayage and sculpted nails <span className="text-[#8A755F]">crafted</span> with care at Glam By Anmi.
            </h2>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.12, ease: framerEase }}
            className="w-full lg:max-w-[390px] lg:pt-2 flex flex-col items-start shrink-0"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex items-center gap-1 text-[#8A755F]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 stroke-[1.6] fill-transparent"
                  />
                ))}
              </div>
              <span className="text-[13px] font-medium text-[#5A554E]">
                4.9 client rating in Sirsa
              </span>
            </div>

            <p className="text-[15.5px] md:text-[16.5px] text-[#4F4A43] leading-[1.65] mb-8">
             Every visit starts with a personal consultation to create hair and nail looks that match your style.
            </p>

            <motion.a
              href="#book"
              whileTap={{ scale: 0.98 }}
              className="cta-fill cta-fill--light group inline-flex items-center gap-3 border border-[#2F2C29]/45 hover:border-[#8A755F] text-[#2F2C29] text-[14.5px] font-medium px-6 py-3.5 rounded-[3px] transition-colors duration-200"
            >
              <span>Book a consultation</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75] transition-transform duration-300 group-hover:-rotate-45" />
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Gallery Widget */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.15, ease: framerEase }}
        >
          {/* DESKTOP EXPANDING GALLERY */}
          <div className="hidden lg:flex w-full h-[520px] gap-3.5">
            {studioServices.map((service, index) => {
              const isExpanded = activeIndex === index;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    flex: isExpanded ? 3.2 : 1,
                    transition: "flex 550ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  className="relative h-full overflow-hidden rounded-[2px] cursor-pointer group bg-[#2F2C29]"
                >
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out ${
                      isExpanded ? "scale-100" : "scale-105"
                    }`}
                  />

                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: isExpanded
                        ? "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(18,16,14,0.88) 100%)"
                        : "linear-gradient(180deg, rgba(0,0,0,0.05) 35%, rgba(18,16,14,0.85) 100%)",
                    }}
                  />

                  {/* EXPANDED STATE */}
                  <div
                    className={`absolute bottom-7 left-7 right-7 transition-all duration-500 ${
                      isExpanded
                        ? "opacity-100 translate-y-0 delay-150"
                        : "opacity-0 translate-y-3 pointer-events-none"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-12 h-[2px] bg-white/85 relative overflow-hidden">
                        <span className="block w-5 h-full bg-white" />
                      </div>
                      <span className="text-[11px] font-medium text-white/90 tracking-wider">
                        {service.id}
                      </span>
                    </div>

                    <h3 className="text-[26px] font-medium text-white tracking-[-0.01em] leading-tight">
                      {service.title}
                    </h3>

                    <p className="text-[14px] text-white/85 font-normal mt-1.5 line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  {/* COLLAPSED STATE */}
                  <div
                    className={`absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-300 ${
                      isExpanded
                        ? "opacity-0 translate-y-2 pointer-events-none"
                        : "opacity-100 translate-y-0 delay-100"
                    }`}
                  >
                    <div className="relative flex items-end">
                      <span
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                        className="text-[21px] font-medium text-white tracking-wide whitespace-nowrap leading-none"
                      >
                        {service.title}
                      </span>

                      <div className="flex items-center gap-1 ml-1.5 mb-0.5">
                        <span className="w-1.5 h-1.5 bg-white/75 inline-block" />
                        <span className="text-[10.5px] font-medium text-white/85">
                          {service.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOBILE / TABLET VERTICAL CARD STACK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {studioServices.map((service) => (
              <div
                key={service.id}
                className="relative h-[320px] sm:h-[350px] overflow-hidden rounded-[3px] bg-[#2F2C29]"
              >
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.05) 35%, rgba(18,16,14,0.9) 100%)",
                  }}
                />

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-[2px] bg-white/85" />
                    <span className="text-[11px] font-medium text-white/90">
                      {service.id}
                    </span>
                  </div>
                  <h3 className="text-2xl font-medium text-white leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/85 mt-1">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}