import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const nailServices = [
  {
    id: "01",
    title: "Manicure",
    description:
      "Cuticle care, precision shaping, hydrating hand massage, and high-shine finish.",
    price: "from ₹2000",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "02",
    title: "Nail Polish",
    description:
      "Long-wear lacquer application in classic neutrals, deep reds, or seasonal tones.",
    price: "from ₹1500",
    image:
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "03",
    title: "Pedicure",
    description:
      "Soothing mineral soak, exfoliation, heel smoothing, and flawless polish.",
    price: "from ₹4000",
    image:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "04",
    title: "Nail Trim",
    description:
      "Clean length reduction, edge refinement, and natural nail buffing.",
    price: "from ₹8000",
    image:
      "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "05",
    title: "Gel Coloring",
    description:
      "Chip-resistant LED-cured gel color with mirror gloss that lasts up to three weeks.",
    price: "from ₹4500",
    image:
      "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "06",
    title: "Nail Art",
    description:
      "Bespoke minimalist line work, French micro-tips, chrome, and custom accents.",
    price: "from ₹5000",
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=85",
  },
];

const framerEase = [0.22, 1, 0.36, 1];

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: framerEase },
  },
};

export default function NailServicesSection() {
  return (
    <section
      id="nails"
      className="w-full bg-[#F6F5F1] text-[#2F2C29] py-20 md:py-28 border-t border-[#2F2C29]/10"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Section Header Matching Your Virtuoso Design System */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 md:mb-20">
          {/* Left: Eyebrow Badge + Editorial Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: framerEase }}
            className="max-w-[740px]"
          >
            {/* Eyebrow Badge: [04] Nail studio */}
            <div className="inline-flex items-center bg-[#E1D9CC] rounded-[3px] p-1 pr-4 mb-7">
              <span className="bg-[#2F2C29] text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-[2px]">
                04
              </span>
              <span className="text-[#2F2C29] text-[13px] font-medium tracking-wide ml-3">
                Nail studio
              </span>
            </div>

            {/* Editorial Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-[46px] lg:text-[50px] font-medium text-[#2F2C29] leading-[1.15] tracking-[-0.02em]">
              Refined nail care,{" "}
              <span className="text-[#8A755F]">crafted</span> down to the
              finest detail.
            </h2>
          </motion.div>

          {/* Right: Supporting Copy & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.12, ease: framerEase }}
            className="w-full lg:max-w-[380px] flex flex-col items-start shrink-0"
          >
            <p className="text-[15.5px] md:text-[16.5px] text-[#6E6961] leading-[1.65] mb-6">
              From clean architectural manicures to custom gel artistry, every
              treatment uses non-toxic, salon-grade formulas in a calm space.
            </p>

            <motion.a
              href="#book"
              whileTap={{ scale: 0.98 }}
              className="cta-fill cta-fill--light group inline-flex items-center gap-3 border border-[#2F2C29]/45 hover:border-[#8A755F] text-[#2F2C29] text-[14px] font-medium px-6 py-3 rounded-[3px] transition-colors duration-200"
            >
              <span>View nail menu</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75] transition-transform duration-300 group-hover:-rotate-45" />
            </motion.a>
          </motion.div>
        </div>

        {/* 3-Column Overlapping Nail Service Cards Grid */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {nailServices.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group flex flex-col"
            >
              {/* Top Square Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[2px] bg-[#2F2C29]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle Dark Gradient at Bottom for Smooth Overlap Transition */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
              </div>

              {/* Overlapping White Content Card (Matching Reference Structure & Your Theme) */}
              <div className="relative z-10 mx-4 sm:mx-6 -mt-16 bg-white border border-[#2F2C29]/10 rounded-[2px] px-6 py-7 text-center shadow-[0_12px_32px_-12px_rgba(47,44,41,0.08)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Subtle Index + Price Tag */}
                  <div className="flex items-center justify-center gap-2 text-[11.5px] font-medium text-[#8A755F] tracking-wider uppercase mb-2">
                    <span>{service.id}</span>
                    <span className="w-1 h-1 rounded-full bg-[#8A755F]/50" />
                    <span>{service.price}</span>
                  </div>

                  {/* Service Heading */}
                  <h3 className="text-[22px] md:text-[24px] font-medium text-[#2F2C29] tracking-[-0.015em] mb-2.5 group-hover:text-[#8A755F] transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13.5px] md:text-[14px] text-[#6E6961] leading-[1.6] max-w-[270px] mx-auto mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Virtuoso Style Button */}
                <div className="pt-1">
                  <motion.a
                    href="#book"
                    whileTap={{ scale: 0.98 }}
                    className="cta-fill cta-fill--dark group inline-flex items-center justify-center gap-2.5 bg-[#2F2C29] text-[#F6F5F1] text-[13.5px] font-medium px-6 py-2.5 rounded-[3px]"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[1.75] transition-transform duration-300 group-hover:-rotate-45" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}