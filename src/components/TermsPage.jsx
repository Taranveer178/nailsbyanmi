import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const termsSections = [
  {
    number: "01",
    title: "Appointments & Consultations",
    content:
      "All hair and nail services at Glam By Anmi are provided by appointment to ensure dedicated, one-on-one attention. Every service begins with a brief consultation to confirm your desired look, estimated duration, and final pricing before we begin.",
  },
  {
    number: "02",
    title: "Cancellations & Rescheduling",
    content:
      "Because your chair time is reserved exclusively for you, we kindly ask for at least 12 hours' notice if you need to reschedule or cancel your appointment. Late arrivals of more than 15 minutes may require adjusting the service scope so subsequent clients are not delayed.",
  },
  {
    number: "03",
    title: "Service Pricing & Estimates",
    content:
      "Prices listed on our website are starting estimates (in INR ₹). Final pricing for hair colouring, balayage, keratin therapies, and nail extensions depends on hair length, hair density, nail length, and custom art complexity, which is confirmed prior to starting.",
  },
  {
    number: "04",
    title: "Allergies, Patch Tests & Aftercare",
    content:
      "Please inform Anmi prior to your appointment of any scalp sensitivities, product allergies, or previous chemical treatments. Following the recommended home aftercare routine helps maintain colour longevity and gel nail retention.",
  },
  {
    number: "05",
    title: "Studio Hygiene & Satisfaction",
    content:
      "We maintain strict hospital-grade sterilization for all nail tools and use salon-authentic hair care formulations. If you have any concern with your nail or hair service within 48 hours of your visit, please contact our Sirsa studio so we can make it right.",
  },
];

const framerEase = [0.22, 1, 0.36, 1];

export default function TermsPage({ onBack }) {
  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#2F2C29]">
      {/* Dark Editorial Hero Header (Clear of Fixed Header) */}
      <div className="w-full bg-[#1E1C19] text-[#F6F5F1] pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="w-full max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: framerEase }}
          >
            <div className="inline-flex items-center bg-white/10 rounded-[3px] p-1 pr-4 mb-6">
              <span className="bg-[#F6F5F1] text-[#1E1C19] text-[11.5px] font-bold px-2 py-0.5 rounded-[2px]">
                STUDIO POLICIES
              </span>
              <span className="text-white/90 text-[12.5px] font-medium tracking-wide ml-3">
                Effective: November 2026
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-[58px] font-medium leading-[1.08] tracking-[-0.025em] mb-5">
              <span className="text-white">Terms &amp; </span>
              <span className="text-[#9E8870]">Conditions.</span>
            </h1>

            <p className="text-[15.5px] md:text-[17px] text-[#C8C3BA] leading-[1.65] max-w-[600px]">
              Simple, transparent studio policies designed to keep every visit
              to Glam By Anmi in Sirsa calm, punctual, and seamless.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="w-full max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-24">
        <div className="border-t border-[#2F2C29]/15">
          {termsSections.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: idx * 0.06,
                ease: framerEase,
              }}
              className="py-8 md:py-10 border-b border-[#2F2C29]/15 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-start"
            >
              <div className="md:col-span-4 flex items-baseline gap-3.5">
                <span className="text-[12px] font-semibold text-[#8A755F]">
                  {item.number}
                </span>
                <h2 className="text-[20px] md:text-[22px] font-medium text-[#2F2C29] leading-snug">
                  {item.title}
                </h2>
              </div>

              <p className="md:col-span-8 text-[15px] md:text-[16px] text-[#5C554C] leading-[1.75]">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Studio Note & Return CTA */}
        <div className="mt-12 bg-[#E1D9CC]/65 rounded-[3px] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-3.5">
            <FileText className="w-5 h-5 text-[#8A755F] shrink-0 mt-0.5" />
            <p className="text-[14px] text-[#2F2C29] leading-relaxed">
              Questions before booking? Reach out to{" "}
              <strong>sehdevra30009@gmail.com</strong> or message{" "}
              <strong>@nails_hairs_by_anmi</strong> on Instagram.
            </p>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="shrink-0 bg-[#2F2C29] hover:bg-[#1E1C19] text-[#F6F5F1] text-[13.5px] font-medium px-6 py-3 rounded-[3px] transition-colors cursor-pointer"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}