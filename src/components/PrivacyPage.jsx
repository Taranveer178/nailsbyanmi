import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const privacySections = [
	{
		number: "01",
		title: "Information We Collect",
		content:
			"When you request an appointment, call our Sirsa studio, or reach out via Instagram or WhatsApp, we collect basic contact details including your name, email address, preferred appointment date, and any hair or nail preferences you share with us.",
	},
	{
		number: "02",
		title: "How We Use Your Information",
		content:
			"Your details are used strictly to confirm and manage your salon appointments, tailor hair colour formulas or nail care treatments to your preferences, and send timely booking reminders. We never sell, rent, or trade your personal information to third-party marketers.",
	},
	{
		number: "03",
		title: "Client Consultation & Photo Consent",
		content:
			"Before photographing any hair transformation or nail artistry for our studio portfolio or Instagram (@nails_hairs_by_anmi), Anmi will always ask for your explicit verbal or written permission. You may decline or request removal at any time.",
	},
	{
		number: "04",
		title: "Data Storage & Security",
		content:
			"Appointment records and consultation notes are stored securely and accessed solely by Glam By Anmi for service continuity. You may request a copy of your records or ask for your contact information to be deleted by contacting us directly.",
	},
	{
		number: "05",
		title: "Contact Us Regarding Privacy",
		content:
			"For any questions regarding this Privacy Policy or your personal data, please email sehdevra30009@gmail.com.",
	},
];

const framerEase = [0.22, 1, 0.36, 1];

export default function PrivacyPage({ onBack }) {
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
								LEGAL
							</span>
							<span className="text-white/90 text-[12.5px] font-medium tracking-wide ml-3">
								Last updated: November 2026
							</span>
						</div>

						<h1 className="text-4xl sm:text-5xl md:text-[58px] font-medium leading-[1.08] tracking-[-0.025em] mb-5">
							<span className="text-white">Privacy </span>
							<span className="text-[#9E8870]">Policy.</span>
						</h1>

						<p className="text-[15.5px] md:text-[17px] text-[#C8C3BA] leading-[1.65] max-w-[600px]">
							How Glam By Anmi collects, protects, and respects your personal
							information when you visit our Sirsa studio or book online.
						</p>
					</motion.div>
				</div>
			</div>

			{/* Main Content Body */}
			<div className="w-full max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-24">
				<div className="border-t border-[#2F2C29]/15">
					{privacySections.map((item, idx) => (
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
						<ShieldCheck className="w-5 h-5 text-[#8A755F] shrink-0 mt-0.5" />
						<p className="text-[14px] text-[#2F2C29] leading-relaxed">
							Your trust matters to us. Every consultation and booking at{" "}
							<strong>Glam By Anmi, Sirsa</strong> is handled with complete
							discretion.
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