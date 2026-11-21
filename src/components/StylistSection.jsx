import { motion } from "framer-motion";
import { ArrowRight, Award, Sparkles } from "lucide-react";

const framerEase = [0.22, 1, 0.36, 1];

export default function StylistSection() {
  return (
    <section
      id="stylists"
      className="w-full bg-[#F6F5F1] text-[#2F2C29] py-20 md:py-28 border-t border-[#2F2C29]/10 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: framerEase }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Eyebrow Badge: [06] Meet the stylist */}
            <div className="inline-flex items-center bg-[#E1D9CC] rounded-[3px] p-1 pr-4 mb-7">
              <span className="bg-[#2F2C29] text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-[2px]">
                06
              </span>
              <span className="text-[#2F2C29] text-[13px] font-medium tracking-wide ml-3">
                Meet the artist
              </span>
            </div>

            {/* Large Editorial Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-[54px] lg:text-[58px] font-medium text-[#2F2C29] leading-[1.1] tracking-[-0.025em] mb-7">
              One vision, one chair,{" "}
              <span className="text-[#8A755F]">personal</span> craft from start
              to finish.
            </h2>

            {/* Artist Name & Studio */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <h3 className="text-xl md:text-[24px] font-medium text-[#2F2C29]">
                Anmi
              </h3>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A755F]" />
              <span className="text-[13.5px] font-medium text-[#8A755F] uppercase tracking-wider">
                Founder &amp; Lead Artist · Glam By Anmi, Mohali
              </span>
            </div>

            {/* Personal Bio */}
            <p className="text-[15.5px] md:text-[17px] text-[#6E6961] leading-[1.75] max-w-[540px] mb-10">
              At Glam By Anmi in Mohali, every appointment is an unhurried,
              one-on-one experience. From dimensional hair colour and precision
              cuts to sculpted nail extensions and custom nail art, every detail
              is personally crafted for your style—never rushed or handed off.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.a
                href="#book"
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25, ease: framerEase }}
                className="cta-fill cta-fill--dark group inline-flex items-center gap-3 bg-[#2F2C29] text-[#F6F5F1] text-[14.5px] font-medium px-7 py-3.5 rounded-[3px]"
              >
                <span>Book with Anmi</span>
                <ArrowRight className="w-4 h-4 stroke-[1.75] transition-transform duration-300 group-hover:-rotate-45" />
              </motion.a>

              <motion.a
                href="https://www.instagram.com/nails_hairs_by_anmi/"
                target="_blank"
                rel="noreferrer"
                whileTap={{ scale: 0.98 }}
                className="cta-fill cta-fill--light inline-flex items-center gap-2.5 border border-[#2F2C29]/35 hover:border-[#8A755F] text-[#2F2C29] text-[14px] font-medium px-5 py-3.5 rounded-[3px] transition-colors"
              >
                <svg
                  className="w-4 h-4 stroke-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>@nails_hairs_by_anmi</span>
              </motion.a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Editorial Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 28 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.15, ease: framerEase }}
            className="lg:col-span-6 relative"
          >
            <div className="hidden sm:block absolute -top-4 -right-4 w-full h-full border border-[#8A755F]/35 rounded-[3px] pointer-events-none" />

            <div className="relative w-full aspect-[4/4.6] overflow-hidden rounded-[3px] bg-[#2F2C29] group shadow-[0_24px_48px_-16px_rgba(47,44,41,0.18)]">
              <motion.img
                src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1100&q=85"
                alt="Luxmi - Founder & Lead Artist at Glam By Anmi Mohali"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.85, ease: framerEase }}
                className="w-full h-full object-cover object-top"
              />

              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#1E1C19]/85 via-[#1E1C19]/30 to-transparent pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.35, ease: framerEase }}
                className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7 bg-[#1E1C19]/80 backdrop-blur-md border border-white/15 rounded-[3px] p-5 text-white"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 text-[#DFD6C7] text-[11.5px] font-medium tracking-wider uppercase">
                    <Award className="w-3.5 h-3.5 text-[#DFD6C7]" />
                    <span>Glam By Anmi · Nail &amp; Hair Studio, Mohali</span>
                  </div>
                  <Sparkles className="w-4 h-4 text-white/60 shrink-0" />
                </div>

                <p className="text-[13.5px] sm:text-[14.5px] text-white/90 font-light italic leading-relaxed">
                  “Great hair and nails shouldn’t only look effortless when you
                  leave the chair—they should feel effortless weeks later.”
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}