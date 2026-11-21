import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const serviceTags = [
  "Haircuts",
  "Balayage & Colour",
  "Keratin & Smoothening",
  "Hair Spa",
  "Bridal Styling",
];

const menuServices = [
  {
    name: "Signature Cut & Blow Dry",
    description: "Consultation, relaxing wash, precision haircut, and round-brush finish.",
    price: "from ₹900",
    duration: "45 min",
  },
  {
    name: "Dimensional Balayage & Gloss",
    description: "Hand-painted highlights, custom root blend, and shine-sealing toner.",
    price: "from ₹4,500",
    duration: "150 min",
  },
  {
    name: "Global Hair Colour & Root Touch-Up",
    description: "Ammonia-free rich coverage tailored to your skin undertone.",
    price: "from ₹2,200",
    duration: "90 min",
  },
  {
    name: "Keratin & Botox Hair Therapy",
    description: "Deep frizz-control and protein restoration for silky, manageable hair.",
    price: "from ₹3,800",
    duration: "120 min",
  },
  {
    name: "Luxury Scalp & Bond Repair Spa",
    description: "Restorative mask, steam therapy, and therapeutic head massage.",
    price: "from ₹1,500",
    duration: "60 min",
  },
];

const framerEase = [0.22, 1, 0.36, 1];

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const rowItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: framerEase },
  },
};

export default function ServiceMenuSection() {
  return (
    <section
      id="services"
      className="w-full bg-[#DFD6C7] text-[#2F2C29] py-20 md:py-28 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 md:pb-16 border-b border-[#2F2C29]/15">
          {/* Left: Eyebrow + Two-Tone Display Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: framerEase }}
            className="max-w-[650px]"
          >
            {/* Eyebrow Badge: [03] Hair menu */}
            <div className="inline-flex items-center bg-[#F6F5F1] rounded-[3px] p-1 pr-4 mb-7">
              <span className="bg-[#2F2C29] text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-[2px]">
                03
              </span>
              <span className="text-[#2F2C29] text-[13px] font-medium tracking-wide ml-3">
                Hair menu
              </span>
            </div>

            {/* Two-Tone Editorial Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-[54px] font-medium leading-[1.1] tracking-[-0.025em]">
              <span className="block text-[#2F2C29]">Bespoke hair care</span>
              <span className="block text-[#8A755F]">tailored to you.</span>
            </h2>
          </motion.div>

          {/* Right: Pricing Note */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.12, ease: framerEase }}
            className="text-[14.5px] md:text-[15.5px] text-[#5C554C] leading-[1.6] max-w-[360px]"
          >
            Prices vary by hair length and density. Amni confirms your exact
            quote during consultation before we begin.
          </motion.p>
        </div>

        {/* Always-Open Service Showcase Layout */}
        <div className="pt-12 md:pt-16">
          {/* Sub-header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: framerEase }}
            className="flex items-start gap-6 sm:gap-12 mb-10 md:mb-12"
          >
            <span className="text-[12px] font-medium text-[#7A7165] pt-2.5 shrink-0">
              01
            </span>

            <div>
              <h3 className="text-3xl sm:text-4xl md:text-[42px] font-medium text-[#2F2C29] tracking-[-0.02em] leading-none mb-4">
                Signature Hair Services
              </h3>

              <div className="flex flex-wrap items-center gap-2">
                {serviceTags.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.08 * idx,
                      ease: framerEase,
                    }}
                    whileHover={{ y: -2, backgroundColor: "#FFFFFF" }}
                    className="bg-[#F6F5F1] text-[#2F2C29] text-[12px] font-medium px-3 py-1 rounded-[2px] transition-colors cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 2-Column Content Grid */}
          <div className="pl-0 sm:pl-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 lg:items-stretch">
            {/* Left Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: framerEase }}
              className="lg:col-span-5 flex"
            >
              <div className="relative w-full h-[380px] sm:h-[460px] lg:h-full overflow-hidden rounded-[2px] bg-[#2F2C29] group">
                <motion.img
                  src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=85"
                  alt="Signature Hair Services at Glam By Amni Mohali"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.8, ease: framerEase }}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>

            {/* Right Service List & Booking Button */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <motion.div
                variants={listContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="border-t border-[#2F2C29]/15"
              >
                {menuServices.map((item) => (
                  <motion.a
                    key={item.name}
                    href="#book"
                    variants={rowItemVariants}
                    className="py-5 md:py-6 border-b border-[#2F2C29]/15 flex items-start justify-between gap-6 group relative transition-colors hover:bg-[#2F2C29]/[0.03] px-2 -mx-2 rounded-[2px]"
                  >
                    <div className="transition-transform duration-300 ease-out group-hover:translate-x-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-[19px] md:text-[21px] font-medium text-[#2F2C29] group-hover:text-[#8A755F] transition-colors">
                          {item.name}
                        </h4>
                        <ArrowUpRight className="w-4 h-4 text-[#8A755F] opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                      </div>
                      <p className="text-[13.5px] md:text-[14px] text-[#6E675E] mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="text-right shrink-0 transition-transform duration-300 ease-out group-hover:-translate-x-1">
                      <span className="block text-[17px] md:text-[18.5px] font-medium text-[#2F2C29]">
                        {item.price}
                      </span>
                      <span className="block text-[12px] text-[#7A7165] mt-0.5">
                        {item.duration}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35, ease: framerEase }}
                className="mt-8 pt-2"
              >
                <motion.a
                  href="#book"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25, ease: framerEase }}
                  className="group inline-flex items-center gap-3 bg-[#2F2C29] hover:bg-[#1E1C19] text-[#F6F5F1] text-[14px] font-medium px-6 py-3.5 rounded-[3px] transition-colors shadow-sm"
                >
                  <span>Book hair service</span>
                  <ArrowRight className="w-4 h-4 stroke-[1.75] transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}