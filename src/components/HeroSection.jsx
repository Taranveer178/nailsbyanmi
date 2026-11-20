import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const slides = [
  {
    id: 1,
    badgeNumber: "01",
    badgeText: "Hair studio in Waterloo",
    titleLine1: "Experience Luxury",
    titleLine2: "Hair Transformation",
    subtitle: "Precision. Elegance. Perfection – crafted just for you.",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 2,
    badgeNumber: "02",
    badgeText: "Bespoke Colour & Styling",
    titleLine1: "Tailored Radiance",
    titleLine2: "Effortless Volume",
    subtitle: "Master stylists dedicated to healthy, luminous hair.",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=2000&q=85",
  },
];

const framerEase = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: framerEase },
  },
};

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const current = slides[activeSlide];

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#1E1C19] text-left">
      {/* Background Image with Smooth Framer Scale Entrance */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: framerEase }}
          className="absolute inset-0 z-0"
        >
          <img
            src={current.image}
            alt="Virtuoso Hair Design Studio"
            className="w-full h-full object-cover object-right md:object-center"
          />
          {/* Left-to-Right Editorial Dark Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(24,22,20,0.95) 0%, rgba(24,22,20,0.78) 44%, rgba(24,22,20,0.12) 100%)",
            }}
          />
          {/* Top Header Contrast Fade */}
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/55 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Left-Aligned Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-14">
        <motion.div
          key={`content-${current.id}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl flex flex-col items-start text-left"
        >
          {/* Top Tag Pill: [01] Hair studio in Waterloo */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/15 rounded-[3px] p-1 pr-4 mb-7"
          >
            <span className="bg-white text-[#1E1C19] text-[11px] font-bold px-2 py-0.5 rounded-[2px]">
              {current.badgeNumber}
            </span>
            <span className="text-white/95 text-xs font-medium tracking-wide ml-2.5">
              {current.badgeText}
            </span>
          </motion.div>

          {/* Main Hero Headline (Increased Size & Weight) */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-[72px] font-medium text-white leading-[1.08] tracking-[-0.025em] mb-6"
          >
            {current.titleLine1} <br />
            {current.titleLine2}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-[#E2E0DA] text-base md:text-[18px] font-normal tracking-wide mb-9"
          >
            {current.subtitle}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <motion.a
              href="#book"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-white text-[#1E1C19] text-[14.5px] font-semibold px-7 py-3.5 rounded-[3px] hover:bg-[#F3F2EF] transition-colors"
            >
              <span>Book a Appointment</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </motion.a>

            <motion.a
              href="#services"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 text-white text-[14.5px] font-medium px-7 py-3.5 rounded-[3px] transition-colors"
            >
              <span>Explore services</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </motion.a>
          </motion.div>

          {/* Featured Service Glass Card (Bottom Left) */}
          <motion.a
            href="#kerastase"
            variants={itemVariants}
            whileHover={{ y: -4, backgroundColor: "rgba(42, 38, 34, 0.92)" }}
            transition={{ duration: 0.3 }}
            className="group flex items-center justify-between w-full max-w-[375px] bg-[#2A2622]/75 backdrop-blur-md border border-white/15 rounded-[4px] p-3.5"
          >
            <div className="flex items-center gap-4 text-left">
              <img
                src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=300&q=80"
                alt="Kérastase Treatment"
                className="w-[74px] h-[84px] object-cover rounded-[3px] shrink-0"
              />
              <div>
                <p className="text-[11px] text-[#D1CFC9] font-normal mb-1">
                  Most booked this week
                </p>
                <h3 className="text-[17.5px] font-semibold text-white leading-snug">
                  Kérastase <br />
                  Treatment
                </h3>
                <p className="text-[11.5px] text-white/75 font-medium mt-1.5">
                  45 min, from $85
                </p>
              </div>
            </div>

            <div className="self-center pr-2 text-white/80 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom Right Slide Square Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-7 right-7 sm:right-10 lg:right-16 z-20 flex items-center gap-2"
      >
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setActiveSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`w-2 h-2 rounded-[1px] transition-all duration-300 ${
              activeSlide === idx
                ? "bg-white scale-110"
                : "bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </motion.div>
    </section>
  );
}