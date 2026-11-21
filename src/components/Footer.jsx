import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const exploreLinks = [
  { name: "Studio", href: "#studio" },
  { name: "Services", href: "#services" },
  { name: "Nails", href: "#nails" },
  { name: "Gallery", href: "#gallery" },
];

const framerEase = [0.22, 1, 0.36, 1];

export default function Footer() {
  return (
    <footer className="w-full bg-[#1E1C19] text-[#F6F5F1] border-t border-white/10">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top CTA Row: "Ready for your next look?" + "Book a chair ->" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: framerEase }}
          className="py-14 md:py-20 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-7"
        >
          <h2 className="text-3xl sm:text-4xl md:text-[48px] font-medium leading-[1.12] tracking-[-0.025em]">
            <span className="text-white">Ready for your </span>
            <span className="text-[#9E8870]">next look?</span>
          </h2>

          <div className="shrink-0">
            <motion.a
              href="#book"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease: framerEase }}
              className="group inline-flex items-center gap-2.5 bg-[#F6F5F1] hover:bg-white text-[#1E1C19] text-[14px] font-semibold px-6 py-3.5 rounded-[3px] transition-colors"
            >
              <span>Book a chair</span>
              <ArrowRight className="w-4 h-4 stroke-[2] transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </div>
        </motion.div>

        {/* Middle Columns: Brand (Left) + Compact 3-Column Links (Right) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.1, ease: framerEase }}
          className="py-12 md:py-16 grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10"
        >
          {/* Brand Column (Full width on mobile, 5 cols on desktop) */}
          <div className="col-span-2 lg:col-span-5 flex flex-col items-start">
            <a href="#" className="inline-flex mb-4" aria-label="Glam by Anmi home">
              <img
                src="/logo.png"
                alt="Glam by Anmi - Nail and Hair Studio"
                className="h-16 md:h-20 w-auto object-contain"
              />
            </a>

            <p className="text-[13.5px] md:text-[14px] text-[#9E988E] leading-[1.65] max-w-[270px]">
              A hair and nail studio in Mohali. Precision cuts, bespoke
              colour, and nail artistry tailored for you.
            </p>
          </div>

          {/* Explore Column (Compact 4-item list) */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-[12px] font-medium text-[#9E988E] tracking-wide mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[14px] text-[#F6F5F1] hover:text-[#DFD6C7] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Column */}
          <div className="col-span-1 lg:col-span-3">
            <h3 className="text-[12px] font-medium text-[#9E988E] tracking-wide mb-4">
              Visit
            </h3>
            <div className="space-y-2.5 text-[14px] text-[#F6F5F1] leading-relaxed">
              <p>Glam by Anmi, Mohali</p>
              <p className="text-[#C8C3BA]">Tue to Sun, 9 am to 8 pm</p>
            </div>
          </div>

          {/* Contact Column */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <h3 className="text-[12px] font-medium text-[#9E988E] tracking-wide mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <a
                  href="tel:+15195550147"
                  className="text-[#F6F5F1] hover:text-[#DFD6C7] transition-colors"
                >
                  (519) 555 0147
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@glambyluxmi.com"
                  className="text-[#F6F5F1] hover:text-[#DFD6C7] transition-colors break-all"
                >
                  hello@glambyluxmi.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/nails_hairs_by_anmi/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#F6F5F1] hover:text-[#DFD6C7] transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#9E988E]">
          <p>© 2026 Glam by Anmi. All rights reserved.</p>

          <div className="flex items-center gap-6 text-[#F6F5F1]/90">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>

          <p className="hidden md:block">
            Developed by  <a href="https://taranveer.in" target="_blank" rel="noreferrer" className="text-white hover:text-[#DFD6C7] transition-colors">
              Taranveer Singh
            </a> and <a href="https://sushantmonga.in" target="_blank" rel="noreferrer" className="text-white hover:text-[#DFD6C7] transition-colors">
              Sushant Monga
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
