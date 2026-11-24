import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  MapPin,
  Sparkles,
  Star,
} from "lucide-react";

const highlights = [
  {
    number: "01",
    title: "Unhurried 1-on-1 Consultations",
    description:
      "Unlike crowded commercial parlours in Sirsa that rush clients through assembly-line chairs, every session starts with a dedicated consultation tailored to your hair texture, skin undertone, and lifestyle.",
  },
  {
    number: "02",
    title: "Bespoke Hair Colour & Keratin Care",
    description:
      "From lived-in caramel balayage and ammonia-free global colour to frizz-taming keratin and bond-repair hair spas, every formula is customized for luminous, healthy shine.",
  },
  {
    number: "03",
    title: "Sculpted Gel Nails & Russian Manicures",
    description:
      "Precision cuticle care, lightweight soft-gel and acrylic extensions, pearl chrome glazes, and bridal nail art crafted with zero lifting and mirror-gloss retention.",
  },
  {
    number: "04",
    title: "Hospital-Grade Hygiene & Authentic Products",
    description:
      "Every manicure tool undergoes strict multi-stage sterilization, and all hair treatments use salon-authentic, dermatologically tested formulations.",
  },
];

const popularServicesSirsa = [
  {
    category: "Hair Artistry",
    service: "Signature Cut, Wash & Round-Brush Blowout",
    duration: "45 min",
    price: "from ₹900",
  },
  {
    category: "Hair Colour",
    service: "Dimensional Balayage & Shine-Sealing Gloss",
    duration: "150 min",
    price: "from ₹4,500",
  },
  {
    category: "Hair Therapy",
    service: "Keratin & Botox Frizz-Control Treatment",
    duration: "120 min",
    price: "from ₹3,800",
  },
  {
    category: "Nail Studio",
    service: "Classic & Russian Cuticle Manicure",
    duration: "60 min",
    price: "from ₹700",
  },
  {
    category: "Nail Extensions",
    service: "Soft-Gel / Acrylic Extensions with Gel Polish",
    duration: "90 min",
    price: "from ₹1,500",
  },
  {
    category: "Bridal & Occasion",
    service: "Custom Bridal Nail Art & Pre-Bridal Hair Spa",
    duration: "120 min",
    price: "from ₹2,500",
  },
];

const sirsaFaqs = [
  {
    question: "Which is the best salon in Sirsa for both hair and nail services?",
    answer:
      "Glam By Amni stands out as a premier boutique hair and nail studio for clients in Sirsa seeking personalized, one-on-one care. Instead of rushed walk-in queues, every appointment combines precision hair styling, dimensional colour, and sculpted gel nail artistry under one roof.",
  },
  {
    question: "How long do gel nail extensions and Russian manicures last?",
    answer:
      "With proper cuticle preparation and salon-grade LED-cured builder gels, our gel nail extensions and overlays last 3 to 4 weeks with mirror-like shine and zero chipping or lifting.",
  },
  {
    question: "Do you offer bridal nail art and pre-bridal hair packages in Sirsa?",
    answer:
      "Yes. We curate bespoke pre-bridal hair spa, keratin smoothing, balayage, and custom bridal nail extension packages tailored to your wedding outfits and event timeline.",
  },
  {
    question: "How can I book an appointment at Glam By Amni?",
    answer:
      "You can book directly through our online appointment form, call our studio desk, or message us on WhatsApp to reserve a dedicated, unhurried slot with Amni.",
  },
  {
    question: "Where can I find eyelash services in Sirsa?",
    answer:
      "Glam By Amni offers eyelash services alongside hair and nail appointments. Contact the studio to confirm current lash options and discuss the look you want before booking.",
  },
];

const framerEase = [0.22, 1, 0.36, 1];

export default function BestSalonSirsaPage({ onBookNow }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Inject structured article and FAQ data when the page mounts.
  useEffect(() => {
    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.id = "sirsa-salon-seo-schema";
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline:
            "Best Salon in Sirsa: Complete Guide to Luxury Hair & Nail Artistry",
          mainEntityOfPage: "https://glambyanmi.in/best-salon-in-sirsa",
          description:
            "Explore Glam By Amni for personalized hair care, nail artistry, glam nail extensions, and eyelash services in Sirsa.",
          keywords:
            "best salon in Sirsa, best hair salon in Sirsa, best nail salon in Sirsa, glam nail art, best eyelashes in Sirsa",
          author: {
            "@type": "Person",
            name: "Amni",
          },
          publisher: {
            "@type": "BeautySalon",
            name: "Glam By Amni",
          },
          datePublished: "2026-11-24",
        },
        {
          "@type": "FAQPage",
          mainEntity: sirsaFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        },
      ],
    });
    document.head.appendChild(schemaScript);

    return () => {
      const existingSchema = document.getElementById("sirsa-salon-seo-schema");
      if (existingSchema) existingSchema.remove();
    };
  }, []);

  return (
    <article className="min-h-screen bg-[#F6F5F1] text-[#2F2C29]">
      {/* =====================================================================
          SECTION 1: EDITORIAL SEO ARTICLE HERO (#1E1C19)
      ===================================================================== */}
      <header className="w-full bg-[#1E1C19] text-[#F6F5F1] pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: framerEase }}
            className="max-w-[820px]"
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center bg-white/10 rounded-[3px] p-1 pr-4 mb-6">
              <span className="bg-[#F6F5F1] text-[#1E1C19] text-[11.5px] font-bold px-2.5 py-0.5 rounded-[2px]">
                SIRSA BEAUTY GUIDE
              </span>
              <span className="text-white/90 text-[12.5px] font-medium tracking-wide ml-3">
                Hair &amp; Nail Studio Editorial
              </span>
            </div>

            {/* Primary SEO H1 */}
            <h1 className="text-4xl sm:text-5xl md:text-[60px] font-medium leading-[1.08] tracking-[-0.025em] mb-6">
              <span className="text-white">Best Salon in Sirsa for </span>
              <span className="text-[#9E8870]">
                Luxury Hair &amp; Nail Artistry.
              </span>
            </h1>

            <p className="text-[16px] md:text-[18px] text-[#C8C3BA] leading-[1.7] max-w-[660px] mb-9">
              Whether you are searching for dimensional balayage, frizz-free
              keratin care, or sculpted gel nail extensions, discover what
              sets a true boutique salon experience in Sirsa apart from ordinary
              parlours.
            </p>

            {/* Article Meta Strip */}
            <div className="pt-6 border-t border-white/12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] text-[#C8C3BA]">
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9E8870]" />
                <span>Sirsa, Haryana</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#9E8870]" />
                <span>4 min read · Updated Nov 2026</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-white font-medium">
                <Star className="w-4 h-4 text-[#9E8870] fill-[#9E8870]" />
                <span>4.9 Rated Studio Care</span>
              </span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* =====================================================================
          SECTION 2: EDITORIAL INTRO & FEATURE IMAGE (#F6F5F1)
      ===================================================================== */}
      <section className="w-full py-16 md:py-24 border-b border-[#2F2C29]/10">
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Editorial Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: framerEase }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8A755F]">
                Why Boutique Care Matters
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-medium text-[#2F2C29] leading-[1.15] tracking-[-0.02em]">
                Elevating hair &amp; nail standards in{" "}
                <span className="text-[#8A755F]">Sirsa.</span>
              </h2>

              <p className="text-[15.5px] md:text-[16.5px] text-[#5C554C] leading-[1.75]">
                Finding the <strong>best salon in Sirsa</strong> often comes
                down to one thing: personalized attention. Too often, busy
                commercial salons rush through haircuts, apply one-size-fits-all
                colour formulas, or skip essential cuticle prep during nail
                extensions.
              </p>

              <p className="text-[15.5px] md:text-[16.5px] text-[#5C554C] leading-[1.75]">
                At <strong>Glam By Amni</strong>, every visit is designed as a
                calm, one-on-one session. From analyzing your hair porosity
                before a balayage or keratin ritual to sculpting lightweight,
                chip-resistant almond extensions, every detail is crafted so
                your look stays effortless weeks after you leave the chair.
              </p>

              <p className="text-[15.5px] md:text-[16.5px] text-[#5C554C] leading-[1.75]">
                If you are comparing the <strong>best hair salon in Sirsa</strong>,
                looking for a <strong>best nail salon</strong> for polished
                extensions and glam nail art, or exploring eyelash services,
                Glam By Amni brings personalized beauty appointments together
                in one studio.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onBookNow}
                  className="group inline-flex items-center gap-3 bg-[#2F2C29] hover:bg-[#8A755F] text-[#F6F5F1] text-[14px] font-medium px-6 py-3.5 rounded-[3px] transition-colors cursor-pointer"
                >
                  <span>Book your appointment</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <a
                  href="#sirsa-services"
                  className="inline-flex items-center gap-2 border border-[#2F2C29]/30 hover:border-[#2F2C29] text-[#2F2C29] text-[14px] font-medium px-5 py-3.5 rounded-[3px] transition-colors"
                >
                  <span>View Sirsa Menu</span>
                </a>
              </div>
            </motion.div>

            {/* Right Editorial Studio Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: framerEase }}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[4/4.6] rounded-[3px] overflow-hidden bg-[#2F2C29] shadow-[0_22px_45px_-16px_rgba(47,44,41,0.18)]">
                <img
                  src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=85"
                  alt="Best Hair and Nail Salon in Sirsa - Glam By Amni"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#1E1C19]/85 via-[#1E1C19]/35 to-transparent text-white">
                  <span className="block text-[11px] uppercase tracking-[0.14em] text-[#DFD6C7]">
                    Signature Craft
                  </span>
                  <p className="text-[15px] font-medium mt-0.5">
                    Lived-In Balayage &amp; Sculpted Gel Nail Extensions
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: 4 PILLARS OF THE BEST SALON IN SIRSA (#DFD6C7)
      ===================================================================== */}
      <section className="w-full bg-[#DFD6C7] text-[#2F2C29] py-20 md:py-28 border-b border-[#2F2C29]/10">
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-[700px] mb-14">
            <div className="inline-flex items-center bg-[#F6F5F1] rounded-[3px] p-1 pr-4 mb-6">
              <span className="bg-[#2F2C29] text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-[2px]">
                01
              </span>
              <span className="text-[#2F2C29] text-[13px] font-medium tracking-wide ml-3">
                What to look for
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[46px] font-medium text-[#2F2C29] leading-[1.14] tracking-[-0.02em]">
              Four reasons clients choose us as the{" "}
              <span className="text-[#8A755F]">best salon in Sirsa.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {highlights.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.08,
                  ease: framerEase,
                }}
                className="bg-[#F6F5F1] border border-[#2F2C29]/10 rounded-[3px] p-7 sm:p-9"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[12px] font-bold tracking-wider text-[#8A755F]">
                    {item.number}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#8A755F]" />
                </div>

                <h3 className="text-[21px] md:text-[23px] font-medium text-[#2F2C29] mb-3">
                  {item.title}
                </h3>

                <p className="text-[14.5px] md:text-[15.5px] text-[#5C554C] leading-[1.7]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: SIGNATURE HAIR & NAIL MENU FOR SIRSA CLIENTS (#F6F5F1)
      ===================================================================== */}
      <section
        id="sirsa-services"
        className="w-full bg-[#F6F5F1] text-[#2F2C29] py-20 md:py-28 border-b border-[#2F2C29]/10"
      >
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center bg-[#E1D9CC] rounded-[3px] p-1 pr-4 mb-6">
                <span className="bg-[#2F2C29] text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-[2px]">
                  02
                </span>
                <span className="text-[#2F2C29] text-[13px] font-medium tracking-wide ml-3">
                  Services &amp; Estimates
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-[44px] font-medium text-[#2F2C29] leading-[1.15] tracking-[-0.02em]">
                Most requested hair &amp; nail{" "}
                <span className="text-[#8A755F]">treatments.</span>
              </h2>
            </div>

            <p className="text-[14.5px] text-[#6E6961] max-w-[360px] leading-[1.6]">
              Transparent starting prices confirmed during your personal
              consultation prior to starting any service.
            </p>
          </div>

          <div className="border-t border-[#2F2C29]/15">
            {popularServicesSirsa.map((row) => (
              <div
                key={row.service}
                className="py-5 sm:py-6 border-b border-[#2F2C29]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#8A755F] mb-1">
                    {row.category}
                  </span>
                  <h3 className="text-[18px] sm:text-[20px] font-medium text-[#2F2C29]">
                    {row.service}
                  </h3>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0">
                  <span className="text-[17px] sm:text-[18.5px] font-semibold text-[#2F2C29]">
                    {row.price}
                  </span>
                  <span className="text-[12.5px] text-[#7A7165]">
                    {row.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: SIRSA SALON FAQ ACCORDION (SEO RICH SNIPPETS)
      ===================================================================== */}
      <section className="w-full bg-[#DFD6C7]/55 text-[#2F2C29] py-20 md:py-28">
        <div className="w-full max-w-[960px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-12">
            <div className="inline-flex items-center bg-[#F6F5F1] rounded-[3px] p-1 pr-4 mb-6">
              <span className="bg-[#2F2C29] text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-[2px]">
                03
              </span>
              <span className="text-[#2F2C29] text-[13px] font-medium tracking-wide ml-3">
                Frequently Asked Questions
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-medium text-[#2F2C29] leading-[1.15] tracking-[-0.02em]">
              Common questions about{" "}
              <span className="text-[#8A755F]">booking in Sirsa.</span>
            </h2>
          </div>

          <div className="space-y-3.5">
            {sirsaFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-[#F6F5F1] border border-[#2F2C29]/12 rounded-[3px] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <h3 className="text-[16.5px] sm:text-[18px] font-medium text-[#2F2C29] leading-snug">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-[#8A755F] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: framerEase }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-[14.5px] sm:text-[15.5px] text-[#5C554C] leading-[1.7] border-t border-[#2F2C29]/8 pt-4">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Bottom Conversion Banner */}
          <div className="mt-14 bg-[#1E1C19] text-[#F6F5F1] rounded-[3px] p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[#DFD6C7] text-[12px] uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Reserve Your Chair</span>
              </div>
              <h3 className="text-2xl sm:text-[28px] font-medium text-white leading-tight">
                Ready to experience the best salon in Sirsa?
              </h3>
            </div>

            <button
              type="button"
              onClick={onBookNow}
              className="shrink-0 group inline-flex items-center justify-center gap-2.5 bg-[#F6F5F1] hover:bg-white text-[#1E1C19] text-[14px] font-semibold px-6 py-3.5 rounded-[3px] transition-colors cursor-pointer"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>
    </article>
  );
}