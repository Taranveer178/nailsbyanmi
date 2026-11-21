const tickerItems = [
  "Gel Nail Extensions",
  "Signature Haircuts",
  "Balayage & Global Colour",
  "Luxury Nail Art",
  "Keratin & Hair Spa",
  "Russian Manicure",
  "BlowOut & Styling",
  "Spa Pedicure",
];

export default function ServiceTicker() {
  const repeatedItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="w-full bg-[#8A755F] text-[#F6F5F1] py-5 md:py-6 overflow-hidden border-y border-white/10 select-none">
      <div className="animate-marquee flex items-center">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center shrink-0">
            <span className="text-[18px] md:text-[21px] font-normal tracking-wide px-7 md:px-10">
              {item}
            </span>
            <span className="text-[#F6F5F1]/80 text-base md:text-lg leading-none">
              &#10033;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}