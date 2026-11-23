import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { getVisibleAdminItems, useAdminState } from "../admin/galleryStorage";
import ImageWithFallback from "./ImageWithFallback";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Studio", href: "#studio" },
  { name: "Hair", href: "#services" },
  { name: "Nails", href: "#nails" },
  { name: "Stylist", href: "#stylists" },
  { name: "Gallery", page: "gallery" },
];

export default function Header({ onNavigate }) {
  useAdminState();
  const logoImage = getVisibleAdminItems("branding")[0]?.image || "/logo.png";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, href, page) => {
    setMobileOpen(false);
    if (page && onNavigate) {
      e.preventDefault();
      onNavigate(page);
      return;
    }
    if (onNavigate) {
      onNavigate("home");
      if (href && href !== "#") {
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 60);
      }
    }
  };

  const showSolidBg = isScrolled || mobileOpen;

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,box-shadow] duration-300 ${
        showSolidBg
          ? "bg-[#1E1C19] py-4 shadow-xl shadow-black/25"
          : "bg-transparent py-7"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex-1 flex items-center justify-start">
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, "#")}
            className="shrink-0"
            aria-label="Glam by Anmi home"
          >
            <ImageWithFallback
              src={logoImage}
              alt="Glam by Anmi - Nail and Hair Studio"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </a>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center gap-10">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href || "#gallery"}
              onClick={(e) => handleLinkClick(e, link.href, link.page)}
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
              onClick={(e) => handleLinkClick(e, "#book")}
              whileTap={{ scale: 0.98 }}
              className="cta-fill cta-fill--light group inline-flex items-center gap-2.5 bg-white text-[#1E1C19] text-[13.5px] font-semibold px-6 py-3.5 rounded-[3px]"
            >
              <span>Book an Appointment</span>
              <ArrowRight className="w-4 h-4 stroke-[2] transition-transform duration-300 group-hover:-rotate-45" />
            </motion.a>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
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
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-[#1E1C19] overflow-hidden"
          >
            <div className="px-6 pt-3 pb-6 flex flex-col gap-3 text-left border-t border-white/10 mt-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href || "#gallery"}
                  onClick={(e) => handleLinkClick(e, link.href, link.page)}
                  className="text-base font-medium text-white/95 hover:text-white py-2 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#book"
                onClick={(e) => handleLinkClick(e, "#book")}
                className="cta-fill cta-fill--light group mt-2 inline-flex items-center justify-center gap-2 bg-white text-[#1E1C19] text-sm font-semibold px-5 py-3 rounded-[3px]"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}