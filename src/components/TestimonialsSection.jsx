import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { getVisibleAdminItems, useAdminState } from "../admin/galleryStorage";
import ImageWithFallback from "./ImageWithFallback";

const defaultTestimonials = [
	{
		id: 1,
		quote:
			"Anmi understood exactly what I wanted for my balayage and extensions. The colour looks natural, the extensions feel comfortable, and every detail was finished carefully. I felt listened to throughout my appointment.",
		name: "Komal Singla",
		service: "Balayage & Gel Extensions",
		image: "/client%201.webp",
	},
	{
		id: 2,
		quote:
			"My Russian manicure and nail art were shaped so neatly, and the finish was exactly what I had in mind. The service felt calm and unhurried, and Anmi explained each step before starting.",
		name: "Arsh Gill",
		service: "Russian Manicure & Nail Art",
		image: "/client%202.webp",
	},
	{
		id: 3,
		quote:
			"My hair spa and blowout left my hair soft, manageable, and naturally glossy. The appointment never felt rushed, and the styling lasted beautifully for several days.",
		name: "Riya Sharma",
		service: "Keratin Spa & BlowOut",
		image: "/client%203.webp",
	},
];

const miniTickerReviews = [
	{ text: "Best nail studio in Sirsa", author: "Harleen G." },
	{ text: "Calm, kind and so skilled", author: "Navneet G." },
	{ text: "My balayage looks so natural", author: "Simran K." },
	{ text: "Obsessed with my gel extensions", author: "Riya S." },
	{ text: "Unhurried, personal care", author: "Amanpreet D." },
	{ text: "Flawless bridal nail set", author: "Mehak S." },
];

const framerEase = [0.22, 1, 0.36, 1];

export default function TestimonialsSection() {
	useAdminState();
	const reviewItems = getVisibleAdminItems("reviews");
	const testimonials = reviewItems.length
		? reviewItems.map((item) => ({
				id: item.id,
				quote: item.quote || item.meta,
				name: item.name || item.title,
				service: item.service || item.tag,
				image: item.image,
		  }))
		: defaultTestimonials;
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const touchStartX = useRef(null);
	const touchEndX = useRef(null);

	const total = testimonials.length;
	const current = testimonials[activeIndex % total];

	const handleNext = () => {
		setActiveIndex((prev) => (prev + 1) % total);
	};

	const handlePrev = () => {
		setActiveIndex((prev) => (prev - 1 + total) % total);
	};

	useEffect(() => {
		if (isPaused) return;
		const timer = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % total);
		}, 5500);
		return () => clearInterval(timer);
	}, [isPaused, total]);

	const onTouchStart = (e) => {
		setIsPaused(true);
		touchEndX.current = null;
		touchStartX.current = e.targetTouches[0].clientX;
	};

	const onTouchMove = (e) => {
		touchEndX.current = e.targetTouches[0].clientX;
	};

	const onTouchEnd = () => {
		if (!touchStartX.current || !touchEndX.current) {
			setIsPaused(false);
			return;
		}
		const distance = touchStartX.current - touchEndX.current;
		const minSwipeDistance = 45;

		if (distance > minSwipeDistance) handleNext();
		else if (distance < -minSwipeDistance) handlePrev();
		setIsPaused(false);
	};

	const repeatedMiniReviews = [
		...miniTickerReviews,
		...miniTickerReviews,
		...miniTickerReviews,
	];

	return (
		<section
			id="reviews"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			className="w-full bg-[#DFD6C7] text-[#2F2C29] pt-20 md:pt-28 pb-12 md:pb-16 border-t border-[#2F2C29]/10 overflow-hidden"
		>
			<div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
				<h2 className="sr-only">Client reviews</h2>
				{/* Top Row */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.75, ease: framerEase }}
					className="flex flex-wrap items-center justify-between gap-4 mb-12 md:mb-16"
				>
					<div className="inline-flex items-center bg-[#F6F5F1] rounded-[3px] p-1 pr-4">
						<span className="bg-[#2F2C29] text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-[2px]">
							07
						</span>
						<span className="text-[#2F2C29] text-[13px] font-medium tracking-wide ml-3">
							Client reviews
						</span>
					</div>

					<div className="flex flex-wrap items-center gap-4">
						<div className="flex items-center gap-2.5">
							<div className="flex items-center gap-1 text-[#8A755F]">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className="w-4 h-4 stroke-[1.6] fill-transparent"
									/>
								))}
							</div>
							<span className="text-[13px] font-medium text-[#5C554C]">
								4.9 rated by clients in Sirsa
							</span>
						</div>
						<a
							href="https://share.google/8lQRAsmnWC6olbn6O"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center rounded-[3px] bg-[#2F2C29] px-4 py-2.5 text-[13px] font-medium text-[#F6F5F1] transition-colors hover:bg-[#5C554C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F2C29]"
						>
							Post a review
						</a>
					</div>
				</motion.div>

				{/* Main Split Testimonial Area */}
				<div
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
					className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 md:mb-20 touch-pan-y"
				>
					{/* LEFT COLUMN */}
					<div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
						<div className="mb-6 text-[#8A755F]">
							<svg
								width="36"
								height="28"
								viewBox="0 0 36 28"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M14.5 14.5H5.5C4.39543 14.5 3.5 13.6046 3.5 12.5V5.5C3.5 4.39543 4.39543 3.5 5.5 3.5H12.5C13.6046 3.5 14.5 4.39543 14.5 5.5V16.5C14.5 21.4706 10.4706 25.5 5.5 25.5H4.5M32.5 14.5H23.5C22.3954 14.5 21.5 13.6046 21.5 12.5V5.5C21.5 4.39543 22.3954 3.5 23.5 3.5H30.5C31.6046 3.5 32.5 4.39543 32.5 5.5V16.5C32.5 21.4706 28.4706 25.5 23.5 25.5H22.5"
									stroke="currentColor"
									strokeWidth="1.6"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>

						<div className="min-h-[210px] sm:min-h-[190px] flex flex-col justify-between w-full max-w-[600px]">
							<AnimatePresence mode="wait">
								<motion.div
									key={current.id}
									initial={{ opacity: 0, y: 14 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -14 }}
									transition={{ duration: 0.45, ease: framerEase }}
								>
									<p className="text-[17px] sm:text-[19px] md:text-[20.5px] font-normal text-[#2F2C29] leading-[1.65] mb-7">
										{current.quote}
									</p>

									<div>
										<h3 className="text-[20px] md:text-[22px] font-medium text-[#2F2C29] leading-tight">
											{current.name}
										</h3>
										<p className="text-[13.5px] text-[#4F4A43] mt-1">
											{current.service}
										</p>
									</div>
								</motion.div>
							</AnimatePresence>
						</div>

						{/* Bottom Controls */}
						<div className="w-full max-w-[600px] flex items-center justify-between gap-4 mt-8 pt-2">
							<div className="flex items-center gap-3.5">
								{testimonials.map((item, idx) => {
									const isActive = idx === activeIndex;
									return (
										<button
											key={item.id}
											type="button"
											onClick={() => setActiveIndex(idx)}
											aria-label={`View review from ${item.name}`}
											className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden transition-all duration-300 focus:outline-none ${
												isActive
													? "ring-2 ring-[#2F2C29] ring-offset-2 ring-offset-[#DFD6C7] scale-105 opacity-100"
													: "opacity-55 hover:opacity-90 scale-95"
											}`}
										>
											<ImageWithFallback
												src={item.image}
												alt={item.name}
												className="w-full h-full object-cover object-center"
											/>
										</button>
									);
								})}
							</div>

							<div className="flex items-center gap-2">
								<button
									type="button"
									onClick={handlePrev}
									aria-label="Previous testimonial"
									className="w-10 h-10 rounded-[3px] border border-[#2F2C29]/25 hover:border-[#2F2C29] hover:bg-[#2F2C29] hover:text-[#F6F5F1] text-[#2F2C29] flex items-center justify-center transition-colors"
								>
									<ChevronLeft className="w-4 h-4 stroke-[1.75]" />
								</button>
								<button
									type="button"
									onClick={handleNext}
									aria-label="Next testimonial"
									className="w-10 h-10 rounded-[3px] border border-[#2F2C29]/25 hover:border-[#2F2C29] hover:bg-[#2F2C29] hover:text-[#F6F5F1] text-[#2F2C29] flex items-center justify-center transition-colors"
								>
									<ChevronRight className="w-4 h-4 stroke-[1.75]" />
								</button>
							</div>
						</div>
					</div>

					{/* RIGHT COLUMN */}
					<div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
						<div className="relative w-full max-w-[460px] aspect-[4/4.4] overflow-hidden rounded-[3px] bg-[#2F2C29] shadow-[0_20px_44px_-16px_rgba(47,44,41,0.18)]">
							<AnimatePresence mode="wait">
								<ImageWithFallback
									component={motion.img}
									key={current.id}
									src={current.image}
									alt={current.name}
									initial={{ opacity: 0, scale: 1.04 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.98 }}
									transition={{ duration: 0.55, ease: framerEase }}
									className="w-full h-full object-cover object-center"
								/>
							</AnimatePresence>

							{!isPaused && (
								<motion.div
									key={`progress-${activeIndex}`}
									initial={{ scaleX: 0 }}
									animate={{ scaleX: 1 }}
									transition={{ duration: 5.5, ease: "linear" }}
									style={{ transformOrigin: "left" }}
									className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F6F5F1]/85 z-20"
								/>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Mini-Review Pill Ticker */}
			<div className="relative w-full overflow-hidden pt-2 select-none">
				<div
					className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10"
					style={{
						background:
							"linear-gradient(90deg, #DFD6C7 0%, rgba(223,214,199,0) 100%)",
					}}
				/>
				<div
					className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10"
					style={{
						background:
							"linear-gradient(270deg, #DFD6C7 0%, rgba(223,214,199,0) 100%)",
					}}
				/>

				<div className="animate-marquee flex items-center gap-4">
					{repeatedMiniReviews.map((review, idx) => (
						<div
							key={idx}
							className="inline-flex items-center gap-2.5 bg-[#F6F5F1]/85 border border-[#2F2C29]/8 rounded-[2px] px-4 py-2.5 shrink-0"
						>
							<Star className="w-3.5 h-3.5 text-[#8A755F] stroke-[1.75] shrink-0" />
							<span className="text-[13px] font-medium text-[#2F2C29]">
								{review.text}
							</span>
							<span className="text-[12px] font-medium text-[#3F3A34] ml-1">
								{review.author}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}