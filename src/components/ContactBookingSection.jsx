import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

const serviceOptions = [
  "Signature Cut & Blow Dry",
  "Dimensional Balayage & Gloss",
  "Global Hair Colour",
  "Keratin / Botox Hair Therapy",
  "Luxury Hair Spa",
  "Gel / Acrylic Nail Extensions",
  "Classic / Russian Manicure",
  "Bespoke Nail Art",
  "Spa Pedicure",
];

const categoryOptions = [
  "Nail & Hair Combo",
  "Hair Studio",
  "Nail Studio",
];

const framerEase = [0.22, 1, 0.36, 1];

export default function ContactBookingSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    service: "",
    category: "Nail & Hair Combo",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.service.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitted(true);
  };

  return (
    <section
      id="book"
      className="w-full bg-[#DFD6C7] text-[#2F2C29] py-20 md:py-28 border-t border-[#2F2C29]/10 overflow-hidden"
    >
      <div
        id="contact"
        className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-stretch">
          {/* LEFT CARD: Dark Studio Booking Info (#1E1C19) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: framerEase }}
            className="lg:col-span-6 bg-[#1E1C19] text-[#F6F5F1] rounded-[3px] p-8 sm:p-11 md:p-14 flex flex-col justify-between shadow-[0_24px_50px_-18px_rgba(30,28,25,0.28)]"
          >
            <div>
              <div className="inline-flex items-center bg-white/10 rounded-[3px] p-1 pr-4 mb-9">
                <span className="bg-[#F6F5F1] text-[#1E1C19] text-[11.5px] font-bold px-2 py-0.5 rounded-[2px]">
                  09
                </span>
                <span className="text-[#F6F5F1]/90 text-[12.5px] font-medium tracking-wide ml-3">
                  Booking
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-[56px] font-medium leading-[1.08] tracking-[-0.025em] mb-6">
                <span className="text-white">Book your </span>
                <span className="text-[#9E8870]">chair.</span>
              </h2>

              <p className="text-[15.5px] md:text-[16.5px] text-[#C8C3BA] leading-[1.65] max-w-[430px] mb-12 md:mb-16">
                Send a request and Anmi will confirm your slot within the hour.
                Prefer to talk? Call our Mohali studio directly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 mb-12 md:mb-14">
                <div>
                  <span className="block text-[12px] text-[#9E988E] font-normal mb-1.5">
                    Visit us
                  </span>
                  <p className="text-[16px] md:text-[17px] font-medium text-white">
                    Glam By Anmi, Mohali, Punjab
                  </p>
                </div>

                <div>
                  <span className="block text-[12px] text-[#9E988E] font-normal mb-1.5">
                    Opening hours
                  </span>
                  <p className="text-[16px] md:text-[17px] font-medium text-white">
                    Tue to Sun, 10 am to 8 pm
                  </p>
                </div>

                <div>
                  <span className="block text-[12px] text-[#9E988E] font-normal mb-1.5">
                    Call
                  </span>
                  <a
                    href="tel:+919876543210"
                    className="text-[16px] md:text-[17px] font-medium text-white hover:text-[#DFD6C7] transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>

                <div>
                  <span className="block text-[12px] text-[#9E988E] font-normal mb-1.5">
                    Instagram &amp; Email
                  </span>
                  <a
                    href="mailto:hello@glambyanmi.in"
                    className="text-[16px] md:text-[17px] font-medium text-white hover:text-[#DFD6C7] transition-colors"
                  >
                    hello@glambyanmi.in
                  </a>
                </div>
              </div>
            </div>

            <div>
              <motion.a
                href="tel:+919876543210"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25, ease: framerEase }}
                className="group inline-flex items-center gap-3 bg-[#F6F5F1] hover:bg-white text-[#1E1C19] text-[14px] font-semibold px-7 py-4 rounded-[3px] transition-colors"
              >
                <span>Call the studio</span>
                <ArrowRight className="w-4 h-4 stroke-[2] transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </div>
          </motion.div>

          {/* RIGHT CARD: Light Appointment Request Form (#F6F5F1) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.12, ease: framerEase }}
            className="lg:col-span-6 bg-[#F6F5F1] text-[#2F2C29] rounded-[3px] p-8 sm:p-11 md:p-14 flex flex-col justify-between border border-[#2F2C29]/10 shadow-[0_24px_50px_-18px_rgba(47,44,41,0.12)]"
          >
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-8">
                <h3 className="text-2xl sm:text-[28px] font-medium text-[#2F2C29] tracking-[-0.02em] leading-tight">
                  Request an appointment
                </h3>
                <p className="text-[13px] text-[#7A7165] mt-1.5">
                  Fields marked with a star are required.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5 mb-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[12px] font-medium text-[#2F2C29] mb-2"
                  >
                    Name <span className="text-[#8A755F]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full bg-[#E6DDD0] text-[#2F2C29] placeholder-[#8C8275] text-[14px] px-4 py-3.5 rounded-[2px] border border-transparent focus:border-[#8A755F] focus:bg-[#ECE5DA] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[12px] font-medium text-[#2F2C29] mb-2"
                  >
                    Phone / WhatsApp <span className="text-[#8A755F]">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 00000"
                    className="w-full bg-[#E6DDD0] text-[#2F2C29] placeholder-[#8C8275] text-[14px] px-4 py-3.5 rounded-[2px] border border-transparent focus:border-[#8A755F] focus:bg-[#ECE5DA] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[12px] font-medium text-[#2F2C29] mb-2"
                  >
                    Email <span className="text-[#8A755F]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className="w-full bg-[#E6DDD0] text-[#2F2C29] placeholder-[#8C8275] text-[14px] px-4 py-3.5 rounded-[2px] border border-transparent focus:border-[#8A755F] focus:bg-[#ECE5DA] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block text-[12px] font-medium text-[#2F2C29] mb-2"
                  >
                    Preferred date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-[#E6DDD0] text-[#2F2C29] placeholder-[#8C8275] text-[14px] px-4 py-3.5 rounded-[2px] border border-transparent focus:border-[#8A755F] focus:bg-[#ECE5DA] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-[12px] font-medium text-[#2F2C29] mb-2"
                  >
                    Service <span className="text-[#8A755F]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full appearance-none bg-[#E6DDD0] text-[14px] px-4 py-3.5 pr-10 rounded-[2px] border border-transparent focus:border-[#8A755F] focus:bg-[#ECE5DA] focus:outline-none transition-colors ${
                        formData.service ? "text-[#2F2C29]" : "text-[#8C8275]"
                      }`}
                    >
                      <option value="" disabled>
                        Choose a service
                      </option>
                      {serviceOptions.map((srv) => (
                        <option
                          key={srv}
                          value={srv}
                          className="text-[#2F2C29] bg-[#F6F5F1]"
                        >
                          {srv}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#7A7165] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-[12px] font-medium text-[#2F2C29] mb-2"
                  >
                    Studio session
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full appearance-none bg-[#E6DDD0] text-[#2F2C29] text-[14px] px-4 py-3.5 pr-10 rounded-[2px] border border-transparent focus:border-[#8A755F] focus:bg-[#ECE5DA] focus:outline-none transition-colors"
                    >
                      {categoryOptions.map((cat) => (
                        <option
                          key={cat}
                          value={cat}
                          className="text-[#2F2C29] bg-[#F6F5F1]"
                        >
                          {cat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#7A7165] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="mb-7">
                <label
                  htmlFor="notes"
                  className="block text-[12px] font-medium text-[#2F2C29] mb-2"
                >
                  Anything we should know?
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Hair length, nail shape/art ideas, or bridal event dates"
                  className="w-full bg-[#E6DDD0] text-[#2F2C29] placeholder-[#8C8275] text-[14px] px-4 py-3.5 rounded-[2px] border border-transparent focus:border-[#8A755F] focus:bg-[#ECE5DA] focus:outline-none transition-colors resize-none"
                />
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full bg-[#2F2C29] text-[#F6F5F1] text-[14px] font-medium py-4 px-6 rounded-[3px] flex items-center justify-center gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#DFD6C7]" />
                  <span>
                    Request sent! Anmi will confirm your slot within the hour.
                  </span>
                </motion.div>
              ) : (
                <motion.button
                  type="submit"
                  disabled={!isFormValid}
                  whileHover={isFormValid ? { scale: 1.01 } : {}}
                  whileTap={isFormValid ? { scale: 0.99 } : {}}
                  className={`w-full text-[14px] font-medium py-4 px-6 rounded-[3px] transition-all duration-300 flex items-center justify-center gap-2.5 ${
                    isFormValid
                      ? "bg-[#2F2C29] hover:bg-[#1E1C19] text-[#F6F5F1] cursor-pointer shadow-sm"
                      : "bg-[#6A6055] text-[#F6F5F1]/90 cursor-not-allowed"
                  }`}
                >
                  <span>
                    {isFormValid
                      ? "Request appointment"
                      : "Please fill in the required fields"}
                  </span>
                  {isFormValid && <ArrowRight className="w-4 h-4 stroke-[1.75]" />}
                </motion.button>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}