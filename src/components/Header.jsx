import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Studio", href: "#studio" },
  { name: "Services", href: "#services" },
  { name: "Stylists", href: "#stylists" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1E1C19] py-4 shadow-xl shadow-black/25 border-b border-white/10"
          : "bg-transparent py-7"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex-1 flex items-center justify-start">
          <a href="#" className="flex flex-col items-center shrink-0">
            <span className="font-logo text-xl md:text-[23px] tracking-[0.3em] text-white font-normal leading-none">
              NAILS BY ANMI
            </span>
            <span className="text-[7px] md:text-[7.5px] tracking-[0.38em] text-white/75 uppercase mt-1.5">
              HAIR DESIGN STUDIO LTD
            </span>
          </a>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center gap-10">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.15 + idx * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[14.5px] font-medium tracking-wide text-white/95 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        {/* Right: Desktop CTA Button & Mobile Toggle */}
        <div className="flex-1 flex items-center justify-end">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <motion.a
              href="#book"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 bg-white text-[#1E1C19] text-[13.5px] font-semibold px-6 py-3.5 rounded-[3px] hover:bg-[#F3F2EF] transition-colors"
            >
              <span>Book a Appointment</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </motion.a>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#1E1C19] border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4 text-left">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-white/95 hover:text-white py-1.5 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#book"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-white text-[#1E1C19] text-sm font-semibold px-5 py-3 rounded-[3px]"
              >
                <span>Book a Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}